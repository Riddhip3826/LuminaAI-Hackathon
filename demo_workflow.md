# Demo Workflow

## Scenario
You are a CMO using Lumina AI to forecast Q4 marketing performance and identify risk in your current channel mix.

## Step 1: Login
1. Open the application.
2. Sign in using the Google Sign-in button powered by Firebase Authentication.

## Step 2: Data Ingestion
1. Download the `sample_dataset.csv` provided in the root repository.
2. Drag and drop this file into the Lumina dashboard.
3. The platform validates the schema (`Date`, `Channel`, `Spend`, `Revenue`, `ROAS`) and initiates the AI analysis.

## Step 3: Review AI Insights
1. **Executive Summary**: Review the high-level health score, biggest opportunities, and risks.
2. **Channel Intelligence**: See which channels (e.g., Google Ads vs Meta Ads) provide the most stable returns.
3. **Timeline Predictions**: Observe the 7-day, 30-day, 60-day, and 90-day trajectory forecasts to plan Q4 budgets.

## Step 4: Budget Simulation
1. Scroll to the "What-If Simulator" card.
2. Use the slider to increase or decrease the budget.
3. The system instantly recalculates the projected revenue, ROAS, and risk level based on the simulated adjustment.

## Step 5: Chat with Lumina
1. Click the floating chat button in the bottom right.
2. Ask "Which channel should I invest in to maximize weekend revenue?"
3. Lumina analyzes the specific data context and provides a tailored recommendation.

## Step 6: Backend Compliance Execution
To test the offline Python pipeline:
1. Ensure Python 3 is installed.
2. Run `pip install -r requirements.txt`.
3. Run the train script (optional): `python src/train.py ./data ./pickle/model.pkl`
4. Run the prediction script: `./run.sh ./data ./pickle/model.pkl ./output/predictions.csv`
5. Verify that `output/predictions.csv` has been successfully generated.
