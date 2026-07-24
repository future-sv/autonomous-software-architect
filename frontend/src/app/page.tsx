export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <div className="flex max-w-3xl flex-col items-center px-6 text-center">
        <h1 className="text-5xl font-bold">
          Autonomous Software Architect
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-gray-400">
          Describe a software project and let an AI agent analyze the
          requirements, design the architecture, and create an implementation
          plan.
        </p>

        <button className="mt-8 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
          Create Architecture
        </button>
      </div>
    </main>
  );
}