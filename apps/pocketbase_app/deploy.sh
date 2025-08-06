#!/bin/bash

# PocketBase Cloud Run Deployment Script
# This script sets up the necessary Google Cloud resources and deploys PocketBase

set -e

# Configuration - Update these values for your project
PROJECT_ID="${GOOGLE_CLOUD_PROJECT:-your-project-id}"
REGION="${REGION:-us-central1}"
SERVICE_NAME="pocketbase-app"
BUCKET_NAME="${BUCKET_NAME:-${PROJECT_ID}-pocketbase-data}"
SERVICE_ACCOUNT_NAME="pocketbase-service-account"
IMAGE_NAME="gcr.io/${PROJECT_ID}/${SERVICE_NAME}"

echo "🚀 Deploying PocketBase to Google Cloud Run"
echo "Project ID: $PROJECT_ID"
echo "Region: $REGION"
echo "Bucket: $BUCKET_NAME"
echo "Service Account: $SERVICE_ACCOUNT_NAME"

# Check if gcloud is authenticated
if ! gcloud auth list --filter=status:ACTIVE --format="value(account)" | grep -q .; then
    echo "❌ Please authenticate with gcloud first:"
    echo "   gcloud auth login"
    exit 1
fi

# Set the project
echo "📋 Setting project to $PROJECT_ID..."
gcloud config set project "$PROJECT_ID"

# Enable required APIs
echo "🔧 Enabling required APIs..."
gcloud services enable \
    cloudbuild.googleapis.com \
    run.googleapis.com \
    storage.googleapis.com \
    iam.googleapis.com

# Create Cloud Storage bucket if it doesn't exist
echo "🪣 Creating Cloud Storage bucket..."
if ! gsutil ls -b gs://"$BUCKET_NAME" &>/dev/null; then
    gsutil mb -l "$REGION" gs://"$BUCKET_NAME"
    echo "✅ Created bucket: gs://$BUCKET_NAME"
else
    echo "✅ Bucket already exists: gs://$BUCKET_NAME"
fi

# Create service account if it doesn't exist
echo "👤 Creating service account..."
if ! gcloud iam service-accounts describe "$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" &>/dev/null; then
    gcloud iam service-accounts create "$SERVICE_ACCOUNT_NAME" \
        --display-name="PocketBase Service Account" \
        --description="Service account for PocketBase Cloud Run service"
    echo "✅ Created service account: $SERVICE_ACCOUNT_NAME"
else
    echo "✅ Service account already exists: $SERVICE_ACCOUNT_NAME"
fi

# Grant necessary permissions to the service account
echo "🔐 Granting permissions to service account..."
gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/storage.admin"

gcloud projects add-iam-policy-binding "$PROJECT_ID" \
    --member="serviceAccount:$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --role="roles/logging.logWriter"

# Build the Docker image
echo "🏗️  Building Docker image..."
docker build -t "$IMAGE_NAME:latest" .

# Push the image to Google Container Registry
echo "📦 Pushing image to Container Registry..."
docker push "$IMAGE_NAME:latest"

# Deploy to Cloud Run
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy "$SERVICE_NAME" \
    --image="$IMAGE_NAME:latest" \
    --region="$REGION" \
    --service-account="$SERVICE_ACCOUNT_NAME@$PROJECT_ID.iam.gserviceaccount.com" \
    --memory="2Gi" \
    --cpu="1" \
    --allow-unauthenticated \
    --execution-environment=gen2 \
    --set-env-vars="GCS_BUCKET_NAME=$BUCKET_NAME" \
    --add-volume=name=gcs-data,type=cloud-storage,bucket="$BUCKET_NAME" \
    --add-volume-mount=volume=gcs-data,mount-path=/app/pb_data \
    --port=8080

echo "✅ Deployment complete!"

# Get the service URL
SERVICE_URL=$(gcloud run services describe "$SERVICE_NAME" --region="$REGION" --format="value(status.url)")
echo "🌐 Service URL: $SERVICE_URL"
echo "🏥 Health check: $SERVICE_URL/api/health"

echo ""
echo "📋 Next steps:"
echo "1. Visit $SERVICE_URL to access your PocketBase admin"
echo "2. Set up your admin account"
echo "3. Your data will now persist in gs://$BUCKET_NAME"
echo ""
echo "📊 To monitor your service:"
echo "   gcloud run services logs read $SERVICE_NAME --region=$REGION"
