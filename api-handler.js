import { GoogleGenAI, Modality } from '@google/genai';

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

export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 5 * 1024 * 1024) {
        reject(new Error('Užklausa per didelė'));
      }
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Neteisingas JSON formatas'));
      }
    });
    req.on('error', reject);
  });
}

export async function handleApiRequest(req, res) {
  const url = req.url ? req.url.split('?')[0] : '';

  if (url === '/api/chat' && req.method === 'POST') {
    try {
      const { message, systemInstruction } = await readJsonBody(req);
      if (!message) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Pranešimas negali būti tuščias.' }));
        return true;
      }

      const ai = getAI();
      const prompt = systemInstruction ? `${systemInstruction}\n\nUžklausa: ${message}` : message;
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
      });

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ text: response.text || '' }));
      return true;
    } catch (err) {
      console.error('[API /api/chat klaida]:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: err.message || 'Serverio klaida' }));
      return true;
    }
  }

  if (url === '/api/tts' && req.method === 'POST') {
    try {
      const { text } = await readJsonBody(req);
      if (!text) {
        res.writeHead(400, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ error: 'Tekstas negali būti tuščias.' }));
        return true;
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
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ audio }));
      return true;
    } catch (err) {
      console.error('[API /api/tts klaida]:', err);
      res.writeHead(500, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ error: err.message || 'Nepavyko sugeneruoti balso' }));
      return true;
    }
  }

  return false;
}
