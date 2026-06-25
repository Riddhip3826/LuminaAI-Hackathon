# Technical Documentation

## Overview
Lumina AI is a Revenue Intelligence Platform designed to process ecommerce marketing data, generate AI-driven forecasts, and provide actionable business insights. This document outlines the technical methodologies and system workflows.

## Data Flow
1. **Data Ingestion**: The system accepts CSV files containing marketing metrics (`Date`, `Channel`, `Spend`, `Revenue`, `ROAS`).
2. **Client-side Parsing**: Files are parsed directly in the browser using `PapaParse` to validate required columns before transmitting to the backend.
3. **AI Processing**: The parsed rows are sent to the Node.js backend (`/api/analyze-csv`), which interfaces with the Gemini 2.5 Flash model.
4. **Insights Generation**: The backend prompts the AI model to perform predictive analysis, returning structured JSON insights including timeline forecasts, executive summaries, and channel intelligence.
5. **State Management**: The React frontend uses Framer Motion to animate the transition from the uploader to the `CommandCenter` dashboard, populating various UI widgets with the AI's JSON output.

## Forecasting Methodology
The platform employs two methods for forecasting:
1. **Real-time AI Forecasting**: The primary forecasting is generated dynamically by the Gemini model. By analyzing historical trends and spending patterns in the ingested data, the model predicts 7-day, 30-day, 60-day, and 90-day trajectories.
2. **Offline ML Forecasting (Hackathon Backend)**: A parallel pipeline exists for offline predictions. A scikit-learn Linear Regression model (`src/predict.py`) extracts `Spend` features to generate explicit `Predicted_Revenue`, `Predicted_ROAS`, and `Confidence` scores, satisfying offline execution requirements.

## AI Strategy
Lumina acts as an "Executive Business Analyst + Data Strategist". 
- **Prompt Engineering**: The system instructions are designed to enforce a professional, business-focused tone, avoiding typical AI buzzwords or robotic jargon.
- **Structured Output**: The prompt enforces a strict JSON schema, ensuring consistent rendering in the UI.

## Assumptions
- The input data follows the exact schema: `Date`, `Channel`, `Spend`, `Revenue`, `ROAS`.
- Missing values or invalid types in the offline script are coerced to zero.
- The Gemini model's JSON structure remains stable based on the zero-shot prompt.

## Limitations
- The system currently only accepts the first 100 rows for AI generation to respect context window and token limitations.
- The offline ML model uses a naive Linear Regression approach without handling complex time-series seasonality.

## Future Enhancements
- Integrate a dedicated time-series forecasting model (e.g., Prophet or ARIMA) in the backend.
- Connect directly to Shopify or Google Ads APIs to bypass manual CSV uploads.
- Enhance the What-If Simulator with non-linear elasticity models.
