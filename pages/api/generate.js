// pages/api/generate.js
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });
  const { secteur = "marketing", ton = "professionnel" } = req.body || {};
  const prompt = `Crée une séquence de 4 emails de prospection, un message LinkedIn d'approche, et un texte de mini-page de vente pour un freelance en ${secteur}, ton ${ton}. Réponds en sections claires.`;
  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7
      })
    });
    if (!r.ok) return res.status(r.status).json({ error: "OpenAI error", details: await r.text() });
    const data = await r.json();
    return res.status(200).json({ result: data?.choices?.[0]?.message?.content || "" });
  } catch (e) {
    return res.status(500).json({ error: "Server error", details: String(e) });
  }
}
