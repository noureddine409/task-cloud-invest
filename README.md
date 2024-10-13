# Cloud Invest Task App

## Description

This project consists of two main applications: a NestJS backend and an Ionic Angular frontend. The backend serves as the API for the frontend application.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- Node.js (version 20.x or later)
- npm (Node Package Manager)
- Ionic CLI (if not installed, you can install it globally using npm)

## Backend (NestJS)

### Installation

1. Navigate to the backend directory:

   ```bash
   cd task-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the `backend` directory and add your environment variables. You can use the following template as a reference:

   ```plaintext
   FIREBASE_SERVICE_ACCOUNT='{
     "type": "service_account",
     "... content copied from the Firebase service account JSON configuration file
   }'
   CORS_ORIGIN=http://localhost:8100
   PORT=3000
   ENVIRONMENT=production
   ```

2. Ensure you have the Firebase service account JSON configuration file. This file is necessary for connecting to Firestore. You can obtain it from the Firebase console under **Project Settings** > **Service accounts**. Copy the content of this file and place it in the `FIREBASE_SERVICE_ACCOUNT` variable in your `.env` file.

### Running the Backend

1. Start the NestJS server:

   ```bash
   npm run start:dev
   ```

2. The backend will be available at `http://localhost:3000` (or the port specified in your configuration).

## Frontend (Ionic Angular)

### Installation

1. Navigate to the frontend directory:

   ```bash
   cd to-do
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Open the src/environments/environment.ts file in your code editor.

2. Update the apiUrl property to match the domain or IP address of your backend server. Replace "http://54.91.30.24" with your backend's URL. Your environment.ts file should look like this:


```typescript
   export const environment = {
      production: false,
      apiUrl: "http://your-backend-domain-or-ip"
};
   ```


### Running the Frontend

1. Start the Ionic development server:

   ```bash
   ionic serve
   ```

2. The frontend will be accessible at `http://localhost:8100`.
