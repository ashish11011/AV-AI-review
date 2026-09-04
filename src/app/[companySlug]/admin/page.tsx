import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyAdmin } from "@/components/admin/company-admin";
import { ReviewsTable } from "@/components/admin/reviews-table";
import { getCompanyDetailsBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

type CompanyAdminPageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

export default async function CompanyAdminPage({
  params,
}: CompanyAdminPageProps) {
  const { companySlug } = await params;
  const company = await getCompanyDetailsBySlug(companySlug);

  if (!company) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-5 border-b border-[#171714]/12 pb-8">
          <div>
            <Button asChild variant="ghost" className="-ml-3 mb-5 rounded-full text-[#73695e]">
              <Link href="/admin">
                <ArrowLeft className="h-4 w-4" />
                Companies
              </Link>
            </Button>
            <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--home-contrast)]">
              Company admin
            </p>
            <h1 className="display-type mt-3 text-[clamp(46px,5vw,72px)] font-normal leading-[0.92] tracking-[-0.045em]">
              {company.name}
            </h1>
            <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#73695e]">
              Update the public review page, rating questions, and saved review drafts.
            </p>
          </div>
          <Button asChild variant="outline" className="border-[#171714]/12 bg-transparent">
            <Link href={`/${company.slug}`}>
              <ExternalLink className="h-4 w-4" />
              Page
            </Link>
          </Button>
        </div>

        <CompanyAdmin company={company} />
        <div className="mt-8 border-t border-[#171714]/12 pt-8">
          <ReviewsTable reviews={company.reviews} />
        </div>
      </div>
    </main>
  );
}
