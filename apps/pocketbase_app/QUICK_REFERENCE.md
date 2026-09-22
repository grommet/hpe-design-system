# PocketBase App - Quick Reference

## Essential Commands

### Deploy to Cloud Run

```bash
# Build and deploy in one go
docker build --platform linux/amd64 -t gcr.io/YOUR-PROJECT-ID/pocketbase-app .
docker push gcr.io/YOUR-PROJECT-ID/pocketbase-app

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

### Reset Admin Credentials

```bash
# Run locally
./pocketbase serve --http=127.0.0.1:8080

# Upload updated database
gsutil cp ./pb_data/data.db gs://your-bucket-name/

# Force Cloud Run restart
gcloud run deploy pocketbase-app --set-env-vars RESTART_TIME=$(date +%s) [other-flags...]
```

### Check Logs

```bash
gcloud logging read "resource.type=cloud_run_revision AND resource.labels.service_name=pocketbase-app" --limit=20 --project=YOUR-PROJECT-ID
```

## Key URLs

- **Admin**: `https://your-service-url/_/`
- **API**: `https://your-service-url/api/`

## Important Notes

- **Max instances must be 1** (SQLite limitation)
- **Use local admin** to reset credentials, then sync to cloud
- **Data flows**: Cloud Storage → Local SQLite → Cloud Storage backup
