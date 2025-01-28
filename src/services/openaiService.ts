import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_KEY,
});

export const generateResponse = async (prompt: string) => {
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo', // or any other model you want to use
            messages: [{ role: 'user', content: prompt }],
            max_tokens: 150,
        });

        // Check if response and choices are valid
        if (response.choices && response.choices.length > 0 && response.choices[0].message?.content) {
            return response.choices[0].message.content.trim();
        } else {
            throw new Error('No response choices available');
        }
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
}; 