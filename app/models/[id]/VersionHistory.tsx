"use client";

import Link from "next/link";
import { ModelVersionHistory } from '@/types/versionHistory';

interface VersionHistoryProps {
  history: ModelVersionHistory[];
  modelId: string;
}

export default function VersionHistory({ history, modelId }: VersionHistoryProps) {
  if (history.length === 0) {
    return (
      <div className="bg-zinc-50 dark:bg-zinc-800 rounded-lg p-8 text-center text-zinc-500 dark:text-zinc-400">
        No version history available yet.
      </div>
    );
  }

  // Sort by date (newest first)
  const sortedHistory = [...history].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  return (
    <div>
      <div className="space-y-3">
        {sortedHistory.slice(0, 5).map((entry, index) => {
          const date = new Date(entry.date);
          return (
            <Link
              key={index}
              href={`/models/${modelId}/history`}
              className="block border-l-2 border-blue-500 pl-4 py-3 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-r-lg transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-black dark:text-zinc-50">
                  {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  v{entry.version}
                </span>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-2">
                {entry.summary}
              </p>
              <div className="flex flex-wrap gap-1">
                {entry.changes.slice(0, 3).map((change, changeIndex) => (
                  <span
                    key={changeIndex}
                    className={`text-xs px-2 py-0.5 rounded ${
                      change.changeType === 'added'
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : change.changeType === 'removed'
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}
                  >
                    {change.field}
                  </span>
                ))}
                {entry.changes.length > 3 && (
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    +{entry.changes.length - 3} more
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>
      
      {history.length > 5 && (
        <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <Link
            href={`/models/${modelId}/history`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all {history.length} changes →
          </Link>
        </div>
      )}
    </div>
  );
}

