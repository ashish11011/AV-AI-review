import { BenefitsStatement } from "@/components/home/BenefitsStatement";
import { FinalCTA } from "@/components/home/FinalCTA";
import { HeroSection } from "@/components/home/HeroSection";
import { ReviewFlowShowcase } from "@/components/home/ReviewFlowShowcase";
import { ReviewTransformation } from "@/components/home/ReviewTransformation";
import { listCompaniesWithDetails } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const companies = await listCompaniesWithDetails();
  const demoCompany = companies[0];
  const demoHref = demoCompany ? `/${demoCompany.slug}` : "/admin";

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--home-bg)] text-[var(--home-text)]">
      <HeroSection demoHref={demoHref} />
      <ReviewTransformation />
      <ReviewFlowShowcase />
      <BenefitsStatement />
      <FinalCTA demoHref={demoHref} />
    </main>
  );
}
