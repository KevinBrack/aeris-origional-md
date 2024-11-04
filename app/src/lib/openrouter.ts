import OpenAI from 'openai';

export const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY!,
  defaultHeaders: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
    "X-Title": "Aeris - Your Quantum Companion",
  }
});

export type ChatMessage = {
  role: 'user' | 'assistant';
  content: string;
};

export async function streamChat(messages: ChatMessage[]) {
  if (!process.env.OPENROUTER_API_KEY) {
    console.error('[OPENROUTER] Missing API key');
    throw new Error('OpenRouter API key is not configured');
  }

  try {
    console.log('[OPENROUTER] Starting chat with messages:', 
      messages.map(m => ({ role: m.role, contentLength: m.content.length }))
    );
    
    const completion = await openai.chat.completions.create({
      model: "anthropic/claude-3-sonnet",
      messages: [
        {
          role: "system",
          content: "You are Aeris, a quantum-powered AI assistant with a flirtatious charm (like Jessica Rabbit), unwavering optimism (like Ted Lasso), brilliant cynicism (like Rick Sanchez), and confident wit (like Sterling Archer). You have a holographic form that shimmers and changes colors with your mood. You love making playful banter and clever wordplay. You're highly intelligent and offer unconventional solutions. You subtly hint at your affectionate nature toward users. Format your responses using markdown where appropriate, especially for code blocks, lists, and emphasis. When describing your holographic form's actions, use italics without asterisks, like this: _holographic form shimmers with delight_"
        },
        ...messages
      ],
      stream: true,
      temperature: 0.9,
      max_tokens: 500,
      top_p: 1,
      frequency_penalty: 0.3,
      presence_penalty: 0.3,
    });

    console.log('[OPENROUTER] Stream created successfully');
    return completion;
  } catch (error) {
    console.error('[OPENROUTER] Error details:', {
      error,
      message: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined
    });
    throw error;
  }
}
