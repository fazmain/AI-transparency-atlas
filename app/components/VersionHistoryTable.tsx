"use client";

import { useState } from "react";
import Link from "next/link";
import { ModelVersionHistory } from "@/template-data/versionHistory";

interface VersionHistoryTableProps {
  history: Array<{
    date: Date;
    modelId: string;
    modelName: string;
    version: string;
    summary: string;
    changesCount: number;
    entry: ModelVersionHistory;
  }>;
}

function MetricChange({ current, previous }: { current: number; previous?: number }) {
  if (!previous) {
    return <span className="text-zinc-600 dark:text-zinc-400">{current}%</span>;
  }

  const diff = current - previous;
  const isPositive = diff > 0;
  const isNegative = diff < 0;

  return (
    <div className="flex items-center gap-2">
      <span className="text-zinc-900 dark:text-zinc-50 font-medium">{current}%</span>
      {diff !== 0 && (
        <span className={`text-xs flex items-center gap-1 ${
          isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isPositive ? '↑' : '↓'} {Math.abs(diff)}%
        </span>
      )}
    </div>
  );
}

function ExpandableRow({ 
  entry, 
  modelName, 
  modelId, 
  previousEntry 
}: { 
  entry: ModelVersionHistory; 
  modelName: string; 
  modelId: string;
  previousEntry?: ModelVersionHistory;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const date = new Date(entry.date);
  const currentMetrics = entry.frameworkMetrics;
  const previousMetrics = previousEntry?.frameworkMetrics;

  return (
    <>
      <tr
        className="hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors font-mono text-sm cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <td className="px-6 py-4 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <button className="text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-400">
              {isExpanded ? '▼' : '▶'}
            </button>
            <span className="text-zinc-400 dark:text-zinc-500">•</span>
            <span className="text-zinc-600 dark:text-zinc-400">
              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </span>
            <span className="text-zinc-400 dark:text-zinc-500">
              {date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <Link
            href={`/models/${modelId}`}
            className="text-blue-600 dark:text-blue-400 hover:underline font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            {modelName}
          </Link>
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          <span className="text-zinc-900 dark:text-zinc-50">v{entry.version}</span>
        </td>
        {/* Framework Metrics Columns */}
        <td className="px-6 py-4 whitespace-nowrap">
          {currentMetrics ? (
            <MetricChange current={currentMetrics.documentationQuality} previous={previousMetrics?.documentationQuality} />
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {currentMetrics ? (
            <MetricChange current={currentMetrics.transparency} previous={previousMetrics?.transparency} />
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {currentMetrics ? (
            <MetricChange current={currentMetrics.safetyMeasures} previous={previousMetrics?.safetyMeasures} />
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {currentMetrics ? (
            <MetricChange current={currentMetrics.performanceScore} previous={previousMetrics?.performanceScore} />
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap">
          {currentMetrics ? (
            <MetricChange current={currentMetrics.overallScore} previous={previousMetrics?.overallScore} />
          ) : (
            <span className="text-zinc-400 dark:text-zinc-500">—</span>
          )}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-right">
          <Link
            href={`/models/${modelId}`}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            View →
          </Link>
        </td>
      </tr>
      {isExpanded && (
        <tr>
          <td colSpan={9} className="px-6 py-4 bg-zinc-50 dark:bg-zinc-800/50">
            <div className="space-y-4">
              {/* Comparison with Previous Version */}
              {previousEntry && (
                <div className="border-l-2 border-blue-500 pl-4">
                  <h4 className="text-sm font-semibold text-black dark:text-zinc-50 mb-2">
                    Comparison with Previous Version (v{previousEntry.version})
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-1">Documentation</p>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 dark:text-zinc-500">{previousMetrics?.documentationQuality || '—'}%</span>
                        <span className="text-zinc-400 dark:text-zinc-500">→</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{currentMetrics?.documentationQuality || '—'}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-1">Transparency</p>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 dark:text-zinc-500">{previousMetrics?.transparency || '—'}%</span>
                        <span className="text-zinc-400 dark:text-zinc-500">→</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{currentMetrics?.transparency || '—'}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-1">Safety</p>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 dark:text-zinc-500">{previousMetrics?.safetyMeasures || '—'}%</span>
                        <span className="text-zinc-400 dark:text-zinc-500">→</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{currentMetrics?.safetyMeasures || '—'}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-1">Performance</p>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 dark:text-zinc-500">{previousMetrics?.performanceScore || '—'}%</span>
                        <span className="text-zinc-400 dark:text-zinc-500">→</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{currentMetrics?.performanceScore || '—'}%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-zinc-500 dark:text-zinc-400 mb-1">Overall</p>
                      <div className="flex items-center gap-2">
                        <span className="text-zinc-400 dark:text-zinc-500">{previousMetrics?.overallScore || '—'}%</span>
                        <span className="text-zinc-400 dark:text-zinc-500">→</span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium">{currentMetrics?.overallScore || '—'}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Changelog */}
              <div>
                <h4 className="text-sm font-semibold text-black dark:text-zinc-50 mb-2">Changelog</h4>
                <div className="space-y-2">
                  {entry.changes.map((change, index) => (
                    <div key={index} className="text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`px-2 py-0.5 rounded text-xs ${
                          change.changeType === 'added'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : change.changeType === 'removed'
                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                            : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        }`}>
                          {change.changeType}
                        </span>
                        <span className="text-zinc-900 dark:text-zinc-50 font-medium capitalize">
                          {change.field.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                      </div>
                      {change.changeType === 'modified' && (
                        <div className="ml-4 space-y-1 text-xs">
                          <div className="flex items-start gap-2">
                            <span className="text-red-600 dark:text-red-400 font-mono">-</span>
                            <span className="text-zinc-600 dark:text-zinc-400 line-through">
                              {Array.isArray(change.oldValue) ? change.oldValue.join(', ') : change.oldValue}
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 dark:text-green-400 font-mono">+</span>
                            <span className="text-zinc-900 dark:text-zinc-50">
                              {Array.isArray(change.newValue) ? change.newValue.join(', ') : change.newValue}
                            </span>
                          </div>
                        </div>
                      )}
                      {change.changeType === 'added' && (
                        <div className="ml-4 flex items-start gap-2 text-xs">
                          <span className="text-green-600 dark:text-green-400 font-mono">+</span>
                          <span className="text-zinc-900 dark:text-zinc-50">
                            {Array.isArray(change.newValue) ? change.newValue.join(', ') : change.newValue}
                          </span>
                        </div>
                      )}
                      {change.changeType === 'removed' && (
                        <div className="ml-4 flex items-start gap-2 text-xs">
                          <span className="text-red-600 dark:text-red-400 font-mono">-</span>
                          <span className="text-zinc-600 dark:text-zinc-400 line-through">
                            {Array.isArray(change.oldValue) ? change.oldValue.join(', ') : change.oldValue}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default function VersionHistoryTable({ history }: VersionHistoryTableProps) {
  // Group by modelId to find previous versions
  const historyByModel: Record<string, ModelVersionHistory[]> = {};
  history.forEach(item => {
    if (!historyByModel[item.modelId]) {
      historyByModel[item.modelId] = [];
    }
    historyByModel[item.modelId].push(item.entry);
  });

  // Sort each model's history by date
  Object.keys(historyByModel).forEach(modelId => {
    historyByModel[modelId].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  });

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-50 dark:bg-zinc-800 border-b border-zinc-200 dark:border-zinc-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Model
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Version
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Documentation
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Transparency
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Safety
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Overall
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                Link
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700">
            {history.slice(0, 20).map((item, index) => {
              // Find previous version for this model
              const modelHistory = historyByModel[item.modelId];
              const currentIndex = modelHistory.findIndex(e => 
                e.date === item.entry.date && e.version === item.entry.version
              );
              const previousEntry = currentIndex > 0 ? modelHistory[currentIndex - 1] : undefined;

              return (
                <ExpandableRow
                  key={`${item.modelId}-${item.entry.date}-${index}`}
                  entry={item.entry}
                  modelName={item.modelName}
                  modelId={item.modelId}
                  previousEntry={previousEntry}
                />
              );
            })}
          </tbody>
        </table>
      </div>
      
      {history.length > 20 && (
        <div className="px-6 py-4 border-t border-zinc-200 dark:border-zinc-700 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Showing 20 of {history.length} recent changes
        </div>
      )}
    </div>
  );
}

