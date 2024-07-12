import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {

    const prompt = "Create a list of three open-ended and engaging message starters formatted as a single string, separated by '||'. These starters are for a trendy social messaging platform popular with Gen Z, like TikTok or BeReal. Focus on topics that resonate with young people and encourage them to share their authentic experiences, opinions, or creativity. Avoid anything too serious or formal. Instead, aim for fun, relatable, and slightly quirky themes that spark conversation and maybe even inspire content creation. Your output should be structured like this: 'Drop your most used emoji lately and explain why 👀||What's the wildest thing on your bucket list rn?||Unpopular opinion: [fill in the blank] is actually overrated'. Make sure the starters are intriguing, foster curiosity, and contribute to a vibrant, expressive, and engaging community vibe.";


  const result = await streamText({
    model: openai('gpt-3.5-turbo-instruct'),
    prompt,
  });

  return result.toAIStreamResponse();
  } catch (error) {
    console.log("Error suggesting messages", error);
    return Response.json({
        
    })
  }
}