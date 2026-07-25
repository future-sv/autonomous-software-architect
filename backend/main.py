import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel

load_dotenv("../.env.local")

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)

app = FastAPI()


# Allow Next.js frontend to communicate with the backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Defines what information the frontend sends
class ArchitectureRequest(BaseModel):
    description: str


# Simple test route
@app.get("/")
def home():
    return {
        "message": "Autonomous Software Architect backend is running"
    }


# Main AI architecture route
@app.post("/architecture")
def create_architecture(request: ArchitectureRequest):
    try:
        response = client.responses.create(
            model="gpt-4.1-mini",
            input=f"""
You are a senior software architect.

Analyze the following software project:

{request.description}

Create a clear software architecture plan.

Include:

1. Project overview
2. Frontend recommendation
3. Backend recommendation
4. Database recommendation
5. API structure
6. Authentication
7. Deployment
8. Step-by-step implementation plan
"""
        )

        return {
            "message": "Architecture generated successfully",
            "description": request.description,
            "architecture": response.output_text
        }

    except Exception as error:
        print(error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate architecture"
        )