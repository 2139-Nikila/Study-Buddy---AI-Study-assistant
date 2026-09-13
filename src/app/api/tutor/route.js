import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request) {
  try {
    const { question, subject } = await request.json();

    if (!question || !question.trim()) {
      return Response.json(
        { error: "Please enter a question." },
        { status: 400 }
      );
    }

    const prompt = `
You are an AI Study Tutor for college students.

Subject: ${subject || "General"}

Student's question:
${question}

Give a clear, accurate and beginner-friendly explanation.

Rules:
- Explain in simple language.
- Break difficult concepts into smaller parts.
- Use examples when useful.
- Use bullet points when appropriate.
- If the question involves programming, include a simple example.
- Do not make the answer unnecessarily long.
- Help the student understand the concept instead of just giving the answer.
`;

    const interaction = await ai.interactions.create({
  model: "gemini-3.8-flash",
  input: prompt,
  generation_config: {
    thinking_level: "low",
  },
});

    return Response.json({
      answer: interaction.output_text,
    });
  } catch (error) {
    console.error("Gemini API error:", error);

    return Response.json(
      {
        error: "Unable to get a response from AI Tutor. Please try again.",
      },
      { status: 500 }
    );
  }
}