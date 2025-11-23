import { notFound } from "next/navigation";
import Link from "next/link";
import { models } from "@/template-data/models";
import ChatInterface from "./ChatInterface";

interface PageProps {
  params: Promise<{ id: string }>;
}

async function getModel(id: string) {
  return models.find((model) => model.id === id);
}

export default async function ChatPage({ params }: PageProps) {
  const { id } = await params;
  const model = await getModel(id);

  if (!model) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex flex-col">
      <header className="border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/models/${model.id}`}
                className="text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white mb-2 inline-block text-sm"
              >
                ← Back to Model Card
              </Link>
              <h1 className="text-2xl font-bold text-black dark:text-zinc-50">
                Ask About {model.name}
              </h1>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                Get information about this model card • {model.organization} • Version {model.version}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full text-xs font-medium">
                {model.framework}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        <ChatInterface model={model} />
      </main>
    </div>
  );
}

