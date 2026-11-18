import { Router } from "express";
import "dotenv/config";

const router = Router();

const model = process.env.GEMINI_MODEL;
const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

router.post("/explain", async (req, res) => {
  try {
    // 1. ta emot det frontend skickade
    const { title, description } = req.body;

    // 2. bygg prompten
    const prompt = `Förklara kort på svenska varför boken "${title}" kan passa en läsare. Beskrivning: ${description}`;

    // 3. lägg den i Geminis format
    const requestBody = { contents: [{ parts: [{ text: prompt }] }] };

    // 4. skicka ett anrop
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": process.env.GEMINI_API_KEY,
      },
      body: JSON.stringify(requestBody),
    });

    // 5. läs svaret
    const data = await response.json();
    // Hantera fel i svaret
    if (!response.ok) {
      console.error(response.status, data);
      return res
        .status(502)
        .json({ error: "AI-tjänsten är inte tillgänglig just nu" });
    }
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    // 6. skicka vidare
    res.json({ reason: text });
  } catch (err) {
    res.status(502).json({ error: "AI-anropet misslyckades" });
  }
});

export default router;
