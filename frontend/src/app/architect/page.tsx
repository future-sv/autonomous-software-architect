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

  function resetArchitecture() {
    setResult(null);
    setProjectDescription("");
    setError("");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <main className="min-h-screen bg-gray-950 py-16 text-white">
      <div className="mx-auto w-full max-w-5xl px-6">
        <h1 className="text-4xl font-bold">
          Describe Your Project
        </h1>

        <p className="mt-4 text-gray-400">
          Tell the AI architect what you want to build and it will generate a
          complete software architecture.
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
          className="mt-8 min-h-48 w-full resize-none rounded-xl border border-gray-700 bg-gray-900 p-4 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          onClick={generateArchitecture}
          disabled={loading}
          className="mt-6 flex items-center gap-3 rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading && (
            <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
          )}

          {loading ? "Generating Architecture..." : "Generate Architecture"}
        </button>

        {loading && (
          <div className="mt-6 rounded-xl border border-blue-900 bg-blue-950/40 p-5">
            <p className="font-medium text-blue-300">
              AI architect is designing your system...
            </p>

            <p className="mt-2 text-sm text-blue-300/70">
              Analyzing requirements, selecting technologies, and creating an
              implementation plan.
            </p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-xl border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-300">
              Unable to generate architecture
            </p>

            <p className="mt-2 text-sm text-red-300/80">
              {error}
            </p>
          </div>
        )}

        {result && (
          <div>
            <ArchitectureResults result={result.architecture} />

            <button
              onClick={resetArchitecture}
              className="mt-8 rounded-lg border border-gray-700 px-6 py-3 font-semibold text-gray-200 transition hover:border-gray-500 hover:bg-gray-900"
            >
              Generate Another Architecture
            </button>
          </div>
        )}
      </div>
    </main>
  );
}