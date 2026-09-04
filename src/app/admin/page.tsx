import { ProjectAdmin } from "@/components/admin/project-admin";
import { listCompanies } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const companies = await listCompanies();

  return (
    <main className="min-h-screen bg-[#f4f1ea] px-4 pb-12 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1240px]">
        <ProjectAdmin companies={companies} />
      </div>
    </main>
  );
}
