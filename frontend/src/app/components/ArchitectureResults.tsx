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

type ResultSectionProps = {
  title: string;
  content: string;
};

function ResultSection({
  title,
  content,
}: ResultSectionProps) {
  return (
    <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-gray-700">
      <h3 className="text-xl font-semibold text-white">
        {title}
      </h3>

      <p className="mt-3 whitespace-pre-line leading-7 text-gray-300">
        {content}
      </p>
    </section>
  );
}

export default function ArchitectureResults({
  result,
}: ArchitectureResultsProps) {
  if (!result) {
    return null;
  }

  return (
    <div className="mt-12 w-full space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
          Generated System Design
        </p>

        <h2 className="mt-2 text-3xl font-bold text-white">
          Architecture Results
        </h2>

        <p className="mt-2 text-gray-400">
          Recommended technologies, system components, and implementation steps
          for your project.
        </p>
      </div>

      <ArchitectureDiagram
        frontend={result.frontend}
        backend={result.backend}
        database={result.database}
      />

      <ResultSection
        title="Project Overview"
        content={result.project_overview}
      />

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection
          title="Frontend"
          content={result.frontend}
        />

        <ResultSection
          title="Backend"
          content={result.backend}
        />

        <ResultSection
          title="Database"
          content={result.database}
        />

        <ResultSection
          title="API Design"
          content={result.api_design}
        />

        <ResultSection
          title="Authentication & Security"
          content={result.authentication_security}
        />

        <ResultSection
          title="Deployment"
          content={result.deployment}
        />
      </div>

      <section className="rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h3 className="text-xl font-semibold text-white">
          Implementation Plan
        </h3>

        <p className="mt-2 text-sm text-gray-400">
          Recommended order for building the system.
        </p>

        <ol className="mt-6 space-y-4">
          {result.implementation_plan.map((step, index) => (
            <li
              key={index}
              className="flex gap-4 rounded-lg border border-gray-800 bg-gray-950/50 p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
                {index + 1}
              </div>

              <p className="pt-1 leading-6 text-gray-300">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}