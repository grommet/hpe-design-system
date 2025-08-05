#!/bin/sh

echo "Starting PocketBase setup..."

# Create local pb_data directory
LOCAL_DATA_DIR="/tmp/pb_data_local"
mkdir -p "$LOCAL_DATA_DIR"

# Copy database and other files from Cloud Storage to local storage for better performance
echo "Copying files from Cloud Storage to local storage..."

# Copy all database files
if ls /app/pb_data/*.db 1> /dev/null 2>&1; then
    cp /app/pb_data/*.db "$LOCAL_DATA_DIR/"
    echo "Database files copied successfully"
else
    echo "No existing database files found, will create new ones"
fi

# Copy TypeScript files if they exist
cp /app/pb_data/*.ts "$LOCAL_DATA_DIR/" 2>/dev/null || true

# Function to backup data to Cloud Storage on exit
backup_to_cloud() {
    echo "Backing up data to Cloud Storage..."
    
    # Backup database files if they exist
    if ls "$LOCAL_DATA_DIR"/*.db 1> /dev/null 2>&1; then
        cp "$LOCAL_DATA_DIR"/*.db /app/pb_data/
        echo "Database files backed up successfully"
    else
        echo "No database files to backup"
    fi
    
    # Backup TypeScript files if they exist
    if ls "$LOCAL_DATA_DIR"/*.ts 1> /dev/null 2>&1; then
        cp "$LOCAL_DATA_DIR"/*.ts /app/pb_data/
        echo "TypeScript files backed up successfully"
    else
        echo "No TypeScript files to backup"
    fi
    
    echo "Backup complete"
}

# Set up signal handlers for graceful shutdown
trap 'backup_to_cloud; exit 0' SIGTERM SIGINT

# Start PocketBase using local data directory
echo "Starting PocketBase server with local database..."
exec ./pocketbase serve --dir="$LOCAL_DATA_DIR" --http=0.0.0.0:${PORT:-8080}
