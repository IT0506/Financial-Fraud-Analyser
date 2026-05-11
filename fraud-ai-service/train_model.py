import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib

data = pd.DataFrame({
    "amount": [1000, 5000, 70000, 150000],
    "fraud": [0, 0, 1, 1]
})

X = data[["amount"]]
y = data["fraud"]

model = RandomForestClassifier()
model.fit(X, y)

joblib.dump(model, "fraud_model.pkl")