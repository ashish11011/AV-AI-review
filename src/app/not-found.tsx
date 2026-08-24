import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="page-shell flex min-h-[70vh] flex-col items-start justify-center">
      <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">404</p>
      <h1 className="text-4xl font-semibold tracking-normal">Page not found</h1>
      <p className="mt-4 max-w-lg leading-7 text-muted-foreground">
        The company page does not exist or has been disabled.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go home</Link>
      </Button>
    </main>
  );
}
