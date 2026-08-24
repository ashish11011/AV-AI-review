import OpenAI from "openai";
import { NextResponse } from "next/server";
import { z } from "zod";

const reviewRequestSchema = z.object({
  companyName: z.string().min(1),
  answers: z
    .array(
      z.object({
        prompt: z.string().min(1),
        rating: z.number().int().min(1).max(5)
      })
    )
    .min(1)
});

function localFallbackReview(companyName: string, answers: Array<{ prompt: string; rating: number }>) {
  const average = answers.reduce((sum, answer) => sum + answer.rating, 0) / answers.length;
  const strongest = [...answers].sort((a, b) => b.rating - a.rating)[0];
  const tone =
    average >= 4.5
      ? "excellent"
      : average >= 3.5
        ? "positive"
        : "constructive";

  return `I had a ${tone} experience with ${companyName}. ${strongest.prompt.replace(/\?$/, "")} stood out to me, and I would rate that a ${strongest.rating} out of 5. Overall, the experience felt thoughtful, professional, and worth sharing with others.`;
}

export async function POST(request: Request) {
  const payload = reviewRequestSchema.safeParse(await request.json());

  if (!payload.success) {
    return NextResponse.json(
      { error: "Invalid request. Send a company name and at least one 1-5 rating." },
      { status: 400 }
    );
  }

  const { companyName, answers } = payload.data;

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({
      review: localFallbackReview(companyName, answers),
      source: "fallback"
    });
  }

  const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const completion = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    temperature: 0.7,
    max_tokens: 220,
    messages: [
      {
        role: "system",
        content:
          "Write concise, natural customer reviews. Do not mention AI, prompts, questions, or internal ratings directly unless it sounds organic."
      },
      {
        role: "user",
        content: JSON.stringify({
          task: "Generate a polished first-person review for this company.",
          companyName,
          constraints: [
            "80-130 words",
            "specific, warm, and believable",
            "do not exaggerate beyond the ratings",
            "do not invent concrete facts like staff names, prices, dates, or locations"
          ],
          customerSignals: answers
        })
      }
    ]
  });

  const review = completion.choices[0]?.message?.content?.trim();

  if (!review) {
    return NextResponse.json({ error: "OpenAI returned an empty review." }, { status: 502 });
  }

  return NextResponse.json({ review, source: "openai" });
}
