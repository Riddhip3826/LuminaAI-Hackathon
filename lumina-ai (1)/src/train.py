import sys
import pandas as pd
import pickle
import os
import glob
from sklearn.linear_model import LinearRegression

def load_data(data_dir):
    all_files = glob.glob(os.path.join(data_dir, "*.csv"))
    df_list = []
    for f in all_files:
        df = pd.read_csv(f)
        df_list.append(df)
    if not df_list:
        raise ValueError("No CSV files found in data directory")
    return pd.concat(df_list, ignore_index=True)

def generate_features(df):
    df['Spend'] = pd.to_numeric(df['Spend'], errors='coerce').fillna(0)
    df['Revenue'] = pd.to_numeric(df['Revenue'], errors='coerce').fillna(0)
    return df[['Spend']], df['Revenue']

def main():
    if len(sys.argv) != 3:
        print("Usage: python src/train.py <data_dir> <model_path>")
        sys.exit(1)
        
    data_dir = sys.argv[1]
    model_path = sys.argv[2]
    
    print(f"Loading training data from {data_dir}...")
    df = load_data(data_dir)
    
    print("Generating features...")
    X, y = generate_features(df)
    
    print("Training model...")
    model = LinearRegression()
    model.fit(X, y)
    
    os.makedirs(os.path.dirname(model_path), exist_ok=True)
    print(f"Saving model to {model_path}...")
    with open(model_path, 'wb') as f:
        pickle.dump(model, f)
    print("Training complete!")

if __name__ == "__main__":
    main()
