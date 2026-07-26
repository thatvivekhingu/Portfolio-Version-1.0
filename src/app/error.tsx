"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-4xl font-bold">Something went wrong</h1>
      <button
        onClick={reset}
        className="text-primary hover:underline"
      >
        Try again
      </button>
    </div>
  );
}
