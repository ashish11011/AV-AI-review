import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectAdmin } from "@/components/project-admin";
import { listCompanies } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const companies = await listCompanies();

  return (
    <main className="page-shell py-10">
      <Button asChild variant="ghost" className="mb-6 px-0">
        <Link href="/">
          <ArrowLeft className="h-4 w-4" />
          Home
        </Link>
      </Button>
      <div className="mb-8 max-w-3xl">
        <p className="mb-2 text-sm font-medium uppercase tracking-wider text-primary">
          Project admin
        </p>
        <h1 className="text-4xl font-semibold tracking-normal">Companies</h1>
        {/* <p className="mt-3 text-muted-foreground">{databaseStatusLabel()}</p> */}
      </div>
      <ProjectAdmin companies={companies} />
    </main>
  );
}
