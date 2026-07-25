type ArchitectureResultsProps = {
    result: string;
  };
  
  export default function ArchitectureResults({
    result,
  }: ArchitectureResultsProps) {
    if (!result) {
      return null;
    }
  
    return (
      <div className="mt-10 w-full max-w-4xl">
        <div className="rounded-xl border border-gray-800 bg-gray-900 p-6">
          <h2 className="mb-6 text-2xl font-bold text-white">
            Architecture Results
          </h2>
  
          <div className="whitespace-pre-wrap leading-7 text-gray-300">
            {result}
          </div>
        </div>
      </div>
    );
  }