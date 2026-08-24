import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ReviewForm } from "@/components/review-form";
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
    <main className="page-shell py-10">
      <Button asChild variant="ghost" className="mb-6 px-0">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
      </Button>
      <div className="mb-8 max-w-3xl">
        {saved === "1" ? (
          <div className="mb-5 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
            Your review was saved.
          </div>
        ) : null}
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Review page</p>
        <h1 className="text-4xl font-semibold tracking-normal">{company.name}</h1>
        {company.description ? (
          <p className="mt-4 text-lg leading-8 text-muted-foreground">{company.description}</p>
        ) : null}
      </div>
      <ReviewForm company={company} />
    </main>
  );
}
