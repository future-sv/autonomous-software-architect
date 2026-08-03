import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center bg-gray-950 text-white">
      <div className="mx-auto w-full max-w-5xl px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
          AI-Powered System Design
        </p>

        <h1 className="mt-4 text-5xl font-bold md:text-6xl">
          Autonomous Software Architect
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-400">
          Describe a software project and let an AI agent analyze the
          requirements, recommend a technology stack, design the architecture,
          and create an implementation plan.
        </p>

        <div className="mt-9 flex flex-col justify-center gap-4 sm:flex-row">
          <Link
            href="/architect"
            className="rounded-lg bg-blue-600 px-6 py-3 font-semibold transition hover:bg-blue-500"
          >
            Create Architecture
          </Link>

          <Link
            href="/history"
            className="rounded-lg border border-gray-700 px-6 py-3 font-semibold transition hover:border-gray-500 hover:bg-gray-900"
          >
            View Project History
          </Link>
        </div>

        <div className="mx-auto mt-14 grid max-w-3xl gap-4 text-left md:grid-cols-3">
          <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-5">
            <p className="text-sm font-semibold text-blue-400">
              01
            </p>

            <h2 className="mt-2 font-semibold text-white">
              Describe
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Enter the software idea, requirements, and features you want to
              build.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-5">
            <p className="text-sm font-semibold text-blue-400">
              02
            </p>

            <h2 className="mt-2 font-semibold text-white">
              Generate
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              AI analyzes the project and creates a complete system
              architecture.
            </p>
          </div>

          <div className="rounded-xl border border-gray-800 bg-gray-900/70 p-5">
            <p className="text-sm font-semibold text-blue-400">
              03
            </p>

            <h2 className="mt-2 font-semibold text-white">
              Build
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-400">
              Follow the generated architecture diagram and implementation
              plan.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}