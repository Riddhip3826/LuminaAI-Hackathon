#!/bin/bash

# Ensure required arguments are provided
if [ "$#" -ne 3 ]; then
    echo "Usage: ./run.sh <data_dir> <model_path> <output_path>"
    exit 1
fi

DATA_DIR=$1
MODEL_PATH=$2
OUTPUT_PATH=$3

# Run the python predict script
python src/predict.py "$DATA_DIR" "$MODEL_PATH" "$OUTPUT_PATH"
