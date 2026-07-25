import json
import os

from dotenv import load_dotenv
from fastapi import Depends, FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from openai import OpenAI
from pydantic import BaseModel
from sqlalchemy.orm import Session

import models
from database import engine, get_db


# Load environment variables from the frontend .env.local file
load_dotenv("../.env.local")


# Create OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


# Create database tables if they do not already exist
models.Base.metadata.create_all(bind=engine)


# Create FastAPI application
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
def create_architecture(
    request: ArchitectureRequest,
    db: Session = Depends(get_db),
):
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

        # Convert AI response from JSON text into a Python dictionary
        architecture = json.loads(response.output_text)

        # Create a new database record
        saved_architecture = models.Architecture(
            project_description=request.description,
            project_overview=architecture["project_overview"],
            frontend=architecture["frontend"],
            backend=architecture["backend"],
            database=architecture["database"],
            api_design=architecture["api_design"],
            authentication_security=architecture[
                "authentication_security"
            ],
            deployment=architecture["deployment"],
            implementation_plan=json.dumps(
                architecture["implementation_plan"]
            ),
        )

        # Save architecture to SQLite database
        db.add(saved_architecture)
        db.commit()
        db.refresh(saved_architecture)

        # Send result back to frontend
        return {
            "message": "Architecture generated successfully",
            "description": request.description,
            "architecture": architecture,
            "id": saved_architecture.id,
        }

    except Exception as error:
        print(error)

        raise HTTPException(
            status_code=500,
            detail="Failed to generate architecture"
        )