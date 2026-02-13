# marketing-image-generator

## What this skill does
Generates ready-to-post static social media images and saves them to the OpenClaw canvas.

## When to use
Use this skill ONLY when:
- The content calendar is approved
- The agent is instructed to generate static assets

## Input parameters (REQUIRED)
- postNumber (number): post index (5–8)
- businessType (string)
- targetAudience (string)
- country (string)
- caption (string)
- visualDirection (string)

## Output
- Writes a PNG image to: /home/node/.openclaw/canvas/post-{postNumber}.png
- Returns { ok: true, file }

## Rules
- No questions
- No retries
- Fail loudly if generation fails
