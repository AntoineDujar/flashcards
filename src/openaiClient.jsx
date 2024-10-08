import OpenAI from "openai";

const openaiKey = import.meta.env.VITE_PUBLIC_OPENAI;

export const openai = new OpenAI({
  apiKey: openaiKey,
  dangerouslyAllowBrowser: true,
});
