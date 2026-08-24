import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompanyAdmin } from "@/components/company-admin";
import { ReviewsTable } from "@/components/reviews-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { databaseStatusLabel, getCompanyDetailsBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

type CompanyAdminPageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

export default async function CompanyAdminPage({ params }: CompanyAdminPageProps) {
  const { companySlug } = await params;
  const company = await getCompanyDetailsBySlug(companySlug);

  if (!company) {
    notFound();
  }

  return (
    <main className="page-shell py-10">
      <Button asChild variant="ghost" className="mb-6 px-0">
        <Link href="/admin">
          <ArrowLeft className="h-4 w-4" />
          Project admin
        </Link>
      </Button>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">Company admin</p>
          <h1 className="text-4xl font-semibold tracking-normal">{company.name}</h1>
          <p className="mt-3 text-sm text-muted-foreground">{databaseStatusLabel()}</p>
        </div>
        <Button asChild variant="outline">
          <Link href={`/${company.slug}`}>Open public page</Link>
        </Button>
      </div>
      <Tabs defaultValue="questions">
        <TabsList>
          <TabsTrigger value="questions">Questions</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <CompanyAdmin company={company} />
        </TabsContent>
        <TabsContent value="reviews">
          <ReviewsTable reviews={company.reviews} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
