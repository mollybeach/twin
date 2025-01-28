// path: src/services/openaiService.ts
import axios from 'axios';

export const generateResponse = async (prompt: string) => {
    try {
        const response = await axios.post('http://localhost:3001/generate', { prompt });
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error generating response:', error);
        throw error;
    }
};  