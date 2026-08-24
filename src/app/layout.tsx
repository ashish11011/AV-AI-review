import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewPilot",
  description: "AI-assisted review generation for multi-company rating pages."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="border-b bg-background/90">
          <div className="page-shell flex min-h-16 items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <ShieldCheck className="h-5 w-5" />
              </span>
              ReviewPilot
            </Link>
            <nav className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/admin" className="hover:text-foreground">
                Project admin
              </Link>
              <Link href="/acme-dental-studio" className="hover:text-foreground">
                Demo page
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
