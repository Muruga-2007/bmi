import { GoogleGenerativeAI } from "@google/generative-ai";

type AuraInput = {
  name?: string;
  age?: number;
  gender?: string;
  height?: number; // cm
  weight?: number; // kg
  bmi: number;
  category: string; // Underweight / Normal / Overweight / Obese
  activityLevel?: string; // Sedentary / Moderate / Active / very-active
  goal?: string; // Maintain / Gain / Lose
  history?: Array<{ date?: string; bmi: number }>; // optional
  lastAdvice?: string;
  dietType?: string; // Vegetarian / Vegan / etc.
};

function buildAuraPrompt(data: AuraInput) {
  const historyStr = data.history?.map(h => `${h.date ?? ""}:${h.bmi}`).join(", ") ?? "";
  return `
You are "AURA" — an advanced Health Coach inside a BMI & Nutrition app.

### Inputs:
- Name: ${data.name ?? "Friend"}
- Age: ${data.age ?? "-"}
- Gender: ${data.gender ?? "-"}
- Height: ${data.height ?? "-"} cm
- Weight: ${data.weight ?? "-"} kg
- BMI: ${data.bmi}
- Category: ${data.category}
- Activity Level: ${data.activityLevel ?? "-"}
- Goal: ${data.goal ?? "Maintain"}
- Past BMI Records: ${historyStr}
- Last Advice: ${data.lastAdvice ?? ""}
- Dietary Preference: ${data.dietType ?? ""}

### Your Tasks:
1) Interpret BMI & Health Context (simple, human terms; note if healthy or needs attention; refer to trend if history provided)
2) Generate Personalized Diet Advice: estimated TDEE, macro split, 3–4 practical food/habit tips; prefer Indian/Asian examples when ambiguous
3) Motivational coaching in 1–2 sentences
4) If history provided, compare last vs current briefly

### Rules:
- Keep total under 300 words, simple and empathetic
- General wellness only; avoid medical diagnosis
- Do not mention AI or Gemini

Respond in concise structured markdown with these sections: BMI Summary, Diet & Nutrition Plan (TDEE, macros, 3–4 suggestions), Progress Insight (if applicable), Motivation.
`;
}

export async function generateDietAdvice(input: AuraInput) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "Advice unavailable right now.";

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const res = await model.generateContent(buildAuraPrompt(input));
  return res.response.text();
}


