FROM node:22-bookworm

# Install Bun (required for build scripts)
RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"
RUN corepack enable

WORKDIR /app

ARG OPENCLAW_DOCKER_APT_PACKAGES=""
RUN if [ -n "$OPENCLAW_DOCKER_APT_PACKAGES" ]; then \
    apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends $OPENCLAW_DOCKER_APT_PACKAGES && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*; \
fi

# Copy node package configs
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY ui/package.json ./ui/package.json
COPY patches ./patches
COPY scripts ./scripts

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy rest of the source code
COPY . .

# Build project with OPENCLAW_A2UI_SKIP_MISSING=1 to skip missing UI assets if any
RUN OPENCLAW_A2UI_SKIP_MISSING=1 pnpm build

# Force pnpm for UI build (Bun may fail on some architectures)
ENV OPENCLAW_PREFER_PNPM=1
RUN pnpm ui:build

ENV NODE_ENV=production

# Set environment variable for canvas directory used by image generation
ENV CANVAS_DIR=/app/.openclaw/canvas

# Make the /app/.openclaw/canvas directory writable by non-root user
RUN mkdir -p /app/.openclaw/canvas && chown -R node:node /app/.openclaw

# Switch to non-root user for security
USER node

# Expose port if needed (adjust if your gateway runs on different port)
EXPOSE 8080

# Start OpenClaw gateway
CMD ["node", "dist/index.js", "gateway", "--allow-unconfigured"]
