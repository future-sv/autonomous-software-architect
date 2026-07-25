type ArchitectureDiagramProps = {
    frontend: string;
    backend: string;
    database: string;
  };
  
  export default function ArchitectureDiagram({
    frontend,
    backend,
    database,
  }: ArchitectureDiagramProps) {
    return (
      <section className="mt-10 rounded-xl border border-gray-800 bg-gray-900 p-6">
        <h2 className="text-2xl font-bold text-white">
          Architecture Diagram
        </h2>
  
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="w-full max-w-md rounded-lg border border-blue-500 bg-gray-950 p-4 text-center">
            <h3 className="font-semibold text-blue-400">
              Frontend
            </h3>
  
            <p className="mt-2 text-sm text-gray-300">
              {frontend}
            </p>
          </div>
  
          <div className="text-2xl text-gray-500">
            ↓
          </div>
  
          <div className="w-full max-w-md rounded-lg border border-purple-500 bg-gray-950 p-4 text-center">
            <h3 className="font-semibold text-purple-400">
              Backend
            </h3>
  
            <p className="mt-2 text-sm text-gray-300">
              {backend}
            </p>
          </div>
  
          <div className="text-2xl text-gray-500">
            ↓
          </div>
  
          <div className="w-full max-w-md rounded-lg border border-green-500 bg-gray-950 p-4 text-center">
            <h3 className="font-semibold text-green-400">
              Database
            </h3>
  
            <p className="mt-2 text-sm text-gray-300">
              {database}
            </p>
          </div>
        </div>
      </section>
    );
  }