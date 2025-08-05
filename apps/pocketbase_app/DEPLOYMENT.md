# PocketBase Cloud Run Deployment Guide

This guide explains how to deploy the HPE Design System PocketBase backend to Google Cloud Run with persistent data storage.

## Overview

This deployment uses:

- **Google Cloud Run**: Serverless container platform
- **Google Cloud Storage**: Persistent data storage via FUSE mounting
- **Docker**: Containerized PocketBase application
- **SQLite**: Local database with cloud backup for optimal performance

## Prerequisites

1. **Google Cloud Project** with billing enabled
2. **gcloud CLI** installed and authenticated
3. **Docker** installed and running
4. **Existing PocketBase data** (optional) in `pb_data/` directory

## Initial Setup

### 1. Enable Required APIs

```bash
gcloud services enable run.googleapis.com
gcloud services enable cloudbuild.googleapis.com
gcloud services enable storage.googleapis.com
```

### 2. Create Cloud Storage Bucket

```bash
# Replace 'your-bucket-name' with a unique bucket name
gsutil mb gs://your-bucket-name
```

### 3. Configure Docker Authentication

```bash
gcloud auth configure-docker
```

## Deployment Steps

### 1. Prepare Your Data (If You Have Existing PocketBase Data)

If you have existing PocketBase data, upload it to Cloud Storage:

```bash
# Upload your existing pb_data to Cloud Storage
gsutil -m cp -r ./pb_data/* gs://your-bucket-name/
```

### 2. Build and Push Docker Image

```bash
# Build for linux/amd64 platform (required for Cloud Run)
docker build --platform linux/amd64 -t gcr.io/YOUR-PROJECT-ID/pocketbase-app .

# Push to Google Container Registry
docker push gcr.io/YOUR-PROJECT-ID/pocketbase-app
```

### 3. Deploy to Cloud Run

```bash
gcloud run deploy pocketbase-app \
  --image gcr.io/YOUR-PROJECT-ID/pocketbase-app \
  --platform managed \
  --region us-central1 \
  --add-volume name=pocketbase-volume,type=cloud-storage,bucket=your-bucket-name \
  --add-volume-mount volume=pocketbase-volume,mount-path=/app/pb_data \
  --memory 1Gi \
  --cpu 1 \
  --min-instances 1 \
  --max-instances 1 \
  --port 8080 \
  --allow-unauthenticated \
  --project=YOUR-PROJECT-ID
```

**Important Notes:**

- `max-instances=1` is **required** for SQLite to prevent database corruption
- `min-instances=1` ensures consistent performance and data availability
- Replace `YOUR-PROJECT-ID` and `your-bucket-name` with your actual values

## Setting Up Admin Access

After deployment, you need to create admin credentials:

### Option 1: Fresh Installation

Visit your deployed admin dashboard at `https://your-service-url/_/` and create the first admin user.

### Option 2: Existing Data with Lost Credentials

1. **Run PocketBase locally** with your data:

   ```bash
   ./pocketbase serve --http=127.0.0.1:8080
   ```

2. **Access local admin** at `http://127.0.0.1:8080/_/` and create/reset admin user

3. **Upload updated database**:

   ```bash
   gsutil cp ./pb_data/data.db gs://your-bucket-name/
   ```

4. **Restart Cloud Run** to pick up changes:
   ```bash
   gcloud run deploy pocketbase-app \
     --image gcr.io/YOUR-PROJECT-ID/pocketbase-app \
     --platform managed \
     --region us-central1 \
     --add-volume name=pocketbase-volume,type=cloud-storage,bucket=your-bucket-name \
     --add-volume-mount volume=pocketbase-volume,mount-path=/app/pb_data \
     --memory 1Gi \
     --cpu 1 \
     --min-instances 1 \
     --max-instances 1 \
     --port 8080 \
     --allow-unauthenticated \
     --set-env-vars RESTART_TIME=$(date +%s) \
     --project=YOUR-PROJECT-ID
   ```

## Architecture Details

### Data Flow

1. **Startup**: Container copies database from Cloud Storage to local `/tmp/pb_data_local/`
2. **Runtime**: PocketBase runs with local SQLite database for optimal performance
3. **Shutdown**: Automatic backup copies data back to Cloud Storage

### Key Files

- **`Dockerfile`**: Multi-stage build with Alpine Linux
- **`startup.sh`**: Handles data copying and backup logic
- **`pb_data/`**: Local PocketBase data directory
- **Cloud Storage**: Persistent storage for database backups

### Performance Benefits

- **Local SQLite**: Eliminates Cloud Storage FUSE performance issues
- **Automatic Backup**: Data persists between deployments
- **Single Instance**: Prevents SQLite corruption from concurrent access

## URLs and Access

After successful deployment:

- **Service URL**: `https://your-service-name-hash.us-central1.run.app`
- **Admin Dashboard**: `https://your-service-name-hash.us-central1.run.app/_/`
- **REST API**: `https://your-service-name-hash.us-central1.run.app/api/`

## Troubleshooting

### Check Logs

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=pocketbase-app" --limit=20 --project=YOUR-PROJECT-ID
```

### Common Issues

1. **Admin Login Fails**

   - Follow "Setting Up Admin Access" section above
   - Ensure database was copied correctly to Cloud Storage

2. **Container Fails to Start**

   - Check that image was built for `linux/amd64` platform
   - Verify Cloud Storage bucket exists and is accessible

3. **Data Not Persisting**

   - Verify volume mount configuration
   - Check startup.sh backup logic in logs

4. **Performance Issues**
   - Confirm PocketBase is using local storage (`/tmp/pb_data_local/`)
   - Check that only 1 instance is running

## Updating the Application

1. **Make your changes** to code/configuration
2. **Rebuild and push** the Docker image
3. **Redeploy** using the same `gcloud run deploy` command

The startup script will automatically handle data migration and backup.

## Security Considerations

- **Admin Access**: Use strong passwords for admin accounts
- **API Security**: Configure PocketBase authentication rules as needed
- **Network**: Cloud Run provides HTTPS by default
- **Data**: Cloud Storage provides encryption at rest

## Cost Optimization

- **Single Instance**: Minimizes compute costs
- **Cloud Storage**: Pay only for data stored
- **Cloud Run**: Scales to zero when not in use (with min-instances=0, but not recommended for this setup)

## Support

For issues specific to this deployment setup, check:

1. **Cloud Run logs** for startup/runtime errors
2. **Cloud Storage** for data persistence issues
3. **PocketBase documentation** for application-specific questions

---

**Project**: HPE Design System  
**Last Updated**: August 2025  
**Version**: 1.0
