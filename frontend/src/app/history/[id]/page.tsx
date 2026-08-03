"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import ArchitectureResults from "../../components/ArchitectureResults";

type Architecture = {
  project_overview: string;
  frontend: string;
  backend: string;
  database: string;
  api_design: string;
  authentication_security: string;
  deployment: string;
  implementation_plan: string[];
};

type SavedProject = Architecture & {
  id: number;
  project_description: string;
  created_at: string;
};

export default function SavedArchitecturePage() {
  const params = useParams();
  const id = params.id;

  const [project, setProject] = useState<SavedProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchArchitecture() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/history/${id}`
        );

        if (!response.ok) {
          throw new Error("Failed to load architecture");
        }

        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error(error);
        setError("Could not load this saved architecture.");
      } finally {
        setLoading(false);
      }
    }

    if (id) {
      fetchArchitecture();
    }
  }, [id]);

  return (
    <main className="min-h-screen bg-gray-950 px-6 py-16 text-white">
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link
              href="/history"
              className="text-sm text-gray-400 transition hover:text-white"
            >
              ← Back to History
            </Link>

            <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-blue-400">
              Saved Architecture
            </p>

            <h1 className="mt-2 text-4xl font-bold">
              Architecture Details
            </h1>
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
              Loading architecture...
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-900 bg-red-950/40 p-5">
            <p className="font-medium text-red-300">
              Unable to load architecture
            </p>

            <p className="mt-2 text-sm text-red-300/80">
              {error}
            </p>
          </div>
        )}

        {!loading && !error && project && (
          <>
            <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-950 px-3 py-1 text-xs font-semibold text-blue-300">
                  Project #{project.id}
                </span>

                <span className="text-sm text-gray-500">
                  {new Date(project.created_at).toLocaleString()}
                </span>
              </div>

              <h2 className="mt-5 text-2xl font-semibold text-white">
                Project Description
              </h2>

              <p className="mt-3 leading-7 text-gray-300">
                {project.project_description}
              </p>
            </section>

            <ArchitectureResults result={project} />

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/history"
                className="rounded-lg border border-gray-700 px-5 py-3 font-semibold text-gray-200 transition hover:border-gray-500 hover:bg-gray-900"
              >
                Back to History
              </Link>

              <Link
                href="/architect"
                className="rounded-lg bg-blue-600 px-5 py-3 font-semibold transition hover:bg-blue-500"
              >
                Generate Another
              </Link>
            </div>
          </>
        )}
      </div>
    </main>
  );
}