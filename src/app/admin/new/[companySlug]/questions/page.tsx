import { notFound } from "next/navigation";
import { QuestionsSetupFlow } from "@/components/admin/create-company/QuestionsSetupFlow";
import { getCompanyDetailsBySlug } from "@/lib/data";

export const dynamic = "force-dynamic";

type NewCompanyQuestionsPageProps = {
  params: Promise<{
    companySlug: string;
  }>;
};

export default async function NewCompanyQuestionsPage({
  params,
}: NewCompanyQuestionsPageProps) {
  const { companySlug } = await params;
  const company = await getCompanyDetailsBySlug(companySlug);

  if (!company) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <QuestionsSetupFlow company={company} />
    </main>
  );
}
