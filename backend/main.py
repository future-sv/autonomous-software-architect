import json
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

Return ONLY valid JSON.

Use exactly this structure:

{{
  "project_overview": "Brief description of the project and its goals.",
  "frontend": "Recommended frontend technologies and architecture.",
  "backend": "Recommended backend technologies and architecture.",
  "database": "Recommended database and data model approach.",
  "api_design": "Recommended API structure and communication approach.",
  "authentication_security": "Authentication and security recommendations.",
  "deployment": "Recommended deployment and infrastructure approach.",
  "implementation_plan": [
    "Step 1",
    "Step 2",
    "Step 3",
    "Step 4",
    "Step 5"
  ]
}}

Do not include markdown.
Do not include code fences.
Return only the JSON object.
"""
        )

        architecture = json.loads(response.output_text)

        return {
            "message": "Architecture generated successfully",
            "description": request.description,
            "architecture": architecture
        }

    except Exception as error:
        print(error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate architecture"
        )