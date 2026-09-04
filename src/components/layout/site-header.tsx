import Link from "next/link";
import { LayoutDashboard, MessageSquareQuote } from "lucide-react";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--home-border)] bg-[rgb(248_245_239/0.78)] backdrop-blur-2xl">
      <div className="page-shell flex h-16 items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 text-[15px] font-bold text-[var(--home-text)] transition hover:text-[#3b342d]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--home-dark)] text-white shadow-[0_10px_24px_rgba(23,19,15,0.14)]">
            <MessageSquareQuote className="h-4 w-4" />
          </span>
          ReviewPilot
        </Link>
        <Link
          href="/admin"
          className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--home-border)] bg-[var(--home-surface)] px-4 text-sm font-bold text-[var(--home-text)] shadow-[0_10px_28px_rgba(45,35,22,0.07)] transition hover:-translate-y-0.5 hover:bg-white"
        >
          <LayoutDashboard className="h-4 w-4" />
          Admin
        </Link>
      </div>
    </header>
  );
}
