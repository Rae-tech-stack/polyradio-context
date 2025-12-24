import OpenAI from "openai";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      title,
      rules,
      old_odds,
      new_odds,
      time_window,
      volume_change,
      news_links = [],
      x_links = []
    } = body;

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const systemPrompt = `
You are an analyst explaining Polymarket market movements.
You must ONLY use the provided market data and source links.
If sources are weak or unrelated, say so clearly.
Do not speculate. Do not give trading advice.
Use simple, plain English.
`;

    const userPrompt = `
Market title: ${title}

Market rules: ${rules}

Odds moved from ${old_odds} to ${new_odds} in ${time_window}
Volume change: ${volume_change}

News sources:
${news_links.map(l => "- " + l).join("\n")}

X sources:
${x_links.map(l => "- " + l).join("\n")}

Write:
1) What changed (1–2 sentences)
2) Likely reason for the move
3) What people might be misreading
4) What could move this market next

Add:
- Driver type: headline / social / flow / mixed
- Confidence: high / medium / low

If sources do not clearly explain the move, say:
"No clear catalyst found. Move may be flow-driven."
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.2,
      messages: [
        { role: "system", content: systemPrompt.trim() },
        { role: "user", content: userPrompt.trim() }
      ]
    });

    return Response.json({
      ok: true,
      explanation: completion.choices[0].message.content
    });
  } catch (err) {
    return Response.json(
      { ok: false, error: err.message },
      { status: 500 }
    );
  }
}
