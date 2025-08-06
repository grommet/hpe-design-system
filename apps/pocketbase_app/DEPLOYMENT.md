# PocketBase Cloud Run Deployment Guide

> **📖 For project overview and quick start instructions, see [README.md](./README.md)**

This guide provides comprehensive step-by-step instructions for deploying PocketBase on Google Cloud Run with persistent data storage using Cloud Storage volumes.

## Overview

This deployment uses:
- **Cloud Run**: Serverless container platform
- **Cloud Storage**: Persistent data storage via volume mounting
- **YAML Configuration**: Declarative service definition
- **Single Instance**: SQLite-safe configuration (maxScale: 1)

## Prerequisites

- Google Cloud Project with billing enabled
- Google Cloud SDK (`gcloud`) installed and authenticated
- Docker installed locally
- Basic familiarity with Cloud Run and Cloud Storage

## Automated Deployment

The fastest way to deploy is using the provided automation script:

```bash
# Set your project configuration
export GOOGLE_CLOUD_PROJECT="your-project-id"
export BUCKET_NAME="ds-pocketbase"  # Optional, defaults to ${PROJECT_ID}-pocketbase-data

# Run the deployment script
./deploy.sh
```

This script handles all the manual steps below automatically and uses environment variable substitution to make the configuration portable across different Google Cloud projects.

## Configuration Files

This deployment includes two YAML configuration files:

### `cloud-run-service.yaml` (Static)
The main configuration file with project-specific values for the HPE Design System project. This file works out-of-the-box for the default project.

### `cloud-run-service.template.yaml` (Portable Template)
A templated version that uses environment variable placeholders:
- `${PROJECT_ID}` - Your Google Cloud Project ID
- `${SERVICE_ACCOUNT_NAME}` - Service account name (defaults to "pocketbase-service-account")
- `${SERVICE_NAME}` - Cloud Run service name (defaults to "pocketbase-app")
- `${BUCKET_NAME}` - Cloud Storage bucket name

The deploy script automatically processes this template with `envsubst` to generate a project-specific configuration.

## Manual Deployment Steps

### Step 1: Create Cloud Storage Bucket

Create a bucket to store your PocketBase data:

```bash
gsutil mb -l us-central1 gs://ds-pocketbase
```

### Step 2: Create Service Account

Create a service account with Cloud Storage permissions:

```bash
# Create service account
gcloud iam service-accounts create pocketbase-service-account \
    --display-name="PocketBase Service Account"

# Grant storage admin role
gcloud projects add-iam-policy-binding $GOOGLE_CLOUD_PROJECT \
    --member="serviceAccount:pocketbase-service-account@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com" \
    --role="roles/storage.admin"
```

### Step 3: Build and Push Container Image

Build the Docker image for Cloud Run:

```bash
# Build for linux/amd64 platform (required for Cloud Run)
docker build --platform linux/amd64 -t gcr.io/$GOOGLE_CLOUD_PROJECT/pocketbase-app .

# Push to Google Container Registry
docker push gcr.io/$GOOGLE_CLOUD_PROJECT/pocketbase-app
```

### Step 4: Configure YAML Deployment

If you're using the template approach, the deploy script handles this automatically. For manual deployment, you have two options:

#### Option A: Use the Template (Recommended)
```bash
# Set environment variables
export PROJECT_ID="your-project-id"
export SERVICE_ACCOUNT_NAME="pocketbase-service-account"
export SERVICE_NAME="pocketbase-app"
export BUCKET_NAME="your-bucket-name"

# Generate the configuration
envsubst < cloud-run-service.template.yaml > cloud-run-service.generated.yaml
```

#### Option B: Edit the Static File
Update the `cloud-run-service.yaml` file with your project ID:

```bash
# Replace the project ID in the YAML file
sed -i "s/hpe-design-system-adoption/$GOOGLE_CLOUD_PROJECT/g" cloud-run-service.yaml
```

### Step 5: Deploy to Cloud Run

Deploy using the YAML configuration:

```bash
# If using the template approach
gcloud run services replace cloud-run-service.generated.yaml --region=us-central1

# If using the static file
gcloud run services replace cloud-run-service.yaml --region=us-central1
```

## YAML Configuration Details

The `cloud-run-service.yaml` file contains the complete service definition:

### Key Configuration Sections

#### Service Metadata
```yaml
metadata:
  name: pocketbase-app
  labels:
    cloud.googleapis.com/location: us-central1
  annotations:
    run.googleapis.com/ingress: all
    run.googleapis.com/ingress-status: all
```

#### Container Configuration
```yaml
spec:
  template:
    metadata:
      annotations:
        autoscaling.knative.dev/maxScale: "1"  # SQLite safety
        run.googleapis.com/cpu-throttling: "false"
        run.googleapis.com/startup-cpu-boost: "true"
        run.googleapis.com/execution-environment: gen2
```

