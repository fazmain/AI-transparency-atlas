"use client";

import Link from "next/link";
import { useState, useMemo } from "react";
import { models } from "@/template-data/models";
import { versionHistory } from "@/template-data/versionHistory";
import { ModelVersionHistory } from "@/types/versionHistory";
import VersionHistoryTable from "@/app/components/VersionHistoryTable";

const featuredModels = models.filter((model) => model.featured);

// Rating order for sorting (AAA is highest)
const ratingOrder: Record<string, number> = {
  'AAA': 9,
  'AA': 8,
  'A': 7,
  'BBB': 6,
  'BB': 5,
  'B': 4,
  'CCC': 3,
  'CC': 2,
  'C': 1,
};

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
  const [searchQuery, setSearchQuery] = useState("");

  // Sort models by rating (highest first) for leaderboard
  const sortedModels = useMemo(() => {
    return [...models].sort((a, b) => {
      return ratingOrder[b.rating] - ratingOrder[a.rating];
    });
  }, []);

  // Filter models based on search query
  const filteredModels = useMemo(() => {
    if (!searchQuery.trim()) return sortedModels;
    
    const query = searchQuery.toLowerCase();
    return sortedModels.filter(
      (model) =>
        model.name.toLowerCase().includes(query) ||
        model.organization.toLowerCase().includes(query) ||
        model.tags.some((tag) => tag.toLowerCase().includes(query)) ||
        model.framework.toLowerCase().includes(query)
    );
  }, [searchQuery, sortedModels]);

  // Flatten and sort all version history entries (git-like log)
  const allVersionHistory = useMemo(() => {
    const entries: Array<{
      date: Date;
      modelId: string;
      modelName: string;
      version: string;
      summary: string;
      changesCount: number;
      entry: ModelVersionHistory;
    }> = [];

    Object.entries(versionHistory).forEach(([modelId, history]) => {
      const model = models.find(m => m.id === modelId);
      history.forEach(entry => {
      entries.push({
        date: new Date(entry.date),
        modelId,
        modelName: model?.name || modelId,
        version: entry.version,
        summary: entry.summary,
        changesCount: entry.changes.length,
        entry: entry as ModelVersionHistory
      });
      });
    });

    return entries.sort((a, b) => b.date.getTime() - a.date.getTime());
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-gradient-to-br from-white via-zinc-50 to-white dark:from-black dark:via-zinc-950 dark:to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-6xl md:text-7xl font-black bg-gradient-to-r from-blue-600 via-indigo-600 via-purple-600 to-blue-600 dark:from-blue-400 dark:via-indigo-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent tracking-tighter mb-3 leading-none" style={{ fontFamily: 'var(--font-geist-sans)' }}>
                ATLAS
          </h1>
              <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 font-medium tracking-wide" style={{ fontFamily: 'var(--font-inter)' }}>
                Real time model evaluation and documentation
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Models Section */}
        <div className="mb-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
              Recently Released Models
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              {featuredModels.length} recently released models with complete model cards
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredModels.map((model) => {
              const releaseDate = new Date(model.releaseDate);
              const formattedDate = releaseDate.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              });
              const daysSinceRelease = Math.floor((Date.now() - releaseDate.getTime()) / (1000 * 60 * 60 * 24));
              const isRecent = daysSinceRelease <= 90; // Within last 90 days
              
              return (
                <Link
                  key={model.id}
                  href={`/models/${model.id}`}
                  className="block bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 hover:shadow-lg transition-shadow relative overflow-hidden"
                >
                  {/* Release Date Badge */}
                  <div className="absolute top-0 right-0">
                    <div className={`px-3 py-1 rounded-bl-lg ${
                      isRecent 
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white' 
                        : 'bg-zinc-800 dark:bg-zinc-700 text-zinc-200'
                    }`}>
                      <div className="text-xs font-bold uppercase tracking-wide">
                        {isRecent ? 'New' : 'Released'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start justify-between mb-4 pr-16">
                    <div>
                      <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-1">
                        {model.name}
                      </h3>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {model.organization} • v{model.version}
                      </p>
                    </div>
                  </div>

                  {/* Highlighted Release Date */}
                  <div className={`mb-4 p-3 rounded-lg border-2 ${
                    isRecent
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-300 dark:border-blue-700'
                      : 'bg-zinc-50 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700'
                  }`}>
                    <div className="flex items-center gap-2">
                      <svg 
                        className={`w-4 h-4 ${isRecent ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <div>
                        <div className={`text-xs font-medium uppercase tracking-wide ${
                          isRecent ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-500 dark:text-zinc-400'
                        }`}>
                          Release Date
                        </div>
                        <div className={`text-sm font-bold ${
                          isRecent ? 'text-blue-700 dark:text-blue-300' : 'text-zinc-700 dark:text-zinc-300'
                        }`}>
                          {formattedDate}
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4 line-clamp-3">
                    {model.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {model.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-200 dark:border-zinc-800">
                    <RatingBadge rating={model.rating} />
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      Weights: {model.parameters}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Disclaimer Banner */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
            <p className="text-sm md:text-base text-yellow-800 dark:text-yellow-200 text-center" style={{ fontFamily: 'var(--font-inter)' }}>
              <strong className="font-semibold">Disclaimer:</strong> We do not recommend or endorse these models. This platform is for evaluation purposes only based on our{" "}
              <a 
                href="#" 
                className="underline hover:text-yellow-900 dark:hover:text-yellow-100 font-semibold transition-colors"
              >
                model card framework
              </a>
              .
            </p>
          </div>


        {/* Model Leaderboard Section */}
        <div className="mt-12">
          
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
              Model Cards Leaderboard
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
              Rankings based on model ratings ({filteredModels.length} models)
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md">
              <input
                type="text"
                placeholder="Search models by name, organization, tags, or framework..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white text-black dark:text-white placeholder-zinc-400 dark:placeholder-zinc-500"
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Model
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Organization
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Parameters
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Framework
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      License
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
                  {filteredModels.map((model, index) => {
                    const rank = index + 1;
                    const isTopThree = rank <= 3;
                    
                    return (
                      <tr
                        key={model.id}
                        className={`hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors ${
                          isTopThree ? "bg-zinc-50/50 dark:bg-zinc-800/50" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {rank === 1 && (
                              <span className="text-2xl mr-2">🥇</span>
                            )}
                            {rank === 2 && (
                              <span className="text-2xl mr-2">🥈</span>
                            )}
                            {rank === 3 && (
                              <span className="text-2xl mr-2">🥉</span>
                            )}
                            <span className={`text-sm font-medium ${
                              isTopThree 
                                ? "text-black dark:text-zinc-50 font-bold" 
                                : "text-zinc-600 dark:text-zinc-400"
                            }`}>
                              #{rank}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-black dark:text-zinc-50">
                                {model.name}
                              </div>
                              <div className="text-sm text-zinc-500 dark:text-zinc-400">
                                v{model.version}
                              </div>
                            </div>
                            {model.featured && (
                              <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <RatingBadge rating={model.rating} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-900 dark:text-zinc-50">
                            {model.organization}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-900 dark:text-zinc-50">
                            {model.parameters}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-900 dark:text-zinc-50">
                            {model.framework}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-zinc-900 dark:text-zinc-50">
                            {model.license}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link
                            href={`/models/${model.id}`}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300"
                          >
                            View Card →
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {filteredModels.length === 0 && (
            <div className="text-center py-12 text-zinc-600 dark:text-zinc-400">
              No models found matching your search.
            </div>
          )}
        </div>

        {/* Version History Table */}
        <div className="mt-12">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
              Version History
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Recent changes to model cards with framework evaluation metrics. Click to expand and see comparison with previous version.
            </p>
          </div>
          <VersionHistoryTable history={allVersionHistory} />
        </div>

        {/* Rating Scale Reference */}
        <div className="mt-16 mb-8">
          <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-8">
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-6">
              Model Rating Scale
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400 mb-6">
              Our framework evaluates models based on performance metrics, documentation quality, transparency, safety measures, and overall reliability. Ratings follow a financial-style scale where higher ratings indicate better overall model quality and trustworthiness.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* AAA Rating */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300">AAA</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Excellent</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Outstanding performance across benchmarks, comprehensive documentation, high transparency, strong safety measures, and exceptional reliability. Industry-leading model quality.
                </p>
              </div>

              {/* AA Rating */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300">AA</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Very Good</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Strong performance metrics, good documentation quality, reasonable transparency, adequate safety measures, and high reliability. Very trustworthy models.
                </p>
              </div>

              {/* A Rating */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-green-700 dark:text-green-300">A</span>
                  <span className="text-sm text-green-600 dark:text-green-400 font-medium">Good</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Solid performance, acceptable documentation, moderate transparency, basic safety considerations, and good reliability. Suitable for most use cases.
                </p>
              </div>

              {/* BBB Rating */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">BBB</span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Moderate</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Adequate performance, limited documentation, reduced transparency, some safety concerns, and moderate reliability. Use with caution and proper evaluation.
                </p>
              </div>

              {/* BB Rating */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">BB</span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Below Average</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Below-average performance, minimal documentation, low transparency, notable safety limitations, and questionable reliability. Requires careful assessment.
                </p>
              </div>

              {/* B Rating */}
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">B</span>
                  <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">Average</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Average performance, insufficient documentation, limited transparency, significant safety concerns, and average reliability. High risk applications not recommended.
                </p>
              </div>

              {/* CCC Rating */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-red-700 dark:text-red-300">CCC</span>
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">Poor</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Poor performance, inadequate documentation, very low transparency, serious safety issues, and low reliability. Not recommended for production use.
                </p>
              </div>

              {/* CC Rating */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-red-700 dark:text-red-300">CC</span>
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">Very Poor</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Very poor performance, minimal or missing documentation, no transparency, critical safety concerns, and very low reliability. High risk of failure.
                </p>
              </div>

              {/* C Rating */}
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl font-bold text-red-700 dark:text-red-300">C</span>
                  <span className="text-sm text-red-600 dark:text-red-400 font-medium">Below Standard</span>
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300">
                  Fails to meet basic standards. Severe performance issues, no documentation, complete lack of transparency, critical safety failures, and unreliable operation. Not suitable for use.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h3 className="text-lg font-semibold text-black dark:text-zinc-50 mb-3">
                Evaluation Criteria
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-zinc-600 dark:text-zinc-400">
                <div>
                  <p className="font-medium text-black dark:text-zinc-50 mb-2">Performance Metrics</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Benchmark scores (MMLU, HumanEval, etc.)</li>
                    <li>Task-specific performance</li>
                    <li>Consistency across evaluations</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50 mb-2">Documentation Quality</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Completeness of model card</li>
                    <li>Clarity of information</li>
                    <li>Availability of resources</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50 mb-2">Transparency</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Disclosure of training data</li>
                    <li>Architecture details</li>
                    <li>Limitations and biases</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium text-black dark:text-zinc-50 mb-2">Safety & Reliability</p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <li>Safety measures and guardrails</li>
                    <li>Error handling</li>
                    <li>Production readiness</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
