import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50 mb-4">
          Model Not Found
        </h1>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          The model you're trying to chat with doesn't exist in our repository.
        </p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-black dark:bg-white text-white dark:text-black rounded-lg font-medium hover:opacity-90 transition-opacity"
        >
          Back to Models
        </Link>
      </div>
    </div>
  );
}

