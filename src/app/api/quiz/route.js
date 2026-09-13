import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

export async function POST(request) {
  try {
    const { subject, topic } = await request.json();

    if (!topic || !topic.trim()) {
      return Response.json(
        { error: "Please enter a topic." },
        { status: 400 }
      );
    }

    const prompt = `
Create a 5-question multiple-choice quiz for a college student.

Subject: ${subject || "General"}
Topic: ${topic}

Requirements:
- Exactly 5 questions.
- Each question must have exactly 4 options.
- Only one option must be correct.
- Questions should test understanding, not just memorization.
- Keep the difficulty moderate.
- Include a short explanation for every correct answer.
`;

    const schema = {
      type: "object",
      properties: {
        questions: {
          type: "array",
          items: {
            type: "object",
            properties: {
              question: {
                type: "string"
              },
              options: {
                type: "array",
                items: {
                  type: "string"
                }
              },
              correctAnswer: {
                type: "integer",
                description: "The zero-based index of the correct option."
              },
              explanation: {
                type: "string"
              }
            },
            required: [
              "question",
              "options",
              "correctAnswer",
              "explanation"
            ]
          }
        }
      },
      required: ["questions"]
    };

    const interaction = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: prompt,
      response_format: {
        type: "text",
        mime_type: "application/json",
        schema
      },
      generation_config: {
        thinking_level: "low"
      }
    });

    const quiz = JSON.parse(interaction.output_text);

    return Response.json(quiz);
  } catch (error) {
    console.error("Quiz generation error:", error);

    return Response.json(
      {
        error: "Unable to generate quiz. Please try again."
      },
      { status: 500 }
    );
  }
}