#### Volume Mounting
```yaml
volumes:
- name: pocketbase-data
  csi:
    driver: gcsfuse.run.googleapis.com
    volumeAttributes:
      bucketName: ds-pocketbase

containers:
- volumeMounts:
  - name: pocketbase-data
    mountPath: /app/pb_data
```

#### Resource Limits
```yaml
resources:
  limits:
    cpu: 1000m
    memory: 2Gi
```

#### Health Checks
```yaml
startupProbe:
  httpGet:
    path: /api/health
    port: 8080
  timeoutSeconds: 240
  periodSeconds: 240
  failureThreshold: 20
```

## Post-Deployment Setup

### 1. Access Your Service

After deployment, get your service URL:

```bash
gcloud run services describe pocketbase-app --region=us-central1 --format="value(status.url)"
```

### 2. Create Admin User

For a fresh installation:
1. Visit `https://your-service-url/_/`
2. Create your first admin user account
3. Configure your database schema as needed

### 3. Upload Existing Data (Optional)

If you have existing PocketBase data:

```bash
# Upload your local pb_data directory
gsutil -m cp -r ./pb_data/* gs://ds-pocketbase/
```

## Verification

### Check Service Status

```bash
# View service details
gcloud run services describe pocketbase-app --region=us-central1

# Check if service is ready
gcloud run services list --filter="metadata.name=pocketbase-app"
```

### Monitor Logs

```bash
# View recent logs
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=pocketbase-app" \
    --limit=20 --project=$GOOGLE_CLOUD_PROJECT
```

### Test Health Endpoint

```bash
# Test the health check endpoint
curl https://your-service-url/api/health
```

## Important Configuration Notes

### SQLite Safety

The configuration includes `autoscaling.knative.dev/maxScale: "1"` which is **critical** for SQLite:

- **Why needed**: SQLite doesn't support concurrent writes from multiple processes
- **Impact**: Limits horizontal scaling but ensures data integrity
- **Alternative**: For high concurrency, consider migrating to PostgreSQL

### Startup Configuration

Extended startup probe settings accommodate Cloud Storage volume mounting:

- **Timeout**: 240 seconds per check
- **Failures**: Up to 20 failures allowed
- **Total time**: Up to 80 minutes for service to become ready

### Resource Allocation

The service is configured with:

- **CPU**: 1000m (1 full CPU core)
- **Memory**: 2Gi (adequate for most PocketBase workloads)
- **CPU Throttling**: Disabled for consistent performance

## Updating the Deployment

To update your deployment:

### 1. Update Container Image

```bash
# Build new image
docker build --platform linux/amd64 -t gcr.io/$GOOGLE_CLOUD_PROJECT/pocketbase-app .

# Push updated image
docker push gcr.io/$GOOGLE_CLOUD_PROJECT/pocketbase-app
```

### 2. Redeploy Service

```bash
# Redeploy using YAML (automatically pulls latest image)
gcloud run services replace cloud-run-service.yaml --region=us-central1
```

### 3. Verify Update

```bash
# Check that new revision is deployed
gcloud run revisions list --service=pocketbase-app --region=us-central1
```

## Troubleshooting

### Common Issues

#### Service Won't Start

**Symptoms**: Service stays in "Deploying" state or fails to start

**Solutions**:
1. Check that Cloud Storage bucket exists and is accessible
2. Verify service account has `storage.admin` role
3. Ensure Docker image was built for `linux/amd64` platform
4. Check logs for volume mounting errors

#### Data Not Persisting

**Symptoms**: Data disappears after redeployment

**Solutions**:
1. Verify Cloud Storage volume is properly mounted in logs
2. Check bucket name in YAML matches actual bucket
3. Ensure startup script validates volume mounting

#### Slow Startup Times

**Symptoms**: Service takes several minutes to become ready

**Expected Behavior**: First deployment can take 2-3 minutes due to:
- Cloud Storage volume mounting
- Container image download
- PocketBase initialization

### Log Analysis

Look for these key log messages:

```
✅ Cloud Storage volume mounted at /app/pb_data
🚀 Starting PocketBase server on :8080
```

### Performance Optimization

If experiencing performance issues:

1. **Monitor resource usage** in Cloud Run metrics
2. **Adjust memory/CPU** limits in YAML if needed  
3. **Consider data optimization** in PocketBase schema

## Security Considerations

### Network Security
- Service uses HTTPS by default
- Cloud Run provides automatic TLS termination

### Access Control
- Admin dashboard should use strong passwords
- Consider configuring PocketBase authentication rules
- Service account follows principle of least privilege

### Data Security
- Cloud Storage provides encryption at rest
- Data in transit is encrypted via HTTPS
- Consider additional backup strategies for critical data

## Cost Optimization

### Resource Efficiency
- Service scales to zero when not in use
- Single instance (maxScale: 1) minimizes costs
- Pay-per-request pricing model

### Storage Costs
- Cloud Storage pricing based on data volume
- Consider lifecycle policies for old data
- Monitor storage usage in Cloud Console

---

**Project**: HPE Design System  
**Last Updated**: January 2025  
**Version**: 2.0
