#!/bin/sh

echo "Starting PocketBase setup..."

# PocketBase data directory (will be mounted by Cloud Run)
DATA_DIR="/app/pb_data"

# Check if the data directory is properly mounted
if [ -d "$DATA_DIR" ]; then
    echo "✅ Data directory exists: $DATA_DIR"
    
    # Check if it's writable
    if [ -w "$DATA_DIR" ]; then
        echo "✅ Data directory is writable"
    else
        echo "⚠️  Data directory is not writable, attempting to fix permissions..."
        # This might not work if we're not root, but it's worth trying
        chmod 755 "$DATA_DIR" 2>/dev/null || true
    fi
    
    # List existing files (for debugging)
    echo "Current contents of $DATA_DIR:"
    ls -la "$DATA_DIR" 2>/dev/null || echo "Directory is empty or unreadable"
else
    echo "❌ Data directory does not exist: $DATA_DIR"
    echo "Creating local data directory as fallback..."
    mkdir -p "$DATA_DIR"
fi

# Function to handle graceful shutdown
cleanup() {
    echo "Shutting down PocketBase gracefully..."
    # PocketBase should handle its own cleanup
    exit 0
}

# Set up signal handlers for graceful shutdown
trap cleanup SIGTERM SIGINT

# Start PocketBase
echo "Starting PocketBase server..."
echo "Data directory: $DATA_DIR"
echo "Port: ${PORT:-8080}"
exec ./pocketbase serve --dir="$DATA_DIR" --http=0.0.0.0:${PORT:-8080}
