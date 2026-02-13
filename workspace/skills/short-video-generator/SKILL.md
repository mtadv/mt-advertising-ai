# short-video-generator

Prepare short-form vertical social media videos for TikTok, Instagram Reels, Facebook Reels, and Snapchat.

## When to use
Use this skill when:
- A video post is finalized
- The content calendar is approved
- A full script and hook already exist

## Inputs
- concept (string): What the video is about
- hook (string): First 2–3 seconds
- script (string): Word-for-word spoken lines
- duration (string): e.g. "7–10 seconds"
- style (string): e.g. "TikTok-style, fast-paced"
- filename (string): Output name

## Output
- prompt_path (string): Path to saved video prompt file
- format (string): json
- status (string): ready_for_generation

## Notes
- This skill prepares FINAL prompts for AI video generators
- Does NOT claim video is rendered unless a video API is connected
