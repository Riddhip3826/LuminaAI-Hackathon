# Architecture

## High-Level Architecture
Lumina AI follows a modern full-stack web application architecture:
- **Frontend**: React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express
- **AI Integration**: Google Gen AI SDK (Gemini 2.5 Flash)
- **Database / Auth**: Firebase (Authentication, Firestore)

## Component Breakdown

### Frontend (Client-side)
- `App.tsx`: The main entry point, handles Firebase Authentication state.
- `Dashboard.tsx`: Coordinates the main layout, rendering either `FileUploader` or `CommandCenter`.
- `FileUploader.tsx`: Uses `react-dropzone` and `PapaParse` to read and validate CSVs. Sends data to the backend.
- `CommandCenter.tsx`: The primary dashboard view displaying various metric cards (`ExecutiveSummaryCard`, `RevenueChart`, `TimelinePredictions`, `WhatIfSimulator`).

### Backend (Server-side)
- `server.ts`: An Express server that exposes the `/api/analyze-csv` and `/api/chat` endpoints.
- Interacts with the Gemini API to analyze the uploaded data and return structured JSON.
- Serves the production-built React application in a non-development environment.

### Machine Learning Pipeline (Offline)
- `src/predict.py`: An offline Python script to generate predictions based on a trained model.
- `src/train.py`: A script to train a `LinearRegression` model using historical data.
- `pickle/model.pkl`: The serialized, trained model artifact.
- `run.sh`: A bash script executing the ML pipeline for backend compliance.
