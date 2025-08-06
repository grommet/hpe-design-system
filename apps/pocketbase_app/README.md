# PocketBase Cloud Run Deployment

PocketBase is a simple, self-contained backend solution that combines a real-time database, authentication, file storage, and an admin dashboard in a single binary. This project demonstrates how to deploy PocketBase on Google Cloud Run with persistent data storage using Cloud Storage volume mounting.

## Features

- 🚀 **Serverless**: Deploy on Google Cloud Run with automatic scaling
- 💾 **Persistent Storage**: Data persists across deployments using Cloud Storage volumes
- 🔐 **Secure**: Service account-based authentication with minimal permissions
- 📱 **Real-time**: Built-in real-time subscriptions
- 🎛️ **Admin Dashboard**: Web-based admin interface
- 🔧 **API-First**: RESTful API with automatic OpenAPI documentation
- ⚡ **SQLite-Safe**: Single instance configuration prevents database corruption

## Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Cloud Run     │    │  Cloud Storage   │    │   PocketBase    │
│   Container     │◄──►│     Volume       │◄──►│    Data         │
│  (maxScale: 1)  │    │   (CSI Driver)   │    │   /app/pb_data  │
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

### How it Works

1. **Container Startup**: Cloud Run mounts Cloud Storage volume to `/app/pb_data`
2. **Volume Verification**: Startup script verifies the volume is properly mounted
3. **PocketBase Launch**: PocketBase starts and uses the mounted directory for data storage
4. **Data Persistence**: All database changes are automatically saved to Cloud Storage
5. **SQLite Safety**: Single instance (maxScale: 1) prevents concurrent database access

## Quick Start

### Prerequisites

- Google Cloud Project with billing enabled
- Google Cloud SDK (`gcloud`) installed and configured
- Docker installed

### 1. Clone and Configure

```bash
git clone <repository-url>
cd pocketbase_app

# Set your project configuration
export GOOGLE_CLOUD_PROJECT="your-project-id"
export BUCKET_NAME="ds-pocketbase"  # Or your preferred bucket name
```

### 2. Run Automated Deployment

```bash
./deploy.sh
```

This script will:
- Create a Cloud Storage bucket
- Set up a service account with appropriate permissions
- Build and push the Docker image
- Deploy to Cloud Run using the YAML configuration

### 3. Access Your PocketBase Instance

After deployment, you'll get a URL like:
```
https://pocketbase-app-xxxxx.us-central1.run.app
```

- **Admin Dashboard**: `https://your-url/_/`
- **API Documentation**: `https://your-url/api/`

## Deployment

For detailed deployment instructions, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

The deployment uses:
- **Automated Script**: `./deploy.sh` for one-command setup
- **YAML Configuration**: `cloud-run-service.yaml` for declarative service definition
- **Cloud Storage Volumes**: Native CSI driver mounting for data persistence
- **SQLite-Safe Configuration**: Single instance (maxScale: 1) prevents database corruption

## Technical Overview

For detailed technical information, see **[DEPLOYMENT.md](./DEPLOYMENT.md)** and **[CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)**

### Key Components
- **Alpine Linux Container**: Minimal, secure base image
- **PocketBase Binary**: Downloaded and verified during build
- **Cloud Storage Volume**: Native CSI driver mounting for persistence
- **Health Checks**: Extended startup probes for reliable Cloud Storage mounting

### Configuration Highlights
- **Memory**: 2Gi allocated for PocketBase operations
- **CPU**: 1000m (1 core) with throttling disabled
- **Max Scale**: 1 instance (required for SQLite safety)
- **Storage**: Cloud Storage bucket mounted at `/app/pb_data`

## Data Management

For detailed data migration and backup procedures, see **[DEPLOYMENT.md](./DEPLOYMENT.md)**

### Quick Data Migration

If you have existing PocketBase data:

```bash
# Upload your pb_data directory to Cloud Storage
gsutil -m cp -r ./pb_data/* gs://ds-pocketbase/
```

## Getting Help

- **Deployment Issues**: See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for troubleshooting
- **Cloud Storage Setup**: See **[CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)** for storage configuration
- **PocketBase Usage**: Refer to [PocketBase documentation](https://pocketbase.io/docs/)

## Files Reference

| File | Purpose |
|------|---------|
| **[DEPLOYMENT.md](./DEPLOYMENT.md)** | Complete deployment guide and troubleshooting |
| **[CLOUD_STORAGE_SETUP.md](./CLOUD_STORAGE_SETUP.md)** | Cloud Storage configuration details |
| `cloud-run-service.yaml` | Cloud Run service configuration |
| `Dockerfile` | Container build instructions |
| `startup.sh` | Container startup script |
| `deploy.sh` | Automated deployment script |

---

**Project**: HPE Design System  
**Last Updated**: August 2025  
**Version**: 1.0
