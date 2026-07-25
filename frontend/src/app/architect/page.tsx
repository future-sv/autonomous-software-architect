export default function ArchitectPage() {
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
            placeholder="Example: Build a task management application where teams can create projects, assign tasks, and set deadlines..."
            className="mt-8 min-h-48 w-full rounded-lg border border-gray-700 bg-gray-900 p-4 text-white outline-none focus:border-blue-500"
          />
  
          <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">
            Generate Architecture
          </button>
        </div>
      </main>
    );
  }