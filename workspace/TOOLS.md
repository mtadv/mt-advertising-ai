# TOOLS.md - Local Notes

# Tools Configuration

# Tools.md
## Available Tools

## TOOL EXECUTION RULE (FINAL)

When the user approves the content calendar:

1. Generate exactly 4 static images (posts 5–8).
2. For each image:
   - Call the tool "marketing-image-generator"
   - Pass:
     postNumber
     businessType
     targetAudience
     country
     caption
     visualDirection

3. After the tool responds:
   - It will return:
     { ok: true, file: "/full/path/to/image.png" }

4. Immediately call:
   send_media
   with:
   { "file_path": "/full/path/to/image.png" }

5. Do NOT reply with text until all 4 images are generated and sent.

After all 4 succeed, reply only with:
"✅ 4 static posts generated and ready to post."
