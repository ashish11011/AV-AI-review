import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { ReviewForm } from "@/components/review/review-form";
import { getCompanyBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

type CompanyPageProps = {
  params: Promise<{
    companySlug: string;
  }>;
  searchParams: Promise<{
    saved?: string;
  }>;
};

export default async function CompanyPage({ params, searchParams }: CompanyPageProps) {
  const { companySlug } = await params;
  const { saved } = await searchParams;
  const company = await getCompanyBySlug(companySlug);

  if (!company || !company.isActive) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        <Link
          href="/admin"
          className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#73695e] transition hover:text-[var(--home-text)]"
        >
          <ArrowLeft className="h-4 w-4" />
          Companies
        </Link>

        <header className="mb-10 max-w-3xl border-b border-[#171714]/12 pb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--home-contrast)]">
            Customer review experience
          </p>
          <h1 className="display-type mt-4 text-[clamp(44px,5.5vw,74px)] font-normal leading-[0.92] text-[#171714]">
            {company.name}
          </h1>
          {company.description ? (
            <p className="mt-4 max-w-2xl text-[16px] leading-7 text-[#746b60]">
              {company.description}
            </p>
          ) : null}
        </header>

        {saved === "1" ? (
          <div className="mb-6 flex items-start gap-3 border border-[#1f6c63]/18 bg-[#eef6f3] p-4 text-sm font-semibold text-[#1f6c63]">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            Your review was saved.
          </div>
        ) : null}

        <ReviewForm company={company} />
      </div>
    </main>
  );
}
