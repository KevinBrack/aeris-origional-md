import { NextResponse } from 'next/server';
import { streamChat } from '@/lib/openrouter';
import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const encoder = new TextEncoder();
  
  try {
    const { message } = await req.json();
    console.log('[CHAT_API] Received message:', message);

    if (!message || typeof message !== 'string') {
      console.error('[CHAT_API] Invalid message format');
      return new NextResponse(
        JSON.stringify({ error: 'Invalid message format' }),
        { status: 400 }
      );
    }

    console.log('[CHAT_API] Creating conversation');
    // Create a new conversation
    const conversation = await prisma.conversation.create({
      data: {
        userId: 'anonymous',
        messages: {
          create: {
            role: 'user',
            content: message,
          },
        },
      },
      include: { messages: true },
    });

    console.log('[CHAT_API] Conversation created:', conversation.id);

    // Get all messages for context
    const messages = conversation.messages.map((msg) => ({
      role: msg.role as 'user' | 'assistant',
      content: msg.content,
    }));

    console.log('[CHAT_API] Starting stream');
    // Create a streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          console.log('[CHAT_API] Getting chat stream');
          const chatStream = await streamChat(messages);
          let fullResponse = '';

          console.log('[CHAT_API] Processing stream chunks');
          for await (const chunk of chatStream) {
            const text = chunk.choices[0]?.delta?.content || '';
            if (text) {
              controller.enqueue(encoder.encode(text));
              fullResponse += text;
              console.log('[CHAT_API] Chunk processed:', text);
            }
          }

          console.log('[CHAT_API] Stream complete, saving response');
          // Save the complete response
          await prisma.message.create({
            data: {
              conversationId: conversation.id,
              role: 'assistant',
              content: fullResponse,
            },
          });

          controller.close();
        } catch (error) {
          console.error('[CHAT_API] Stream error:', error);
          const errorMessage = error instanceof Error ? error.message : 'Stream processing failed';
          controller.enqueue(encoder.encode(`I apologize, darling, but I encountered an error: ${errorMessage}`));
          controller.close();
        }
      },
    });

    console.log('[CHAT_API] Returning stream response');
    return new NextResponse(stream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('[CHAT_API] General error:', error);
    return new NextResponse(
      JSON.stringify({ 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : String(error)
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );
  }
}
