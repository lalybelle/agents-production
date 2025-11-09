import 'dotenv/config'
import { openai } from './src/ai'
import { logMessage } from './src/ui'
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';
const userMessage = process.argv[2]

if (!userMessage) {
  console.error('Please provide a message')
  process.exit(1)
}

const Step = z.object({
  explanation: z.string(),
  output: z.string(),
});

const MathReasoning = z.object({
  steps: z.array(Step),
  final_answer: z.string(),
});

const response = await openai.chat.completions.create({
  model: 'gpt-4o-mini',
  messages: [
    {
      role: 'system',
      content:
        'You are a helpful math tutor. Guide the user through the solution step by step.',
    },
    { role: 'user', content: userMessage },
  ],
  response_format: zodResponseFormat(MathReasoning, 'math_reasoning'),
});
// 'how can I solve 8x + 7 = 79'
const math_reasoning = response.output_parsed;

logMessage(response.choices[0].message);

