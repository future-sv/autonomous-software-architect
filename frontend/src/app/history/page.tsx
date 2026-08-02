"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type ArchitectureHistory = {
  id: number;
  project_description: string;
  project_overview: string;
  frontend: string;
  backend: string;
  database: string;
  api_design: string;
  authentication_security: string;
  deployment: string;
  implementation_plan: string[];
  created_at: string;
};

export default function HistoryPage() {
  const [projects, setProjects] = useState<ArchitectureHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("http://127.0.0.1:8000/history");

        if (!response.ok) {
          throw new Error("Failed to load project history");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
        setError("Could not load project history.");
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  async function deleteProject(id: number) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this architecture?"
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/history/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete architecture");
      }

      setProjects((currentProjects) =>
        currentProjects.filter((project) => project.id !== id)
      );
    } catch (error) {
      console.error(error);
      alert("Could not delete architecture.");
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
              Saved Designs
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Project History
            </h1>

            <p className="mt-3 text-gray-400">
              Review, reopen, and manage previously generated software
              architectures.
            </p>
          </div>

          <Link
            href="/architect"
            className="w-fit rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
          >
            + New Architecture
          </Link>
        </div>

        {loading && (
          <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
            <div className="flex items-center gap-3 text-gray-400">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-gray-500 border-t-transparent" />
              Loading project history...
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-300">
              Unable to load project history
            </p>

            <p className="mt-2 text-sm text-red-300/80">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="rounded-xl border border-dashed border-gray-700 bg-gray-900/50 p-10 text-center">
            <h2 className="text-xl font-semibold text-white">
              No architectures yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-gray-400">
              Generate your first software architecture and it will appear here
              automatically.
            </p>

            <Link
              href="/architect"
              className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
            >
              Create First Architecture
            </Link>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="space-y-5">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-700"
              >
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-300">
                        Project #{project.id}
                      </span>

                      <span className="text-sm text-gray-500">
                        {new Date(project.created_at).toLocaleString()}
                      </span>
                    </div>

                    <h2 className="mt-4 text-xl font-semibold leading-7 text-white">
                      {project.project_description}
                    </h2>

                    <p className="mt-3 line-clamp-2 text-sm leading-6 text-gray-400">
                      {project.project_overview}
                    </p>
                  </div>

                  <div className="flex shrink-0 gap-3">
                    <Link
                      href={`/history/${project.id}`}
                      className="rounded-lg border border-gray-700 px-4 py-2 text-center text-sm font-semibold transition hover:border-gray-500 hover:bg-gray-800"
                    >
                      View
                    </Link>

                    <button
                      onClick={() => deleteProject(project.id)}
                      className="rounded-lg border border-red-900 px-4 py-2 text-sm font-semibold text-red-400 transition hover:bg-red-950"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-10">
          <Link
            href="/"
            className="text-sm text-gray-400 transition hover:text-white"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}