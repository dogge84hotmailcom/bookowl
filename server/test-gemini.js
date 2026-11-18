const url = `https://generativelanguage.googleapis.com/v1beta/models/${process.env.GEMINI_MODEL}:generateContent`;

const res = await fetch(url, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-goog-api-key": process.env.GEMINI_API_KEY,
  },
  body: JSON.stringify({
    contents: [
      { parts: [{ text: "Förklara på en mening varför man läser böcker." }] },
    ],
  }),
});

const data = await res.json();
console.log(data.candidates?.[0]?.content?.parts?.[0]?.text ?? data);
