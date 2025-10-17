# Deploying to DigitalOcean App Platform

This guide will walk you through deploying your SvelteKit application to the DigitalOcean App Platform.

## Prerequisites

* A DigitalOcean account.
* A GitHub account with your project pushed to a repository.

## Step-by-Step Guide

1.  **Create a New App:**
    *   Log in to your DigitalOcean account.
    *   Navigate to the "Apps" section and click "Create App".

2.  **Connect Your GitHub Repository:**
    *   Select "GitHub" as the source for your code.
    *   Authenticate with your GitHub account and select the repository for this project.
    *   Choose the branch you want to deploy (e.g., `main`).
    *   DigitalOcean will automatically detect that this is a Node.js project.

3.  **Create a Database:**
    *   Navigate to the "Databases" section and click "Create Database".
    *   Choose "JSON" as the database type.
    *   Select a region and a plan.
    *   Give your database a name and click "Create Database".

4.  **Configure the App:**
    *   **App Name:** Give your app a name.
    *   **Region:** Choose a region close to your users.
    *   **App-Level Environment Variables:**
        *   Click "Edit" next to "Environment Variables".
        *   Add a new variable with the key `VITE_ADMIN_PASSWORD` and set the value to your desired admin password. This will be used to protect the `/admin` route.
        *   Add another variable with the key `DO_JSON_DB_URL` and set the value to the connection string for your JSON database. You can find this in the "Connection Details" section of your database.
        *   Make sure to check the "Encrypt" box for both variables.
    *   **Build Command:** The build command should be `npm run build`.
    *   **Run Command:** The run command should be `npm run start`.
    *   **HTTP Port:** The HTTP port should be `3000`.

5.  **Launch the App:**
    *   Click "Create App" to start the deployment process.
    *   DigitalOcean will build your application and deploy it. You can monitor the progress in the "Deployments" tab.

6.  **Set Up a Custom Domain (Optional):**
    *   Once the deployment is complete, you can add a custom domain in the "Settings" tab of your app.

## Important Notes

*   **Password Security:** The admin password and database URL are set as environment variables, which is a secure way to handle secrets in the DigitalOcean App Platform.
*   **SSL:** DigitalOcean automatically provides a free, managed SSL certificate for your app.