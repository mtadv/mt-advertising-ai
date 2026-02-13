import { execSync } from "child_process";
import path from "path";
import fs from "fs";

export default async function run(input) {
  const {
    postNumber,
    businessType,
    targetAudience,
    country,
    caption,
    visualDirection,
  } = input;

  const prompt = `
Create a high-quality marketing image for a ${businessType}
targeting ${targetAudience} in ${country}.
Style: ${visualDirection}
Caption inspiration: "${caption}"
`;

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const fileName = `${timestamp}-post-${postNumber}.png`;

  const canvasDir = "/home/node/.openclaw/canvas";
  if (!fs.existsSync(canvasDir)) {
    fs.mkdirSync(canvasDir, { recursive: true });
  }

  const outputPath = path.join(canvasDir, fileName);

  const nanoPath = "/home/node/.openclaw/skills/nano-banana-pro/scripts/generate_image.py";

  const command = `
uv run ${nanoPath} \
--prompt "${prompt.replace(/"/g, '\\"')}" \
--filename "${outputPath}" \
--resolution 2K
`;

  try {
    const output = execSync(command).toString();

    const mediaLine = output.split("\n").find(line => line.startsWith("MEDIA:"));

if (!mediaLine) {
  throw new Error("Nano Banana did not return MEDIA");
}

const generatedPath = mediaLine.replace("MEDIA: ", "").trim();

return {
  ok: true,
  file: generatedPath
};


    return {
      ok: true,
      file: outputPath
    };

  } catch (err) {
    console.error("Nano Banana failed:", err);
    return { ok: false, error: err.message };
  }
}
