# Use a specific Alpine version for reproducibility
FROM alpine:3.19 AS final

# Add comprehensive metadata labels
LABEL org.opencontainers.image.title="PocketBase App"
LABEL org.opencontainers.image.description="PocketBase application with startup script"
LABEL org.opencontainers.image.version="0.29.1"
LABEL org.opencontainers.image.vendor="HPE Design System"
LABEL org.opencontainers.image.licenses="MIT"
LABEL maintainer="HPE Design System Team"

# Set working directory
WORKDIR /app

# Expose the port PocketBase runs on (default is 8080 as expected by Cloud Run)
EXPOSE 8080

# Download PocketBase from GitHub
# You can override the PocketBase version at build time with:
#   docker build --build-arg PB_VERSION=0.30.0 .
ARG PB_VERSION=0.29.1
ENV PB_VERSION=${PB_VERSION}

# Install dependencies and download PocketBase with integrity verification
RUN apk add --no-cache unzip curl wget ca-certificates && \
  wget -O /tmp/pocketbase.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" && \
  wget -O /tmp/checksums.txt "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/checksums.txt" && \
  EXPECTED_CHECKSUM=$(grep "pocketbase_${PB_VERSION}_linux_amd64.zip" /tmp/checksums.txt | cut -d' ' -f1) && \
  ACTUAL_CHECKSUM=$(sha256sum /tmp/pocketbase.zip | cut -d' ' -f1) && \
  echo "Expected checksum: $EXPECTED_CHECKSUM" && \
  echo "Actual checksum:   $ACTUAL_CHECKSUM" && \
  if [ "$EXPECTED_CHECKSUM" != "$ACTUAL_CHECKSUM" ]; then \
  echo "❌ Checksum verification failed!" && \
  echo "Expected: $EXPECTED_CHECKSUM" && \
  echo "Actual:   $ACTUAL_CHECKSUM" && \
  exit 1; \
  fi && \
  echo "✅ Checksum verification passed" && \
  unzip /tmp/pocketbase.zip -d /app && \
  rm /tmp/pocketbase.zip /tmp/checksums.txt && \
  chmod +x /app/pocketbase && \
  apk del unzip wget && \
  rm -rf /var/cache/apk/*

# Copy your PocketBase migrations, hooks, and public files
COPY ./pb_migrations ./pb_migrations
COPY ./pb_hooks ./pb_hooks
COPY ./pb_public ./pb_public

# Create user and directories in a single layer
RUN mkdir -p /app/pb_data && \
  addgroup -g 1001 -S pocketbase && \
  adduser -u 1001 -S pocketbase -G pocketbase

# Copy startup script and set permissions
COPY startup.sh /app/startup.sh
RUN chmod 755 /app/startup.sh && \
  chown -R pocketbase:pocketbase /app && \
  find /app -type d -exec chmod 750 {} \; && \
  find /app -type f -name "*.sh" -exec chmod 755 {} \; && \
  find /app -type f ! -name "*.sh" ! -name "pocketbase" -exec chmod 644 {} \;

# Switch to non-root user for security
USER pocketbase

# Add health check using the correct PocketBase health endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Use a simple shell command execution
CMD ["/app/startup.sh"]