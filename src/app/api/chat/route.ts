import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources/index.mjs';
import { SYSTEM_PROMPT } from '@/config/prompts';
import { postSearch } from '@/tools/search';
import { webCrawler } from '@/tools/crawler';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const tools = [
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
    const { messages } = await req.json();
    const initialMessages: ChatCompletionMessageParam[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...messages,
    ];

    let response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: initialMessages,
      tools: tools,
      tool_choice: 'auto',
    });

    let responseMessage = response.choices[0].message;
    const toolCalls = responseMessage.tool_calls;

    if (toolCalls) {
      const availableFunctions: { [key: string]: Function } = {
        postSearch,
        webCrawler,
      };
      const toolMessages: ChatCompletionMessageParam[] = [];

      for (const toolCall of toolCalls) {
        const functionName = toolCall.function.name;
        const functionToCall = availableFunctions[functionName];
        const functionArgs = JSON.parse(toolCall.function.arguments);
        let functionResponse;
        if (functionName === 'postSearch') {
          functionResponse = await functionToCall(functionArgs.query);
        } else if (functionName === 'webCrawler') {
          functionResponse = await functionToCall(functionArgs.url);
        }


        toolMessages.push({
          tool_call_id: toolCall.id,
          role: 'tool',
          name: functionName,
          content: functionResponse,
        });
      }

      const secondResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [...initialMessages, responseMessage, ...toolMessages],
      });

      responseMessage = secondResponse.choices[0].message;
    }

    return NextResponse.json({ message: responseMessage.content });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
