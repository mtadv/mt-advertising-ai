import fs from "fs";
import path from "path";

export default async function run(input) {
  const {
    concept,
    hook,
    script,
    duration = "7–10 seconds",
    style = "Vertical 9:16, TikTok-style",
    filename = `video-${Date.now()}`
  } = input;

  const videoPrompt = {
    format: "vertical",
    aspect_ratio: "9:16",
    duration,
    style,
    concept,
    hook,
    script,
    visual_guidelines: [
      "Close-up shots",
      "Warm lighting",
      "Smooth camera movement",
      "Minimal on-screen text"
    ],
    text_overlays: [
      hook
    ],
    audio: {
      voiceover: script,
      background_music: "soft, modern"
    }
  };

  const outputDir = "/home/node/.openclaw/canvas";
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const filePath = path.join(outputDir, `${filename}.json`);
  fs.writeFileSync(filePath, JSON.stringify(videoPrompt, null, 2));

  return {
    status: "ready_for_generation",
    format: "json",
    prompt_path: filePath
  };
}
