FROM node:22-bookworm

WORKDIR /app

# Install OpenClaw globally
RUN npm install -g openclaw

# Copy your workspace into container
COPY workspace ./workspace

# Set workspace directory
ENV OPENCLAW_WORKSPACE_DIR=/app/workspace

# Canvas directory (for image generation)
ENV CANVAS_DIR=/app/.openclaw/canvas
RUN mkdir -p /app/.openclaw/canvas

ENV NODE_ENV=production

EXPOSE 8080

# Start OpenClaw
CMD ["openclaw", "gateway", "--allow-unconfigured"]
