import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const handleChat = async (req, res) => {
    try {
        const { prompt } = req.body;

        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash-preview-05-20",
            contents: prompt
        })
        const text = response.text;

        res.json({ response: text });
    } catch (error) {
        console.error('Error in Gemini API call:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
};
