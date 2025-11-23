"use client";

import { useState, useMemo, Fragment } from "react";
import { proposedFramework } from "@/data/framework";
import modelData from "@/scraper/results/48-models-scraped_1763880057703.json";

interface SubsectionCheck {
  name: string;
  score: number;
  explanation: string;
}

interface SectionSnippet {
  snippetId: string;
  url: string;
  snippet: string;
}

interface ModelSection {
  sectionId: string;
  sectionSnippets: SectionSnippet[];
  subsectionChecks: SubsectionCheck[];
}

interface ModelData {
  model: string;
  provider: string;
  type: string;
  sections: ModelSection[];
}

interface ModalData {
  model: ModelData;
  subsection: { id: string; name: string; score: number };
  section: { id: string; name: string };
  explanation: string;
  subsectionScore: number | null;
  maxScore: number;
  snippets: SectionSnippet[];
}

export default function FrameworkEvaluationTable() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [modalData, setModalData] = useState<ModalData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Get all models - ensure stable reference
  const allModels = useMemo(() => (modelData as ModelData[]).slice(), []);
  
  // Memoize framework sections to ensure stable order
  const frameworkSections = useMemo(() => proposedFramework.sections.slice(), []);
  
  // Calculate pagination
  const totalPages = useMemo(() => Math.ceil(allModels.length / itemsPerPage), [allModels.length, itemsPerPage]);
  const startIndex = useMemo(() => (currentPage - 1) * itemsPerPage, [currentPage, itemsPerPage]);
  const endIndex = useMemo(() => startIndex + itemsPerPage, [startIndex, itemsPerPage]);
  const models = useMemo(() => allModels.slice(startIndex, endIndex), [allModels, startIndex, endIndex]);

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const openModal = (model: ModelData, subsection: { id: string; name: string; score: number }, section: { id: string; name: string }) => {
    const explanation = getSubsectionExplanation(model, subsection.name);
    const subsectionScore = getSubsectionScore(model, subsection.name);
    const maxScore = subsection.score;
    // Find the section by matching sectionId to get snippets
    const sectionData = model.sections.find((s) => s.sectionId === section.id);
    const snippets = sectionData?.sectionSnippets || [];
    
    if (explanation) {
      setModalData({
        model,
        subsection,
        section,
        explanation,
        subsectionScore,
        maxScore,
        snippets,
      });
    }
  };

  const closeModal = () => {
    setModalData(null);
  };

  // Helper function to get score for a subsection from a model
  // Returns 1 if present (full score), 0 if absent (no score), null if not found
  const getSubsectionScore = (model: ModelData, subsectionName: string): number | null => {
    for (const section of model.sections) {
      const check = section.subsectionChecks.find(
        (check) => check.name.toLowerCase() === subsectionName.toLowerCase()
      );
      if (check) {
        // Boolean logic: 1 means present (full score), 0 means absent (no score)
        return check.score > 0 ? 1 : 0;
      }
    }
    return null;
  };

  // Helper function to get explanation for a subsection from a model
  const getSubsectionExplanation = (model: ModelData, subsectionName: string): string | null => {
    for (const section of model.sections) {
      const check = section.subsectionChecks.find(
        (check) => check.name.toLowerCase() === subsectionName.toLowerCase()
      );
      if (check) {
        return check.explanation;
      }
    }
    return null;
  };

  // Helper function to get section snippets for a given section ID
  const getSectionSnippets = (model: ModelData, sectionId: string): SectionSnippet[] => {
    const section = model.sections.find((s) => s.sectionId === sectionId);
    return section?.sectionSnippets || [];
  };

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="p-6 border-b border-zinc-200 dark:border-zinc-700">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h2 className="text-2xl font-semibold text-black dark:text-zinc-50 mb-2">
              Framework Evaluation ({allModels.length} Models)
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">
              Expand sections to see detailed subsection scores for each model
            </p>
          </div>
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Showing {startIndex + 1}-{Math.min(endIndex, allModels.length)} of {allModels.length}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider w-64">
                Section / Subsection
              </th>
              {models.map((model) => (
                <th
                  key={model.model}
                  className="px-4 py-3 text-center text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider min-w-[120px]"
                >
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-semibold">{model.model}</span>
                    <span className="text-xs text-zinc-400 dark:text-zinc-500">
                      {model.provider}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {frameworkSections.map((section) => {
              const isExpanded = expandedSections.has(section.id);
              const sectionTotalScore = section.subsections.reduce((sum, sub) => sum + sub.score, 0);

              return (
                <Fragment key={section.id}>
                  {/* Section Row */}
                  <tr 
                    onClick={() => toggleSection(section.id)}
                    className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-left font-semibold text-black dark:text-zinc-50">
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-90" : ""}`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        <span>{section.name}</span>
                        <span className="ml-2 px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-semibold">
                          {section.weight}% Weight
                        </span>
                      </div>
                    </td>
                    {models.map((model) => {
                      // Calculate section score for this model
                      // Boolean logic: if score is 1, add full subsection.score, if 0, add nothing
                      let sectionScore = 0;
                      section.subsections.forEach((subsection) => {
                        const score = getSubsectionScore(model, subsection.name);
                        if (score !== null && score === 1) {
                          sectionScore += subsection.score;
                        }
                      });
                      const sectionPercentage = sectionTotalScore > 0 
                        ? ((sectionScore / sectionTotalScore) * 100).toFixed(1)
                        : "0.0";

                      return (
                        <td key={model.model} className="px-4 py-4 text-center">
                          <div className="flex flex-col items-center gap-1">
                            <span className="text-sm font-semibold text-black dark:text-zinc-50">
                              {sectionPercentage}%
                            </span>
                            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  parseFloat(sectionPercentage) >= 80
                                    ? "bg-green-500"
                                    : parseFloat(sectionPercentage) >= 50
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                                style={{ width: `${Math.min(parseFloat(sectionPercentage), 100)}%` }}
                              />
                            </div>
                          </div>
                        </td>
                      );
                    })}
                  </tr>

                  {/* Subsection Rows (when expanded) */}
                  {isExpanded &&
                    section.subsections.map((subsection) => (
                      <tr
                        key={`${section.id}-${subsection.id}`}
                        className="bg-zinc-50/50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      >
                        <td className="px-6 py-3 pl-12">
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-zinc-700 dark:text-zinc-300">
                              {subsection.name}
                            </span>
                            <span className="text-xs text-zinc-500 dark:text-zinc-400">
                              (Max: {subsection.score})
                            </span>
                          </div>
                        </td>
                        {models.map((model) => {
                          const score = getSubsectionScore(model, subsection.name);
                          const explanation = getSubsectionExplanation(model, subsection.name);
                          const maxScore = subsection.score;
                          // Boolean logic: score is 1 (full) or 0 (none)
                          const percentage = score !== null && score === 1
                            ? "100.0"
                            : score !== null && score === 0
                            ? "0.0"
                            : null;

                          return (
                            <td key={model.model} className="px-4 py-3 text-center">
                              {score !== null ? (
                                <div className="flex flex-col items-center gap-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-black dark:text-zinc-50">
                                      {score === 1 ? maxScore : 0}/{maxScore}
                                    </span>
                                    {percentage && (
                                      <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                        ({percentage}%)
                                      </span>
                                    )}
                                  </div>
                                  {explanation && (
                                    <button
                                      onClick={() => openModal(model, subsection, { id: section.id, name: section.name })}
                                      className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline mt-1 font-medium"
                                    >
                                      View details
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <span className="text-xs text-zinc-400 dark:text-zinc-500">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-between">
          <div className="text-sm text-zinc-600 dark:text-zinc-400">
            Page {currentPage} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum: number;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      currentPage === pageNum
                        ? "bg-blue-600 text-white dark:bg-blue-500"
                        : "text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-lg hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-white dark:bg-zinc-900 rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col border border-zinc-200 dark:border-zinc-700"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-black dark:text-zinc-50 mb-1">
                    {modalData.model.model}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    {modalData.section.name} • {modalData.subsection.name}
                  </p>
                </div>
                <button
                  onClick={closeModal}
                  className="ml-4 p-2 text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {/* Score */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 uppercase tracking-wide">
                  Subsection Score
                </h4>
                <div className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">
                      Score Achieved
                    </span>
                    <span className="text-2xl font-bold text-black dark:text-zinc-50">
                      {modalData.subsectionScore !== null && modalData.subsectionScore === 1 
                        ? modalData.maxScore 
                        : 0}/{modalData.maxScore}
                    </span>
                  </div>
                  <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-3 mb-2">
                    <div
                      className={`h-3 rounded-full ${
                        modalData.subsectionScore !== null && modalData.subsectionScore === 1
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                      style={{
                        width: modalData.subsectionScore !== null && modalData.subsectionScore === 1
                          ? "100%"
                          : "0%"
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                    <span>Maximum Possible: {modalData.maxScore} points</span>
                    {modalData.subsectionScore !== null && (
                      <span>
                        {modalData.subsectionScore === 1 ? "100.0%" : "0.0%"}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Explanation */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2 uppercase tracking-wide">
                  Explanation
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {modalData.explanation}
                </p>
              </div>

              {/* Sources/Resources */}
              {modalData.snippets.length > 0 && (
                <div className="mt-6">
                  <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-3 uppercase tracking-wide">
                    Sources & Resources ({modalData.snippets.length})
                  </h4>
                  <div className="space-y-2">
                    {modalData.snippets.map((snippet) => (
                      <a
                        key={snippet.snippetId}
                        href={snippet.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
                      >
                        <div className="flex items-start gap-3">
                          <svg
                            className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 mb-1 truncate">
                              {(() => {
                                try {
                                  return new URL(snippet.url).hostname.replace('www.', '');
                                } catch {
                                  return snippet.url.length > 40 ? snippet.url.substring(0, 40) + '...' : snippet.url;
                                }
                              })()}
                            </div>
                            <div className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                              {snippet.url}
                            </div>
                          </div>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/50">
              <button
                onClick={closeModal}
                className="w-full px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
        
      