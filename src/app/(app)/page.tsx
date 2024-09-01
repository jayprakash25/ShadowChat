import Link from "next/link";

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center px-4 md:px-6 py-12 md:py-24 lg:py-32">
        <div className="max-w-2xl space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter md:text-4xl lg:text-5xl">Welcome to Anonymous Chat</h1>
          <p className="text-muted-foreground md:text-xl">Connect with others anonymously and securely.</p>
          <Link
            href="/sign-up"
            className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            prefetch={false}
          >
            Start Chatting
          </Link>
        </div>
      </main>
  );
}
