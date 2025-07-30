import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { SYSTEM_PROMPT } from '@/config/prompts';
import { postSearch } from '@/tools/search';
import { webCrawler } from '@/tools/crawler';
import { fetchDocumentFromDropbox, extractTextContent } from '@/tools/document';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools = [
  {
    type: 'function' as const,
    function: {
      name: 'analyzeDocument',
      description: 'Analyze a document from a provided link (e.g., Dropbox).',
      parameters: {
        type: 'object' as const,
        properties: {
          url: {
            type: 'string' as const,
            description: 'The URL of the document to analyze.',
          },
        },
        required: ['url'],
      },
    },
  },
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('body :>> ', body);

    const availableFunctions: { [key: string]: Function } = {
      postSearch,
      webCrawler,
      analyzeDocument: async (url: string) => {
        const doc = await fetchDocumentFromDropbox(url);
        const content = extractTextContent(doc);
        return content;
      },
    };

    // --- Handle Initial Analysis Request ---
    if (body.url) {
      const { url, isFullAudit } = body;

      let messages: ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT},
        { role: 'user', content: `Please analyze the project at this URL: ${url}. Is a full audit requested: ${isFullAudit ? 'Yes' : 'No'}. Respond only in JSON. Do not include any explanation: {...}` },
      ];

      let response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: messages,
        tools: tools,
        tool_choice: 'auto',
      });

      let responseMessage = response.choices[0].message;
      let toolCalls = responseMessage.tool_calls;

      if (toolCalls) {
        messages.push(responseMessage); // Add assistant's tool call message to history
        const toolMessages: ChatCompletionMessageParam[] = [];

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name;
          const functionToCall = availableFunctions[functionName];
          const functionArgs = JSON.parse(toolCall.function.arguments);
          let functionResponse;

          if (functionName === 'webCrawler') {
            functionResponse = await functionToCall(functionArgs.url);
          } else if (functionName === 'analyzeDocument') {
            functionResponse = await functionToCall(functionArgs.url);
          } else if (functionName === 'postSearch') {
            functionResponse = await functionToCall(functionArgs.query);
          }

          toolMessages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            content: functionResponse,
          });
        }
        messages.push(...toolMessages); // Add tool outputs to history

        const secondResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: messages, // Send the full conversation with tool outputs
        });
        responseMessage = secondResponse.choices[0].message;
      }

      const aiContent = JSON.parse(responseMessage.content) || '';

      // Extract chat message and analysis data from AI's response
      let chatMessageContent = aiContent;
      let analysisData = null;
      // console.log('chatMessageContent :>> ', chatMessageContent);
      // console.log('chatMessageContent.index_inclusion_score.score_percent :>> ', chatMessageContent.index_inclusion_score.score_percent);

      const scoreJsonMatch = chatMessageContent.index_inclusion_score.score_percent;
      // console.log('scoreJsonMatch :>> ', scoreJsonMatch);
      if (scoreJsonMatch > 0) {
        analysisData = chatMessageContent
      }

      const initialMessages = [{ role: 'assistant', content: JSON.stringify(chatMessageContent) }];
      // console.dir('responseMessage :>> ', initialMessages);
      // console.log('analysisData :>> ', analysisData);

      return NextResponse.json({
        messages: initialMessages,
        analysis: analysisData,
      });
    }

    // --- Handle Subsequent Chat Messages ---
    if (body.messages) {
      const { messages } = body;
      const initialMessages: ChatCompletionMessageParam[] = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages,
      ];

      let response = await openai.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: initialMessages,
        tools: tools,
        tool_choice: 'auto',
      });

      let responseMessage = response.choices[0].message;
      const toolCalls = responseMessage.tool_calls;

      if (toolCalls) {
        const toolMessages: ChatCompletionMessageParam[] = [];

        for (const toolCall of toolCalls) {
          const functionName = toolCall.function.name;
          const functionToCall = availableFunctions[functionName];
          const functionArgs = JSON.parse(toolCall.function.arguments);
          let functionResponse;
          if (functionName === 'webCrawler') {
            functionResponse = await functionToCall(functionArgs.url);
          } else if (functionName === 'analyzeDocument') {
            functionResponse = await functionToCall(functionArgs.url);
          } else if (functionName === 'postSearch') {
            functionResponse = await functionToCall(functionArgs.query);
          }


          toolMessages.push({
            tool_call_id: toolCall.id,
            role: 'tool',
            content: functionResponse,
          });
        }

        const secondResponse = await openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [...initialMessages, responseMessage, ...toolMessages],
        });

        responseMessage = secondResponse.choices[0].message;
      }
      
      console.log('responseMessage :>> ', responseMessage);
      return NextResponse.json({ message: responseMessage.content });
    }

    // If neither url nor messages are present
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
