"use client";

import { useState } from "react";
import ArchitectureResults from "../components/ArchitectureResults";

export default function ArchitectPage() {
  const [projectDescription, setProjectDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateArchitecture() {
    if (!projectDescription.trim()) {
      setError("Please describe your project before generating an architecture.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://127.0.0.1:8000/architecture", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          description: projectDescription,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate architecture.");
      }

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Error connecting to backend:", error);

      setError(
        "Something went wrong while generating the architecture. Please make sure the backend is running and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 py-16 text-white">
      <div className="w-full max-w-5xl px-6">
        <h1 className="text-4xl font-bold">
          Describe Your Project
        </h1>

        <p className="mt-4 text-gray-400">
          Tell the AI architect what you want to build.
        </p>

        <textarea
          value={projectDescription}
          onChange={(event) => {
            setProjectDescription(event.target.value);

            if (error) {
              setError("");
            }
          }}
          placeholder="Example: Build a task management application where teams can create projects, assign tasks, and set deadlines..."
          disabled={loading}
          className="mt-8 min-h-48 w-full rounded-lg border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          onClick={generateArchitecture}
          disabled={loading}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Generating Architecture..." : "Generate Architecture"}
        </button>

        {loading && (
          <div className="mt-6 rounded-lg border border-blue-900 bg-blue-950/40 p-4 text-blue-300">
            AI architect is analyzing your project and designing the architecture...
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-red-900 bg-red-950/40 p-4 text-red-300">
            {error}
          </div>
        )}

        {result && (
          <ArchitectureResults result={result.architecture} />
        )}
      </div>
    </main>
  );
}