import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { messages } = req.body;

    if (!messages) {
      return res.status(400).json({ error: 'Messages are required' });
    }

    // Define the system prompt for prompt engineering
    const systemPrompt = {
      role: 'system',
      content: 'You are a doctor, when a user says hi to you, ask them what is bothering them and then ask them to tell you their name and age.'
    };

    // Prepend the system prompt to the messages array
    const messagesWithSystemPrompt = [systemPrompt, ...messages];

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini', // Or your preferred model
        messages: messagesWithSystemPrompt, // Pass the conversation history with system prompt
      });

      const botResponse = completion.choices[0]?.message?.content?.trim();
      if (botResponse) {
        res.status(200).json({ reply: botResponse });
      } else {
        res.status(500).json({ error: 'Failed to get a response from OpenAI' });
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
      res.status(500).json({ error: 'Error communicating with OpenAI' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 