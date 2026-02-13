import { run } from '../marketing-image-generator/generate.js';  // adjust path if needed

export default async function forceGenerate(input) {
  console.log('forceGenerate called with:', input);
  try {
    const result = await run(input);
    console.log('Success → file:', result.file);
    return result;
  } catch (err) {
    console.error('forceGenerate failed:', err.message);
    return { ok: false, error: err.message };
  }
}