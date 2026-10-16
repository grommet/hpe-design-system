# Cloud Storage Setup for PocketBase

> **📖 For project overview, see [README.md](./README.md)**  
> **🚀 For deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)**

This document explains how Cloud Storage integration works with PocketBase on Cloud Run and provides setup instructions.

## Overview

The PocketBase deployment uses Google Cloud Run's native Cloud Storage volume mounting feature through the Container Storage Interface (CSI) driver. This approach provides:

- **Seamless Integration**: Native Cloud Run volume mounting
- **Automatic Management**: No manual mounting or gcsfuse installation required
- **High Performance**: Direct filesystem access to Cloud Storage
- **Reliability**: Built-in error handling and retry mechanisms

## Architecture

```
┌─────────────────────┐    ┌────────────────────────┐    ┌─────────────────────┐
│   Cloud Run         │    │   CSI Driver           │    │   Cloud Storage     │
│   Container         │◄──►│  gcsfuse.run.google... │◄──►│   Bucket            │
│                     │    │                        │    │   (ds-pocketbase)   │
│  /app/pb_data ◄─────┼────┤  Volume Mount          │    │                     │
│  (mount point)      │    │                        │    │   - data.db         │
└─────────────────────┘    └────────────────────────┘    │   - logs.db         │
                                                          │   - settings.json   │
                                                          └─────────────────────┘
```

## Cloud Storage Bucket Setup

### Automatic Setup (Recommended)

The `deploy.sh` script automatically creates and configures the bucket:

```bash
# Set your project
export GOOGLE_CLOUD_PROJECT="your-project-id"

# Run the deployment script
./deploy.sh
```

### Manual Setup

If you prefer manual setup:

#### 1. Create Bucket

```bash
# Create the bucket in us-central1 region
gsutil mb -l us-central1 gs://ds-pocketbase

# Verify bucket creation
gsutil ls -L gs://ds-pocketbase
```

#### 2. Set Bucket Permissions

```bash
# Grant storage admin access to service account
gsutil iam ch serviceAccount:pocketbase-service-account@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com:roles/storage.admin gs://ds-pocketbase
```

#### 3. Configure Bucket Settings

```bash
# Enable uniform bucket-level access for better security
gsutil uniformbucketlevelaccess set on gs://ds-pocketbase

# Set default storage class (optional)
gsutil defstorageclass set STANDARD gs://ds-pocketbase
```

## Volume Mounting Configuration

### Cloud Run Service YAML

The volume mounting is configured in `cloud-run-service.yaml`:

```yaml
spec:
  template:
    spec:
      serviceAccountName: pocketbase-service-account@hpe-design-system-adoption.iam.gserviceaccount.com
      volumes:
      - name: pocketbase-data
        csi:
          driver: gcsfuse.run.googleapis.com  # Cloud Run native CSI driver
          volumeAttributes:
            bucketName: ds-pocketbase         # Your bucket name
      containers:
      - image: gcr.io/hpe-design-system-adoption/pocketbase-app:latest
        volumeMounts:
        - name: pocketbase-data
          mountPath: /app/pb_data             # Where PocketBase stores data
```

### Key Configuration Elements

| Setting | Value | Purpose |
|---------|--------|---------|
| `driver` | `gcsfuse.run.googleapis.com` | Cloud Run's native gcsfuse CSI driver |
| `bucketName` | `ds-pocketbase` | Cloud Storage bucket containing PocketBase data |
| `mountPath` | `/app/pb_data` | Directory where PocketBase expects to find data |
| `serviceAccountName` | `pocketbase-service-account@...` | Service account with bucket access |

## Data Persistence

### How Data Persists

1. **Container Startup**: Cloud Run mounts the bucket to `/app/pb_data`
2. **PocketBase Init**: PocketBase creates/accesses database files in mounted directory
3. **Data Operations**: All database changes are written directly to Cloud Storage
4. **Container Shutdown**: Data remains in Cloud Storage
5. **Next Deployment**: New container mounts same bucket with existing data

### File Structure in Cloud Storage

```
gs://ds-pocketbase/
├── data.db           # Main SQLite database
├── logs.db           # PocketBase audit logs  
├── settings.json     # Application settings
└── storage/          # Uploaded files (if any)
    └── ...
```

## Data Migration

### From Local Development

To migrate existing PocketBase data from local development:

```bash
# Upload your local pb_data directory
gsutil -m cp -r ./pb_data/* gs://ds-pocketbase/

# Verify upload
gsutil ls -la gs://ds-pocketbase/
```

### From Another Cloud Storage Bucket

To migrate from another bucket:

