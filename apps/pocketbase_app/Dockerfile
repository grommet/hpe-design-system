# Use a specific Alpine version for reproducibility
FROM alpine:3.19 AS final

# Add metadata labels
LABEL org.opencontainers.image.title="PocketBase App"
LABEL org.opencontainers.image.description="PocketBase application with startup script"

# Set working directory
WORKDIR /app

# Expose the port PocketBase runs on (default is 8080 as expected by Cloud Run)
EXPOSE 8080

# Download PocketBase from GitHub
# You can override the PocketBase version at build time with:
#   docker build --build-arg PB_VERSION=0.30.0 .
ARG PB_VERSION=0.29.1
ENV PB_VERSION=${PB_VERSION}

# Install dependencies and download PocketBase in a single layer
RUN apk add --no-cache unzip curl && \
  wget -O /tmp/pocketbase.zip "https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip" && \
  unzip /tmp/pocketbase.zip -d /app && \
  rm /tmp/pocketbase.zip && \
  chmod +x /app/pocketbase && \
  apk del unzip && \
  rm -rf /var/cache/apk/*

# Copy your PocketBase migrations, hooks, and public files
COPY ./pb_migrations ./pb_migrations
COPY ./pb_hooks ./pb_hooks
COPY ./pb_public ./pb_public

# Create pb_data directory and copy startup script
RUN mkdir -p /app/pb_data && \
  addgroup -g 1001 -S pocketbase && \
  adduser -u 1001 -S pocketbase -G pocketbase && \
  mkdir -p /tmp && \
  chmod 1777 /tmp

COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh && \
  chown -R pocketbase:pocketbase /app

# Switch to non-root user for security
USER pocketbase

# Add health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/health || exit 1

# Use ENTRYPOINT to ensure the shell handles variable expansion correctly.
ENTRYPOINT ["/bin/sh", "-c"]

# Use CMD to run the startup script
CMD ["/app/startup.sh"]