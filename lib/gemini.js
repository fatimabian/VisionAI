import * as FileSystem from "expo-file-system/legacy";

const GEMINI_KEY = process.env.EXPO_PUBLIC_GEMINI_KEY;
const GEMINI_URL =
`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_KEY}`;

export async function imageToBase64(uri) {
  return await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
}

export const PROMPTS = {
  academic: `
Act as a university professor.

Looking at this image, provide an academic-style analysis.

Respond ONLY with valid JSON.

{
  "objects": [],
  "context": "",
  "activities": "",
  "recommendations": ""
}

Identify:
- Objects
- Educational context
- Activities
- One constructive recommendation.
`,

  safety: `
Act as a workplace safety inspector.

Looking at this image identify hazards.

Respond ONLY with valid JSON.

{
  "objects": [],
  "context": "",
  "activities": "",
  "recommendations": ""
}

If no hazards are visible, clearly state that.
`,

  inventory: `
Act as an asset management clerk.

List every visible asset.

Respond ONLY with valid JSON.

{
  "objects": [],
  "context": "",
  "activities": "",
  "recommendations": ""
}

Do not add unnecessary commentary.
`,
};

export async function analyzeImage(base64Image, prompt) {
  const response = await fetch(GEMINI_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
            {
              inline_data: {
                mime_type: "image/jpeg",
                data: base64Image,
              },
            },
          ],
        },
      ],
    }),
  });

  const json = await response.json();

console.log("Gemini Response:");
console.log(JSON.stringify(json, null, 2));

return json;
}