"use client";

import { useMemo } from "react";
import { proposedFramework } from "@/data/framework";

export default function FrameworkExplanation() {
  // Memoize sections to ensure consistent ordering and prevent hydration errors
  const frameworkSections = useMemo(() => proposedFramework.sections.slice(), []);

  return (
    <div id="framework-methodology" className="mt-12 mb-12 scroll-mt-8">
      <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
        <div className="px-8 py-6 border-b border-zinc-200 dark:border-zinc-700 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
          <h2 className="text-3xl font-bold text-black dark:text-zinc-50 mb-2">
            Framework & Scoring Methodology
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400">
            Understanding how we evaluate model cards and calculate scores
          </p>
        </div>

        <div className="p-8 space-y-8">
          {/* Framework Overview */}
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              Framework Structure
            </h3>
            <p className="text-zinc-700 dark:text-zinc-300 mb-4">
              Our evaluation framework consists of <strong>{proposedFramework.sections.length} main sections</strong>, each with a specific weight percentage that reflects its importance in model card quality assessment.
            </p>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {frameworkSections.map((section) => {
                  const totalSubsectionScore = section.subsections.reduce((sum, sub) => sum + sub.score, 0);
                  return (
                    <div key={section.id} className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                      <span className="text-zinc-700 dark:text-zinc-300 font-medium">{section.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded text-xs font-semibold">
                          {section.weight}% Weight
                        </span>
                        <span className="text-xs text-zinc-500 dark:text-zinc-400">
                          {section.subsections.length} subsections
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Scoring Methodology */}
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              How Scoring Works
            </h3>
            <div className="space-y-4">
              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-lg font-semibold text-black dark:text-zinc-50 mb-3">
                  1. Subsection Scoring (Boolean Logic)
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 mb-3">
                  Each subsection has a <strong>maximum score</strong> (e.g., "Model Architecture" = 4 points). 
                  Scoring uses <strong>boolean logic</strong>: we evaluate whether the subsection information is present in the model card:
                </p>
                <ul className="list-disc list-inside space-y-2 text-zinc-700 dark:text-zinc-300 ml-2 mb-4">
                  <li>If information is <strong>present</strong>: Boolean score = <strong>1</strong> → Model gets the <strong>full maximum score</strong> (e.g., 4/4)</li>
                  <li>If information is <strong>absent</strong>: Boolean score = <strong>0</strong> → Model gets <strong>0 points</strong> (e.g., 0/4)</li>
                </ul>
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Example:</strong> If "Model Architecture" (max: 4) is documented, boolean score = 1, so the model gets <strong>4 points (4/4)</strong>. 
                    If not documented, boolean score = 0, so the model gets <strong>0 points (0/4)</strong>. 
                    There are no partial scores—it's all or nothing.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-lg font-semibold text-black dark:text-zinc-50 mb-3">
                  2. Section Percentage Calculation
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 mb-3">
                  For each section, we calculate the percentage based on how many subsection points the model earned using boolean logic:
                </p>
                <div className="bg-white dark:bg-zinc-900 rounded-lg p-4 mb-4 font-mono text-sm border border-zinc-200 dark:border-zinc-700">
                  <div className="text-zinc-700 dark:text-zinc-300 mb-2">
                    For each subsection: If boolean score = 1, add subsection max score; if 0, add 0
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300 mb-2">
                    Section Score = Σ (Subsection Max Score) for all subsections with boolean score = 1
                  </div>
                  <div className="text-zinc-700 dark:text-zinc-300">
                    Section % = (Section Score ÷ Total Possible Section Score) × 100
                  </div>
                </div>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                  <p className="text-sm text-green-800 dark:text-green-200">
                    <strong>Example:</strong> "Model Details" section has subsections totaling 15 points max. 
                    If a model has boolean score = 1 for subsections worth 3, 4, 2, and 3 points (total 12), 
                    the section percentage is <strong>(12 ÷ 15) × 100 = 80%</strong>.
                  </p>
                </div>
              </div>

              <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
                <h4 className="text-lg font-semibold text-black dark:text-zinc-50 mb-3">
                  3. Section Weights
                </h4>
                <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                  Each section has a <strong>weight percentage</strong> that indicates its relative importance in the overall framework. 
                  The weights sum to 100% and reflect the framework's priorities:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {frameworkSections
                    .slice()
                    .sort((a, b) => b.weight - a.weight)
                    .slice(0, 3)
                    .map((section) => (
                      <div key={section.id} className="p-4 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-700">
                        <div className="text-sm font-semibold text-black dark:text-zinc-50 mb-2">{section.name}</div>
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">{section.weight}%</div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Visual Example */}
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              Complete Example Calculation
            </h3>
            <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-6 border border-zinc-200 dark:border-zinc-700">
              <p className="text-zinc-700 dark:text-zinc-300 mb-4">
                Let's calculate the "Model Details" section (15% weight) for a hypothetical model:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-700 dark:text-zinc-300">Model Overview (max: 3)</span>
                  <span className="font-semibold text-black dark:text-zinc-50">3/3 ✓</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-700 dark:text-zinc-300">Model Architecture (max: 4)</span>
                  <span className="font-semibold text-black dark:text-zinc-50">4/4 ✓</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-700 dark:text-zinc-300">Model Version (max: 2)</span>
                  <span className="font-semibold text-black dark:text-zinc-50">0/2 ✗</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-white dark:bg-zinc-900 rounded border border-zinc-200 dark:border-zinc-700">
                  <span className="text-zinc-700 dark:text-zinc-300">... (other subsections)</span>
                  <span className="text-zinc-500 dark:text-zinc-400">...</span>
                </div>
                <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
                  <div className="mb-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <p className="text-xs text-blue-800 dark:text-blue-200 mb-2">
                      <strong>Note:</strong> Each subsection uses boolean scoring (1 = full points, 0 = no points)
                    </p>
                    <div className="text-xs text-blue-700 dark:text-blue-300 space-y-1">
                      <div>Model Overview: boolean = 1 → 3 points</div>
                      <div>Model Architecture: boolean = 1 → 4 points</div>
                      <div>Model Version: boolean = 0 → 0 points</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-black dark:text-zinc-50">Total Score:</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">12 / 15 points</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-black dark:text-zinc-50">Section Percentage:</span>
                    <span className="font-semibold text-green-600 dark:text-green-400">80%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Color Coding */}
          <div>
            <h3 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
              Color Coding
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-green-500 rounded"></div>
                  <span className="font-semibold text-green-700 dark:text-green-300">80-100%</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">Excellent coverage</p>
              </div>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-yellow-500 rounded"></div>
                  <span className="font-semibold text-yellow-700 dark:text-yellow-300">50-79%</span>
                </div>
                <p className="text-sm text-yellow-700 dark:text-yellow-300">Moderate coverage</p>
              </div>
              <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-5 h-5 bg-red-500 rounded"></div>
                  <span className="font-semibold text-red-700 dark:text-red-300">0-49%</span>
                </div>
                <p className="text-sm text-red-700 dark:text-red-300">Limited coverage</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

