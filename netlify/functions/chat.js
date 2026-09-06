export const handler = async (event, context) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Metodas nepalaikomas (Method Not Allowed)' }),
    };
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY || process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: 'GEMINI_API_KEY nėra sukonfigūruotas Netlify nustatymuose. Prašome nueiti į Netlify valdymo pultą (Site configuration -> Environment variables) ir pridėti GEMINI_API_KEY.',
        }),
      };
    }

    let body = {};
    try {
      body = typeof event.body === 'string' ? JSON.parse(event.body) : (event.body || {});
    } catch {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Neteisingas JSON formatas' }),
      };
    }

    const { message, systemInstruction } = body;
    if (!message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Pranešimas negali būti tuščias.' }),
      };
    }

    // Direct Google Gemini REST API call - zero external bundle dependencies needed
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      systemInstruction: systemInstruction ? { parts: [{ text: systemInstruction }] } : undefined,
      contents: [
        {
          role: 'user',
          parts: [{ text: message }],
        },
      ],
      generationConfig: {
        temperature: 0.7,
      },
    };

    const apiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      console.error('[Gemini API klaida]:', data);
      const errMsg = data?.error?.message || `Gemini API klaida (${apiResponse.status})`;
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: `Gemini API klaida: ${errMsg}` }),
      };
    }

    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Atsiprašau, nepavyko sugeneruoti atsakymo.';

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ text: replyText }),
    };
  } catch (err) {
    console.error('[Netlify Function /chat klaida]:', err);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: `Serverio klaida: ${err.message || 'Nežinoma klaida'}` }),
    };
  }
};
