import { CreateCompanyFlow } from "@/components/admin/create-company/CreateCompanyFlow";

export const dynamic = "force-dynamic";

export default function NewCompanyPage() {
  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <CreateCompanyFlow />
    </main>
  );
}
