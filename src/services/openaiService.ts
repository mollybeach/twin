// path: src/services/openaiService.ts
import axios from 'axios';

export const generateResponse = async (prompt: string): Promise<string> => {
    try {
        const response = await axios.post('http://localhost:3002/generate', { prompt });
        
        // Log the entire response for debugging
        console.log('OpenAI Response:', response.data);
        
        // Check if the response contains the expected structure
        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].text.trim(); // Adjust based on your OpenAI API response structure
        } else {
            throw new Error('Unexpected response structure from OpenAI');
        }
    } catch (error) {
        console.error('Error generating response from OpenAI:', error);
        throw new Error('Failed to generate response from OpenAI.');
    }
};