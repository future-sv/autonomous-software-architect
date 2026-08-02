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


# Load environment variables
load_dotenv("../.env.local")


# Create OpenAI client
client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


# Create database tables
models.Base.metadata.create_all(bind=engine)


# Create FastAPI application
app = FastAPI()


# Allow Next.js frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Defines what the frontend sends when generating an architecture
class ArchitectureRequest(BaseModel):
    description: str


# Test route
@app.get("/")
def home():
    return {
        "message": "Autonomous Software Architect backend is running"
    }


# Get all saved architectures
@app.get("/history")
def get_history(db: Session = Depends(get_db)):
    architectures = (
        db.query(models.Architecture)
        .order_by(models.Architecture.created_at.desc())
        .all()
    )

    return [
        {
            "id": architecture.id,
            "project_description": architecture.project_description,
            "project_overview": architecture.project_overview,
            "frontend": architecture.frontend,
            "backend": architecture.backend,
            "database": architecture.database,
            "api_design": architecture.api_design,
            "authentication_security": architecture.authentication_security,
            "deployment": architecture.deployment,
            "implementation_plan": json.loads(
                architecture.implementation_plan
            ),
            "created_at": architecture.created_at,
        }
        for architecture in architectures
    ]


# Get one saved architecture by ID
@app.get("/history/{architecture_id}")
def get_architecture(
    architecture_id: int,
    db: Session = Depends(get_db),
):
    architecture = (
        db.query(models.Architecture)
        .filter(models.Architecture.id == architecture_id)
        .first()
    )

    if architecture is None:
        raise HTTPException(
            status_code=404,
            detail="Architecture not found",
        )

    return {
        "id": architecture.id,
        "project_description": architecture.project_description,
        "project_overview": architecture.project_overview,
        "frontend": architecture.frontend,
        "backend": architecture.backend,
        "database": architecture.database,
        "api_design": architecture.api_design,
        "authentication_security": architecture.authentication_security,
        "deployment": architecture.deployment,
        "implementation_plan": json.loads(
            architecture.implementation_plan
        ),
        "created_at": architecture.created_at,
    }


# Delete one saved architecture
@app.delete("/history/{architecture_id}")
def delete_architecture(
    architecture_id: int,
    db: Session = Depends(get_db),
):
    architecture = (
        db.query(models.Architecture)
        .filter(models.Architecture.id == architecture_id)
        .first()
    )

    if architecture is None:
        raise HTTPException(
            status_code=404,
            detail="Architecture not found",
        )

    db.delete(architecture)
    db.commit()

    return {
        "message": "Architecture deleted successfully"
    }


# Generate and save a new AI architecture
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

        # Convert AI response from JSON text into Python data
        architecture = json.loads(response.output_text)

        # Create database record
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

        # Save architecture
        db.add(saved_architecture)
        db.commit()
        db.refresh(saved_architecture)

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
            detail="Failed to generate architecture",
        )