```bash
# Copy data between buckets
gsutil -m cp -r gs://old-bucket/* gs://ds-pocketbase/

# Verify migration
gsutil ls -la gs://ds-pocketbase/
```

### Backup Before Migration

Always backup existing data before migration:

```bash
# Create timestamped backup
gsutil -m cp -r gs://ds-pocketbase/* gs://backup-bucket/$(date +%Y%m%d-%H%M%S)/
```

## Monitoring and Maintenance

### Check Bucket Status

```bash
# List bucket contents
gsutil ls -la gs://ds-pocketbase/

# Check bucket size and storage class
gsutil du -s gs://ds-pocketbase/

# View bucket metadata
gsutil ls -L gs://ds-pocketbase/
```

### Monitor Access Logs

Cloud Storage access logs can be enabled for auditing:

```bash
# Enable access logging (optional)
gsutil logging set on -b gs://logging-bucket gs://ds-pocketbase
```

### Performance Monitoring

Monitor bucket performance in Cloud Console:
- **Storage metrics**: Data volume, request rates
- **Network metrics**: Upload/download bandwidth
- **Error rates**: Failed requests and error types

## Troubleshooting

### Volume Mount Issues

#### Symptoms
- Container fails to start
- Log message: "Cloud Storage volume not mounted"

#### Solutions
1. **Check bucket exists**:
   ```bash
   gsutil ls gs://ds-pocketbase/
   ```

2. **Verify service account permissions**:
   ```bash
   gcloud projects get-iam-policy $GOOGLE_CLOUD_PROJECT \
       --flatten="bindings[].members" \
       --filter="bindings.members:pocketbase-service-account@$GOOGLE_CLOUD_PROJECT.iam.gserviceaccount.com"
   ```

3. **Validate YAML configuration**:
   - Ensure bucket name matches in YAML
   - Check service account name is correct
   - Verify CSI driver specification

### Data Access Issues

#### Symptoms
- PocketBase can't read/write data
- Database appears empty after deployment

#### Solutions
1. **Check volume mount in container**:
   ```bash
   # View startup logs
   gcloud logging read "resource.type=cloud_run_revision AND textPayload:mounted" --limit=10
   ```

2. **Verify bucket contents**:
   ```bash
   gsutil ls -la gs://ds-pocketbase/
   ```

3. **Test bucket access from service account**:
   ```bash
   # Test with service account key (for debugging only)
   gcloud auth activate-service-account --key-file=service-account-key.json
   gsutil ls gs://ds-pocketbase/
   ```

### Performance Issues

#### Symptoms
- Slow database operations
- High latency in PocketBase responses

#### Solutions
1. **Check bucket location** - ensure bucket is in same region as Cloud Run service
2. **Monitor storage class** - STANDARD class provides best performance
3. **Review access patterns** - frequent small writes may indicate optimization opportunities

## Security Considerations

### Access Control

- **Service Account**: Uses minimal required permissions (Storage Admin)
- **Bucket Access**: Service account has exclusive access to bucket
- **Network Security**: All traffic encrypted in transit (HTTPS/TLS)

### Data Encryption

- **At Rest**: Cloud Storage automatically encrypts data at rest
- **In Transit**: All communication uses TLS encryption
- **Keys**: Google-managed encryption keys (customer-managed keys optional)

### Best Practices

1. **Regular Backups**: Implement automated backup strategy
2. **Access Monitoring**: Enable audit logging for compliance
3. **Least Privilege**: Grant minimal required permissions
4. **Bucket Lifecycle**: Consider lifecycle policies for old data

## Cost Optimization

### Storage Costs

- **Storage Class**: Use STANDARD for active data, NEARLINE/COLDLINE for backups
- **Lifecycle Policies**: Automatically transition old data to cheaper classes
- **Data Compression**: PocketBase SQLite files compress well

### Network Costs

- **Regional Deployment**: Keep bucket and Cloud Run in same region
- **Efficient Queries**: Optimize PocketBase queries to reduce I/O
- **Batch Operations**: Group database operations when possible

### Example Lifecycle Policy

```json
{
  "lifecycle": {
    "rule": [
      {
        "action": {"type": "SetStorageClass", "storageClass": "NEARLINE"},
        "condition": {"age": 30}
      },
      {
        "action": {"type": "SetStorageClass", "storageClass": "COLDLINE"},
        "condition": {"age": 365}
      }
    ]
  }
}
```

Apply with:
```bash
gsutil lifecycle set lifecycle.json gs://ds-pocketbase
```

---

**Project**: HPE Design System  
**Last Updated**: August 2025  
**Version**: 1.0
