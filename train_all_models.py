#!/usr/bin/env python3
"""
Script to train all ML models for disease prediction
"""
from main import DiseasePrediction

# List of all models to train
models = ['mnb', 'decision_tree', 'random_forest', 'gradient_boost']

print("=" * 60)
print("Training all disease prediction models...")
print("=" * 60)

for model_name in models:
    print(f"\n{'='*60}")
    print(f"Training {model_name}...")
    print(f"{'='*60}\n")
    
    # Instantiate the Class
    dp = DiseasePrediction(model_name=model_name)
    # Train the Model
    dp.train_model()
    # Get Model Performance on Test Data
    test_accuracy, classification_report = dp.make_prediction(saved_model_name=model_name)
    print(f"\n{model_name} Test Accuracy: {test_accuracy}")
    print(f"\n{classification_report}")

print("\n" + "=" * 60)
print("All models trained successfully!")
print("=" * 60)

