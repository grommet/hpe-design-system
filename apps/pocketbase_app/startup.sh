#!/bin/sh

echo "Starting PocketBase setup..."

# Create local pb_data directory
LOCAL_DATA_DIR="/tmp/pb_data_local"
mkdir -p "$LOCAL_DATA_DIR"

# Copy database from Cloud Storage to local storage for better performance
echo "Copying database from Cloud Storage to local storage..."
if [ -f "/app/pb_data/data.db" ]; then
    cp /app/pb_data/data.db "$LOCAL_DATA_DIR/"
    echo "Database copied successfully"
else
    echo "No existing database found, will create new one"
fi

# Copy other files if they exist

# Function to backup data to Cloud Storage on exit
backup_to_cloud() {
    echo "Backing up data to Cloud Storage..."
    cp "$LOCAL_DATA_DIR"/*.db /app/pb_data/ 2>/dev/null || true
if ls /app/pb_data/*.db 1> /dev/null 2>&1; then
    echo "Copying additional .db files to local storage..."
    cp /app/pb_data/*.db "$LOCAL_DATA_DIR/"
else
    echo "No additional .db files found to copy."
fi
if ls /app/pb_data/*.ts 1> /dev/null 2>&1; then
    echo "Copying .ts files to local storage..."
    cp /app/pb_data/*.ts "$LOCAL_DATA_DIR/"
else
    echo "No .ts files found to copy."
fi
# Function to backup data to Cloud Storage on exit
backup_to_cloud() {
    echo "Backing up data to Cloud Storage..."
    if ls "$LOCAL_DATA_DIR"/*.db 1> /dev/null 2>&1; then
        echo "Copying .db files back to Cloud Storage..."
        cp "$LOCAL_DATA_DIR"/*.db /app/pb_data/
    else
        echo "No .db files found to backup."
    fi
    if ls "$LOCAL_DATA_DIR"/*.ts 1> /dev/null 2>&1; then
        echo "Copying .ts files back to Cloud Storage..."
        cp "$LOCAL_DATA_DIR"/*.ts /app/pb_data/
    else
        echo "No .ts files found to backup."
    fi
    echo "Backup complete"
}

# Set up signal handlers for graceful shutdown
trap 'backup_to_cloud; exit 0' SIGTERM SIGINT

# Start PocketBase using local data directory
echo "Starting PocketBase server with local database..."
exec ./pocketbase serve --dir="$LOCAL_DATA_DIR" --http=0.0.0.0:${PORT:-8080}
