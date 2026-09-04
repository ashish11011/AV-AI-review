import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 pt-28 sm:px-6 lg:px-8">
      <section className="mx-auto flex min-h-[62vh] max-w-[880px] flex-col items-start justify-center border-y border-[#171714]/12 py-16">
        <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--home-contrast)]">
          404
        </p>
        <h1 className="display-type mt-4 text-[clamp(48px,6vw,82px)] font-normal leading-[0.92]">
          Page not found
        </h1>
        <p className="mt-5 max-w-lg text-[16px] leading-7 text-[#73695e]">
        The company page does not exist or has been disabled.
        </p>
        <Button asChild className="mt-7 bg-[#171714] text-white hover:bg-[#302c27]">
          <Link href="/">Go home</Link>
        </Button>
      </section>
    </main>
  );
}
