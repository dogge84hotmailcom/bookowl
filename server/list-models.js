const res = await fetch(
  "https://generativelanguage.googleapis.com/v1beta/models",
  {
    headers: { "x-goog-api-key": process.env.GEMINI_API_KEY },
  },
);
const data = await res.json();
for (const m of data.models ?? []) console.log(m.name);
console.log(data.error ?? "");
