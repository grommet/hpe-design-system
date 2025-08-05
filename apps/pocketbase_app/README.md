# HPE Design System backend

This is meant to serve as the backend for HPE Design System applications.

The pocketbase executable is a Linux distribution intended to run on cloud infrastructure. It is configured in the Dockerfile.

For local development, download the appropriate Mac, Windows, or Linux executable. Unzip the download and place the executable in the `pocketbase_app` directory. Run the executable by:

```sh
cd ./apps/pocketbase_app/ ## pocketbase app root
./pocketbase serve ## runs app
```

## About Pocketbase

[PocketBase](https://pocketbase.io) is an open source Go backend that includes:

- embedded database (_SQLite_) with **realtime subscriptions**
- built-in **files and users management**
- convenient **Admin dashboard UI**
- and simple **REST-ish API**

**For documentation and examples, please visit https://pocketbase.io/docs.**

> [!WARNING]
> Please keep in mind that PocketBase is still under active development
> and therefore full backward compatibility is not guaranteed before reaching v1.0.0.

### API SDK clients

The easiest way to interact with the PocketBase Web APIs is to use one of the official SDK clients:

- **JavaScript - [pocketbase/js-sdk](https://github.com/pocketbase/js-sdk)** (_Browser, Node.js, React Native_)
- **Dart - [pocketbase/dart-sdk](https://github.com/pocketbase/dart-sdk)** (_Web, Mobile, Desktop, CLI_)

You could also check the recommendations in https://pocketbase.io/docs/how-to-use/.

### Overview

#### Use as standalone app

You could download the prebuilt executable for your platform from the [Releases page](https://github.com/pocketbase/pocketbase/releases).
Once downloaded, extract the archive and run `./pocketbase serve` in the extracted directory.

The prebuilt executables are based on the [`examples/base/main.go` file](https://github.com/pocketbase/pocketbase/blob/master/examples/base/main.go) and comes with the JS VM plugin enabled by default which allows to extend PocketBase with JavaScript (_for more details please refer to [Extend with JavaScript](https://pocketbase.io/docs/js-overview/)_).

## Cloud hosting

The following describes the set up and deploy steps used to run from Google Cloud, specifically the "Google Cloud Run (Recommended for most cases)" option.

This is a conceptual framework describing the general approach. Current implementation is documented in [DEPLOYMENT.md](/apps/pocketbase_app/DEPLOYMENT.md)

PocketBase is a great choice for a lightweight, self-hosted backend. Its embedded SQLite database and single executable make deployment relatively straightforward. When it comes to serving a PocketBase database from Google Cloud, you have a few primary options, each with its own advantages:

**1. Google Cloud Run (Recommended for most cases)**

Cloud Run is a serverless platform that automatically scales your stateless containers. It's often the best choice for PocketBase due to its ease of deployment, cost-effectiveness (scales to zero), and ability to handle varying traffic. The key enabling feature for PocketBase on Cloud Run is its recent support for mounting volumes, allowing you to persist your SQLite database.

**Key Concepts for Cloud Run Deployment:**

- **Stateless vs. Stateful:** Cloud Run is designed for stateless applications. However, PocketBase's embedded SQLite makes it stateful. To work around this, you'll store the `pb_data` directory (which contains your database) in a persistent volume like Google Cloud Storage.
- **Google Cloud Storage (GCS):** This will be your persistent storage for PocketBase's data.
- **Cloud Build:** Used to build your Docker image from your PocketBase application code.
- **Dockerfile:** Defines how your PocketBase application is containerized.
- **`gcloud` CLI:** Command-line tool for interacting with Google Cloud.

**Instructions for Cloud Run (General Steps):**

1.  **Prepare your PocketBase application:**

    - Download the PocketBase executable for Linux (Note: Dockerfile is configured to download the executable, so this step is already handled).
    - Organize your project: You'll typically have your PocketBase executable, `pb_migrations` (if you've made migrations), `pb_hooks` (for custom JS hooks), and `pb_public` (for serving static files).

2.  **Create a Google Cloud Storage bucket:**

    - Go to the Google Cloud Console.
    - Navigate to "Cloud Storage" > "Buckets".
    - Create a new bucket. This bucket will store your `pb_data` (the SQLite database and uploaded files).

3.  **Create a Dockerfile:**

    - In the root of your PocketBase project, create a `Dockerfile`. Here's a basic example:

    ```dockerfile
    # Use a base image for Go applications (or a minimal Linux image)
    FROM golang:1.22-alpine as builder

    # Set working directory
    WORKDIR /app

    # Copy PocketBase executable (assuming it's in your project root)
    COPY pocketbase /app/pocketbase

    # Copy other PocketBase related files
    COPY pb_migrations /app/pb_migrations
    COPY pb_hooks /app/pb_hooks
    COPY pb_public /app/pb_public

    # Build stage for custom Go code (if applicable)
    # If you have custom Go code, uncomment and adjust this section
    # COPY main.go .
    # RUN go mod init your_module_name # Only if you have go.mod
    # RUN go mod tidy
    # RUN go build -o /app/pocketbase .

    # Final stage
    FROM alpine:latest

    WORKDIR /app

    # Install necessary dependencies (e.g., for SQLite)
    RUN apk add --no-cache sqlite-libs

    # Copy PocketBase executable from builder stage
    COPY --from=builder /app/pocketbase /app/pocketbase

    # Create directories for persistent data
    RUN mkdir -p /cloud/storage/pb_data
    RUN mkdir -p /cloud/storage/pb_public
    RUN mkdir -p /cloud/storage/pb_hooks

    # Expose the PocketBase port (default is 8090)
    EXPOSE 8090

    # Command to run PocketBase
    # Mount /cloud/storage as your PocketBase data directory
    CMD ["/app/pocketbase", "serve", "--dir", "/cloud/storage/pb_data", "--publicDir", "/cloud/storage/pb_public", "--hooksDir", "/cloud/storage/pb_hooks", "--http=0.0.0.0:8090"]
    ```

    - **Important:** The `--dir`, `--publicDir`, and `--hooksDir` flags in the `CMD` instruction are crucial. They tell PocketBase to use the mounted Cloud Storage bucket for these directories.

4.  **Build and push the Docker image to Google Container Registry (or Artifact Registry):**

    ```bash
    gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/pocketbase-app .
    ```

    - Replace `YOUR_PROJECT_ID` with your actual Google Cloud Project ID.

5.  **Deploy to Cloud Run with a volume mount:**

    ```bash
    gcloud run deploy pocketbase-service \
        --image gcr.io/YOUR_PROJECT_ID/pocketbase-app \
        --platform managed \
        --region YOUR_REGION \
        --allow-unauthenticated \
        --set-env-vars POCKETBASE_DB_PATH=/cloud/storage/pb_data/data.db \
        --add-volume=name=pocketbase-storage,type=cloud-storage,bucket=YOUR_BUCKET_NAME \
        --update-volume-mount=volume=pocketbase-storage,mount-path=/cloud/storage \
        --max-instances=1 \ # Crucial for SQLite persistence
        --port 8090
    ```

    - Replace `YOUR_PROJECT_ID`, `YOUR_REGION` (e.g., `us-central1`), and `YOUR_BUCKET_NAME`.
    - `--allow-unauthenticated`: Allows public access to your PocketBase instance (adjust based on your security needs).
    - `--max-instances=1`: **This is critical for PocketBase with SQLite.** SQLite is a file-based database, and having multiple instances simultaneously writing to the same file on Cloud Storage can lead to data corruption. By setting `max-instances=1`, you ensure only one PocketBase instance is running at a time.
    - `--add-volume` and `--update-volume-mount`: These configure the Cloud Storage bucket to be mounted as a file system within your container at `/cloud/storage`. PocketBase will then use this path for its data.
    - `--port 8090`: Specifies the port your PocketBase application listens on.

6.  **Access your PocketBase instance:** After deployment, Cloud Run will provide you with a URL. Navigate to `YOUR_CLOUD_RUN_URL/_/` to access the PocketBase Admin UI.

**Important Considerations for Cloud Run:**

- **SQLite and Concurrency:** As mentioned, `max-instances=1` is essential for SQLite. If your application requires higher concurrency or horizontal scaling, PocketBase with SQLite might not be the best fit. You might consider a separate managed database service (like Cloud SQL for PostgreSQL or MySQL) and integrate PocketBase with it, or explore other backend solutions.
- **Initial Data:** If you have existing PocketBase data (e.g., from local development), upload the contents of your `pb_data` folder to the root of your Google Cloud Storage bucket _before_ deploying to Cloud Run.
- **Security:** Configure IAM roles and permissions appropriately for your Cloud Run service account and Cloud Storage bucket. Limit public access as much as possible.
- **Custom Domains:** You can map a custom domain to your Cloud Run service.
- **Health Checks:** Consider adding a health check to your Cloud Run service (e.g., `/api/health`).

- **For simplicity, cost-effectiveness, and automatic scaling to zero:** **Google Cloud Run** is generally the best choice for PocketBase, especially with the recent volume mounting feature.
- **For more control over the server environment, predictable performance, and if you prefer a traditional VM setup:** **Google Compute Engine** is a solid option.
- **For very high-scale, complex applications that require advanced orchestration and horizontal scaling (and are willing to deal with the complexity):** You _could_ consider GKE, but you'd likely want to decouple PocketBase from its embedded SQLite and use a managed relational database service like Cloud SQL for PostgreSQL or MySQL.

Always refer to the official PocketBase documentation on "Going to production" and Google Cloud's specific service documentation for the most up-to-date and detailed instructions.
