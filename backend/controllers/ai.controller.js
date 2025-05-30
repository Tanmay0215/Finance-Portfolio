import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const callGeminiAPI = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash-preview-05-20",
            contents: prompt
        });
        const text = response.text;

        res.json({ response: text });
    } catch (error) {
        console.error('Error in Gemini API call:', error);
        res.status(500).json({ message: 'Error processing your request' });
    }
}

export const getAIMarketOverview = async (req, res) => {
    try {
        const cmcData = JSON.stringify(req.body, null, 2);
        const prompt = `
            You are a financial analyst. Based on the following market data from CoinMarketCap, provide a concise market overview.
            Focus on key trends, significant changes, and potential implications.
            Keep the overview brief and informative, suitable for a quick market snapshot.
            
            Market Data:
            ${cmcData}
            `;
        const response = await genAI.models.generateContent({
            model: "gemini-2.5-flash-preview-05-20",
            contents: prompt
        })
        const text = response.text;
        res.json({ overview: text });

    } catch (error) {
        console.error('Error in AI Market Overview generation:', error);
        if (error.message && error.message.includes('API key not valid')) {
            return res.status(401).json({ message: 'AI API key is not valid. Please check server configuration.' });
        }
        res.status(500).json({ message: 'Error generating AI market overview.' });
    }
};
