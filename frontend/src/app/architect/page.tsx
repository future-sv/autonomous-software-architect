"use client";

import { useState } from "react";

export default function ArchitectPage() {
  const [projectDescription, setProjectDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  async function generateArchitecture() {
    if (!projectDescription.trim()) {
      return;
    }

    setLoading(true);

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

      const data = await response.json();

      setResult(data);
    } catch (error) {
      console.error("Error connecting to backend:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-3xl px-6">
        <h1 className="text-4xl font-bold">
          Describe Your Project
        </h1>

        <p className="mt-4 text-gray-400">
          Tell the AI architect what you want to build.
        </p>

        <textarea
          value={projectDescription}
          onChange={(event) => setProjectDescription(event.target.value)}
          placeholder="Example: Build a task management application where teams can create projects, assign tasks, and set deadlines..."
          className="mt-8 min-h-48 w-full rounded-lg border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-blue-500"
        />

        <button
          onClick={generateArchitecture}
          disabled={loading}
          className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Generate Architecture"}
        </button>

        {result && (
          <div className="mt-8 rounded-lg border border-gray-700 bg-gray-900 p-6">
            <h2 className="text-2xl font-bold">
              Architecture
            </h2>

            <pre className="mt-4 whitespace-pre-wrap text-gray-300">
              {result.architecture}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}