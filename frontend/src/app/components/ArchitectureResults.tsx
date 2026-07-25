import ArchitectureDiagram from "./ArchitectureDiagram";

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

type ArchitectureResultsProps = {
  result: Architecture;
};

export default function ArchitectureResults({
  result,
}: ArchitectureResultsProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="mt-10 w-full space-y-6">
      <h2 className="text-3xl font-bold text-white">
        Architecture Results
      </h2>

      <ArchitectureDiagram
        frontend={result.frontend}
        backend={result.backend}
        database={result.database}
      />

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Project Overview
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.project_overview}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Frontend
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.frontend}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Backend
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.backend}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Database
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.database}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          API Design
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.api_design}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Authentication & Security
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.authentication_security}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Deployment
        </h3>

        <p className="mt-3 leading-7 text-gray-300">
          {result.deployment}
        </p>
      </section>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Implementation Plan
        </h3>

        <ol className="mt-4 space-y-3 text-gray-300">
          {result.implementation_plan.map((step, index) => (
            <li key={index} className="flex gap-3">
              <span className="font-semibold text-blue-400">
                {index + 1}.
              </span>

              <span>{step}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}