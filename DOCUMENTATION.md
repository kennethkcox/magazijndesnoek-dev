# Magazijn de Snoek - Documentation

This documentation provides a comprehensive overview of the Magazijn de Snoek website, including its features, project structure, and deployment process.

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [Database](#database)
- [Admin Panel](#admin-panel)

## Project Overview

Magazijn de Snoek is a single-page application built with SvelteKit and styled with Tailwind CSS. It features a "Warm Brutalism" aesthetic and is designed to be deployed on the DigitalOcean App Platform. The application includes an admin panel for event creation, with event data stored in a DigitalOcean Serverless JSON Database.

## Features

- **Event Agenda:** Displays a list of upcoming and past events.
- **Event Details:** Provides detailed information for each event.
- **Admin Panel:** A password-protected interface for creating and managing events.
- **Responsive Design:** A mobile-friendly layout that adapts to different screen sizes.

## Project Structure

The project follows a standard SvelteKit application structure:

- **`src/`**: Contains the main source code.
  - **`lib/`**: Includes shared modules.
    - **`database.ts`**: Manages the connection to the DigitalOcean JSON database.
    - **`types.ts`**: Defines the `Event` interface.
  - **`routes/`**: Defines the application's pages and API routes.
    - **`admin/`**: Contains the admin panel.
    - **`agenda/`**: The main event listing.
    - **`event/[slug]/`**: The event detail page.
- **`static/`**: For static assets.
- **`package.json`**: Lists project dependencies and scripts.
- **`svelte.config.js`**: SvelteKit configuration.
- **`tailwind.config.js`**: Tailwind CSS configuration.

## Getting Started

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```
   VITE_ADMIN_PASSWORD="your-admin-password"
   DO_JSON_DB_URL="your-database-url"
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Deployment

This guide will walk you through deploying your SvelteKit application to the DigitalOcean App Platform.

### Prerequisites

* A DigitalOcean account.
* A GitHub account with your project pushed to a repository.

### Step-by-Step Guide

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

### Important Notes

*   **Password Security:** The admin password and database URL are set as environment variables, which is a secure way to handle secrets in the DigitalOcean App Platform.
*   **SSL:** DigitalOcean automatically provides a free, managed SSL certificate for your app.

## Database

The application uses a DigitalOcean Serverless JSON Database to store event data. The `src/lib/database.ts` module handles all database interactions, and the `Event` interface in `src/lib/types.ts` defines the data structure.

## Admin Panel

The admin panel is located at `/admin` and is protected by a password set via the `VITE_ADMIN_PASSWORD` environment variable. It allows authorized users to add new events to the database.