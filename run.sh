#!/usr/bin/env bash

set -e

DATA_DIR="${1:-./data}"
MODEL_PATH="${2:-./pickle/model.pkl}"
OUTPUT_PATH="${3:-./output/predictions.csv}"

mkdir -p "$(dirname "$OUTPUT_PATH")"

python src/predict.py "$DATA_DIR" "$MODEL_PATH" "$OUTPUT_PATH"

echo "Done! Predictions written to $OUTPUT_PATH"

