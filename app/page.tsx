"use client";

import FrameworkEvaluationTable from "@/app/components/FrameworkEvaluationTable";
import FrameworkExplanation from "@/app/components/FrameworkExplanation";


function RatingBadge({ rating }: { rating: string }) {
  const getColor = (rating: string) => {
    if (rating === 'AAA' || rating === 'AA' || rating === 'A') {
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    }
    if (rating === 'BBB' || rating === 'BB' || rating === 'B') {
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    }
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-bold ${getColor(rating)}`}>
      {rating}
    </span>
  );
}

export default function Home() {
  const scrollToFramework = () => {
    const element = document.getElementById('framework-methodology');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      {/* Disclaimer Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border-b border-yellow-200 dark:border-yellow-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 text-center" style={{ fontFamily: 'var(--font-inter)' }}>
            <strong className="font-semibold">Disclaimer:</strong> We do not endorse any models. We evaluate them based on our{" "}
            <button
              onClick={scrollToFramework}
              className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-semibold transition-colors"
            >
              framework & scoring methodology
            </button>
            .
          </p>
        </div>
      </div>

      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-white dark:from-black dark:via-zinc-950 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-indigo-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent tracking-tighter mb-3 leading-none" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                AI Transparency Atlas
          </h1>
              <p className="text-lg md:text-xl font-semibold tracking-wide text-zinc-500 dark:text-zinc-400">
                Real time AI model information completeness
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full border border-green-200 dark:border-green-800">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-green-700 dark:text-green-400 font-semibold">
                Live
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
        {/* Framework Evaluation Table */}
        <div className="mb-12">
          <FrameworkEvaluationTable />
        </div>

        {/* Framework Explanation */}
        <FrameworkExplanation />
      </main>

      <footer className="mt-auto border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            2025 | Cntrl + Regulate
          </p>
        </div>
      </footer>
    </div>
  );
}
