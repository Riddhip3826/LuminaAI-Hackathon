# Lumina AI

## Project Overview
Lumina AI is a futuristic Ecommerce Revenue Intelligence Platform. It ingests historical marketing data to generate advanced AI forecasts, analyze channel performance, and provide actionable budget optimizations.

## Features
- **Firebase Authentication**: Secure Google Sign-in.
- **CSV Data Ingestion**: Drag-and-drop CSV processing with schema validation.
- **AI Forecasting & Insights**: Generates 30, 60, and 90-day trajectory forecasts using the Gemini 2.5 Flash model.
- **Channel Intelligence**: Evaluates individual marketing channels for ROAS stability and risk.
- **What-If Simulator**: An interactive elasticity engine allowing users to simulate budget adjustments and instantly view projected revenue, ROAS, and risk impacts.
- **Conversational AI Agent**: A floating chatbot powered by Gemini, capable of answering context-aware questions based on the uploaded ecommerce data.

## Architecture
See [ARCHITECTURE.md](ARCHITECTURE.md) for a detailed breakdown of the frontend, backend, and offline ML pipelines.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```

2. **Environment Variables**
   Ensure `.env` contains your Gemini API key:
   ```env
   GEMINI_API_KEY=your_key_here
   ```

## Run Instructions

1. **Start the Web Application**
   ```bash
   npm run dev
   ```
   The application will be accessible at `http://localhost:3000`.

2. **Run Offline ML Pipeline (Hackathon Compliance)**
   ```bash
   ./run.sh ./data ./pickle/model.pkl ./output/predictions.csv
   ```

## Demo Workflow
See [demo_workflow.md](demo_workflow.md) for a step-by-step guide to demonstrating the platform's capabilities.
