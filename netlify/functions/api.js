import express from 'express';
import serverless from 'serverless-http';
import { GoogleGenAI, Modality } from '@google/genai';

const app = express();
app.use(express.json({ limit: '5mb' }));

let aiClient = null;

function getAI() {
  const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY nėra sukonfigūruotas serveryje.');
  }
  if (!aiClient) {
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message, systemInstruction } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Pranešimas negali būti tuščias.' });
    }
    const ai = getAI();
    const prompt = systemInstruction ? `${systemInstruction}\n\nUžklausa: ${message}` : message;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
    });
    
    res.status(200).json({ text: response.text || '' });
  } catch (err) {
    console.error('[API /api/chat klaida]:', err);
    res.status(500).json({ error: err.message || 'Serverio klaida' });
  }
});

app.post('/api/tts', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Tekstas negali būti tuščias.' });
    }
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-tts-preview',
      contents: [{ parts: [{ text }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });
    const audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
    res.status(200).json({ audio });
  } catch (err) {
    console.error('[API /api/tts klaida]:', err);
    res.status(500).json({ error: err.message || 'Nepavyko sugeneruoti balso' });
  }
});

export const handler = serverless(app);
