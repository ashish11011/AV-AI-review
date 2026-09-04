import type { Metadata } from "next";
import { StaticTextCaretGuard } from "@/components/layout/static-text-caret-guard";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "ReviewPilot",
  description: "Guided customer review pages for stronger online reputation."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StaticTextCaretGuard />
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
