import { notFound } from "next/navigation";
import Link from "next/link";
import { models } from "@/template-data/models";
import { ModelCard } from "@/template-data/models";
import DownloadButtons from "./DownloadButtons";
import VersionHistory from "./VersionHistory";
import { versionHistory } from "@/template-data/versionHistory";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getModel(id: string): Promise<ModelCard | undefined> {
  return models.find((model) => model.id === id);
}

function RatingDisplay({ rating }: { rating: string }) {
  const getColor = (rating: string) => {
    if (rating === 'AAA' || rating === 'AA' || rating === 'A') {
      return "text-green-600 dark:text-green-400";
    }
    if (rating === 'BBB' || rating === 'BB' || rating === 'B') {
      return "text-yellow-600 dark:text-yellow-400";
    }
    return "text-red-600 dark:text-red-400";
  };

  const getLabel = (rating: string) => {
    if (rating === 'AAA') return "Excellent";
    if (rating === 'AA') return "Very Good";
    if (rating === 'A') return "Good";
    if (rating === 'BBB') return "Moderate";
    if (rating === 'BB') return "Below Average";
    if (rating === 'B') return "Average";
    return "Below Standard";
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-1">
            Model Rating
          </p>
          <p className={`text-4xl font-bold ${getColor(rating)}`}>
            {rating}
          </p>
          <p className="text-sm text-zinc-500 dark:text-zinc-500 mt-1">
            {getLabel(rating)}
          </p>
        </div>
      </div>
    </div>
  );
}


export default async function ModelPage({ params }: PageProps) {
  const { id } = await params;
  const model = await getModel(id);

  if (!model) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-4 inline-block"
          >
            ← Back to Models
          </Link>
          <h1 className="text-3xl font-bold text-black dark:text-zinc-50">
            {model.name}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            {model.organization} • Version {model.version}
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Floating Ask About Button */}
        <Link
          href={`/models/${model.id}/chat`}
          className="fixed right-8 bottom-8 z-50 w-16 h-16 bg-blue-600 dark:bg-blue-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all flex items-center justify-center text-2xl"
          title={`Ask About ${model.name}`}
        >
          💬
        </Link>

        <div className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6 mb-6">
          <DownloadButtons model={model} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Description
              </h2>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {model.description}
              </p>
            </section>

            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Model Details
              </h2>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Architecture
                  </dt>
                  <dd className="mt-1 text-sm text-black dark:text-zinc-50">
                    {model.architecture}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Parameters
                  </dt>
                  <dd className="mt-1 text-sm text-black dark:text-zinc-50">
                    {model.parameters}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Framework
                  </dt>
                  <dd className="mt-1 text-sm text-black dark:text-zinc-50">
                    {model.framework}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    License
                  </dt>
                  <dd className="mt-1 text-sm text-black dark:text-zinc-50">
                    {model.license}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Release Date
                  </dt>
                  <dd className="mt-1 text-sm text-black dark:text-zinc-50">
                    {model.releaseDate}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Training Data
                  </dt>
                  <dd className="mt-1 text-sm text-black dark:text-zinc-50">
                    {model.trainingData}
                  </dd>
                </div>
              </dl>
            </section>

            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Performance Metrics
              </h2>
              <div className="space-y-3">
                {model.performance.map((metric, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-black dark:text-zinc-50">
                        {metric.metric}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {metric.dataset}
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-black dark:text-zinc-50">
                      {metric.value}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Intended Use Cases
              </h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                {model.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </section>

            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Limitations
              </h2>
              <ul className="list-disc list-inside space-y-2 text-zinc-600 dark:text-zinc-400">
                {model.limitations.map((limitation, index) => (
                  <li key={index}>{limitation}</li>
                ))}
              </ul>
            </section>

              {/* Version History */}
              <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Version History
              </h2>
              <VersionHistory 
                history={versionHistory[model.id] || []} 
                modelId={model.id}
              />
            </section>

            {model.citations && model.citations.length > 0 && (
              <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                  Citations
                </h2>
                <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                  {model.citations.map((citation, index) => (
                    <li key={index} className="text-sm">{citation}</li>
                  ))}
                </ul>
              </section>
            )}

            {model.resources && model.resources.length > 0 && (
              <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
                <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                  Information Sources
                </h2>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-4">
                  The following resources were used to gather information for this model card:
                </p>
                <div className="space-y-3">
                  {model.resources.map((resource, index) => (
                    <a
                      key={index}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 p-3 bg-zinc-50 dark:bg-zinc-800 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors group"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <p className="font-medium text-black dark:text-zinc-50 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {resource.title}
                          </p>
                          <span className="px-2 py-0.5 bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-zinc-400 rounded text-xs">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 truncate">
                          {resource.url}
                        </p>
                      </div>
                      <svg
                        className="w-5 h-5 text-zinc-400 dark:text-zinc-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex-shrink-0"
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
                    </a>
                  ))}
                </div>
              </section>
            )}

          
          </div>

          <div className="space-y-6">
            <RatingDisplay rating={model.rating} />

            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {model.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </section>

            <section className="bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 p-6">
              <h2 className="text-xl font-semibold text-black dark:text-zinc-50 mb-4">
                Download Links
              </h2>
              <div className="space-y-3">
                <a
                  href={model.downloadLinks.model}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Model Download →
                </a>
                <a
                  href={model.downloadLinks.documentation}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Documentation →
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

