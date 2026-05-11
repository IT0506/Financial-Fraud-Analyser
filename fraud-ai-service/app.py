from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # or ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class Transaction(BaseModel):
    sender: str
    receiver: str
    amount: float
    location: str
    status: str
@app.get("/")
def home():
    return {
        "message": "Fraud AI Service Running"
    }

@app.post("/predict")
def predict(data: dict):

    print(data)

    amount = float(data.get("amount", 0))

    print("Amount:", amount)

    if amount >= 100000:
        return {
            "fraudScore": 0.95,
            "riskLevel": "HIGH",
            "action": "BLOCK"
        }

    elif amount >= 50000:
        return {
            "fraudScore": 0.6,
            "riskLevel": "MEDIUM",
            "action": "REVIEW"
        }

    else:
        return {
            "fraudScore": 0.1,
            "riskLevel": "LOW",
            "action": "ALLOW"
        }