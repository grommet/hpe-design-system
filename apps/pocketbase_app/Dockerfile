# Stage 1: Build a minimal final image
FROM alpine:latest AS final

# Set working directory
WORKDIR /app

# Expose the port PocketBase runs on (default is 8080 as expected by Cloud Run)
EXPOSE 8080

# Download PocketBase from GitHub
# Download PocketBase from GitHub
# You can override the PocketBase version at build time with:
#   docker build --build-arg PB_VERSION=0.30.0 .
ARG PB_VERSION=0.29.1
ENV PB_VERSION=${PB_VERSION}
ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pocketbase.zip

# Install unzip to extract the binary
RUN apk add --no-cache unzip && \
  unzip /tmp/pocketbase.zip -d /app && \
  rm /tmp/pocketbase.zip

# Copy your PocketBase migrations, hooks, and public files
COPY ./pb_migrations ./pb_migrations
COPY ./pb_hooks ./pb_hooks
COPY ./pb_public ./pb_public

# Create pb_data directory and copy startup script
RUN mkdir -p /app/pb_data
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Use ENTRYPOINT to ensure the shell handles variable expansion correctly.
ENTRYPOINT ["/bin/sh", "-c"]

# Use CMD to run the startup script
CMD ["/app/startup.sh"]