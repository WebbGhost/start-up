"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <h2>Something went wrong!</h2>
        {error?.message}
        <button onClick={() => reset()} type="button">
          Try again
        </button>
      </body>
    </html>
  );
}
