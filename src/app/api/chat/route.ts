import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { SYSTEM_PROMPT } from '@/config/prompts';
import { postSearch } from '@/tools/search';
import { webCrawler } from '@/tools/crawler';
import { fetchDocumentFromDropbox, extractTextContent } from '@/tools/document';
import { prisma } from '@/lib/prisma';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools = [
  // {
  //   type: 'function' as const,
  //   function: {
  //     name: 'analyzeDocument',
  //     description: 'Analyze a document from a provided link (e.g., Dropbox).',
  //     parameters: {
  //       type: 'object' as const,
  //       properties: {
  //         url: {
  //           type: 'string' as const,
  //           description: 'The URL of the document to analyze.',
  //         },
  //       },
  //       required: ['url'],
  //     },
  //   },
  // },
  {
    type: 'function' as const,
    function: {
      name: 'postSearch',
      description: 'Get information from the web using DuckDuckGo search.',
      parameters: {
        type: 'object' as const,
        properties: {
          query: {
            type: 'string' as const,
            description: 'The search query.',
          },
        },
        required: ['query'],
      },
    },
  },
  {
    type: 'function' as const,
    function: {
      name: 'webCrawler',
      description: 'Get the text content of a webpage.',
      parameters: {
        type: 'object' as const,
        properties: {
          url: {
            type: 'string' as const,
            description: 'The URL of the webpage to crawl.',
          },
        },
        required: ['url'],
      },
    },
  },
];

const availableFunctions: { [key: string]: Function } = {
  postSearch,
  webCrawler,
  // analyzeDocument: async (url: string) => {
  //   const doc = await fetchDocumentFromDropbox(url);
  //   const content = extractTextContent(doc);
  //   return content;
  // },
};

async function runChatWithTools(messages: ChatCompletionMessageParam[]) {
  const response = await openai.chat.completions.create({
    model: 'gpt-5-nano',
    messages,
    tools,
    tool_choice: 'auto',
  });

  const responseMessage = response.choices[0].message;
  const toolCalls = responseMessage.tool_calls;

  console.log('AI Tool Calls:', toolCalls); // <-- ADDED FOR DEBUGGING

  if (toolCalls) {
    messages.push(responseMessage); // Add assistant's tool call message to history
    const toolMessages: ChatCompletionMessageParam[] = [];

    for (const toolCall of toolCalls) {
      const functionName = toolCall.function?.name || (toolCall as any).tool_call?.function?.name;
      const functionToCall = availableFunctions[functionName];
      const functionArgs = JSON.parse(toolCall.function?.arguments || (toolCall as any).tool_call?.function?.arguments);
      let functionResponse;

      if (functionName === 'webCrawler') {
        functionResponse = await functionToCall(functionArgs.url);
      // } else if (functionName === 'analyzeDocument') {
      //   functionResponse = await functionToCall(functionArgs.url);
      } else if (functionName === 'postSearch') {
        functionResponse = await functionToCall(functionArgs.query);
      }

      if (!functionResponse) {
        throw new Error(`No response from ${functionName}`)
      }

      toolMessages.push({
        tool_call_id: toolCall.id,
        role: 'tool',
        content: functionResponse,
      });
    }
    messages.push(...toolMessages); // Add tool outputs to history

    const secondResponse = await openai.chat.completions.create({
      model: 'gpt-5-nano',
      messages,
    });
    return secondResponse.choices[0].message;
  }

  return responseMessage;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, isFullAudit, messages: userMessages } = body;

    let messages: ChatCompletionMessageParam[];
    const isInitialAnalysis = !!url;

    if (isInitialAnalysis) {
      messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: `Please analyze the project at this URL: ${url}. Is a full audit requested: ${isFullAudit ? 'Yes' : 'No'}. Respond only in JSON. Do not include any explanation: {...}` },
      ];
    } else if (userMessages) {
      messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...userMessages,
      ];
    } else {
      return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
    }

    const finalResponseMessage = await runChatWithTools(messages);
    const aiContent = JSON.parse(finalResponseMessage.content || '{}');

    let analysisData = null;
    if (aiContent.index_inclusion_score?.score_percent > 0) {
      analysisData = aiContent;
    }

    // Store the analysis in the database if it's an initial analysis
    if (isInitialAnalysis && analysisData) {
      try {
        const categoryMap: { [key: string]: string } = {
          'real estate': 'real_estate',
          'credit': 'credit',
          'commodities': 'commodities',
          'other': 'other',
        };
        const category = categoryMap[analysisData.asset_type.toLowerCase()] || 'other';

        await prisma.scoredAsset.create({
          data: {
            token_symbol: analysisData.token,
            issuer: analysisData.issuer,
            category: category as any,
            chain: analysisData.chain,
            total_score: analysisData.index_inclusion_score.score_percent,
            liquidity_tvl_usd: 0, // Default, can be updated later
            risk_flags: analysisData.key_highlights.key_risks,
            full_text: JSON.stringify(analysisData),
            url: url,
          },
        });
      } catch (dbError) {
        console.error('Error storing analysis in DB:', dbError);
        // Don't fail the request if DB storage fails
      }
    }

    if (isInitialAnalysis) {
      const initialMessages = [{ role: 'assistant', content: JSON.stringify(aiContent) }];
      return NextResponse.json({
        messages: initialMessages,
        analysis: analysisData,
      });
    } else {
      return NextResponse.json({
        message: JSON.stringify(aiContent),
        analysis: analysisData,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: `Something went wrong. ${error.message}` }, { status: 500 });
  }
}
