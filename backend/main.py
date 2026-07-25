from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


# Allow  Next.js frontend to communicate with the backend
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


# Main architecture route
@app.post("/architecture")
def create_architecture(request: ArchitectureRequest):

    return {
        "message": "Architecture generated successfully",
        "description": request.description,
        "architecture": {
            "frontend": "Next.js",
            "backend": "FastAPI",
            "database": "PostgreSQL",
            "deployment": "Vercel + Render"
        }
    }