import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Building2,
  MessageSquareText,
  Sparkles,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { listCompanies } from "@/lib/data";

export const dynamic = "force-dynamic";

const sections = [
  {
    icon: Building2,
    title: "Multi-company setup",
    copy: "Create separate public review pages for each company with clean slugs and company-specific settings.",
  },
  {
    icon: Star,
    title: "Five-question rating flow",
    copy: "Each company can define up to five 1-5 star prompts that guide the customer review.",
  },
  {
    icon: Sparkles,
    title: "AI review generation",
    copy: "Ratings and question context are sent to OpenAI to produce a natural first-person review draft.",
  },
  {
    icon: BarChart3,
    title: "Admin review visibility",
    copy: "Company admins can review generated submissions and see customer sentiment at a glance.",
  },
];

export default async function Home() {
  const companies = await listCompanies();
  const demoCompany = companies[0];

  return (
    <main>
      <section className="border-b bg-[linear-gradient(135deg,#f8fbff_0%,#ffffff_42%,#fff8ed_100%)]">
        <div className="page-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-7">
            {/* <div className="inline-flex items-center rounded-md border bg-background px-3 py-1 text-sm text-muted-foreground">
              {databaseStatusLabel()}
            </div> */}
            <div className="space-y-5">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-normal sm:text-5xl">
                AI-written reviews shaped by real customer ratings.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
                ReviewPilot gives each company its own rating page, turns
                structured answers into a useful review draft, and keeps every
                generated review visible for admins.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href={demoCompany ? `/${demoCompany.slug}` : "/admin"}>
                  Try review flow
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/admin">Manage companies</Link>
              </Button>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-5 shadow-sm">
            <div className="mb-5 flex items-center justify-between border-b pb-4">
              <div>
                <p className="text-sm text-muted-foreground">Customer review</p>
                <p className="font-semibold">
                  {demoCompany?.name ?? "Your company"}
                </p>
              </div>
              <span className="rounded-md bg-amber-100 px-3 py-1 text-sm font-medium text-amber-900">
                4.8/5
              </span>
            </div>
            <div className="space-y-4">
              {["Service quality", "Communication", "Recommendation"].map(
                (label, index) => (
                  <div key={label} className="rounded-md border p-4">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="text-sm font-medium">{label}</span>
                      <span className="text-sm text-muted-foreground">
                        {5 - (index === 2 ? 1 : 0)}/5
                      </span>
                    </div>
                    <div className="flex gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-5 w-5 fill-current" />
                      ))}
                    </div>
                  </div>
                ),
              )}
              <div className="rounded-md bg-accent p-4 text-sm leading-6 text-accent-foreground">
                “The experience felt organized, friendly, and easy from start to
                finish...”
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-normal">
            Built for guided review collection
          </h2>
          <p className="mt-3 leading-7 text-muted-foreground">
            The core flow stays simple for customers and practical for admins.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {sections.map((section) => (
            <Card key={section.title}>
              <CardHeader>
                <section.icon className="h-6 w-6 text-primary" />
                <CardTitle>{section.title}</CardTitle>
              </CardHeader>
              <CardContent className="leading-6 text-muted-foreground">
                {section.copy}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-muted/40">
        <div className="page-shell grid gap-10 py-16 lg:grid-cols-3">
          {[
            ["1", "Company admin sets prompts"],
            ["2", "Customer gives 1-5 star answers"],
            ["3", "OpenAI generates a review draft"],
          ].map(([step, title]) => (
            <div key={step} className="flex gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary font-semibold text-primary-foreground">
                {step}
              </span>
              <div>
                <h3 className="font-semibold">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  The workflow keeps the review grounded in actual customer
                  feedback.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="page-shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.75fr_1fr]">
          <div>
            <MessageSquareText className="mb-4 h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold tracking-normal">
              Ready for Postgres persistence
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Drizzle schema, migrations, and pooler-friendly environment
              configuration are already included. Add your transaction pooler
              URL, run migrations, and the fallback demo data steps aside.
            </p>
          </div>
          <div className="rounded-lg border bg-card p-5 text-sm">
            <pre className="overflow-x-auto leading-7">
              <code>{`DATABASE_URL="postgresql://..."
npm run db:generate
npm run db:migrate
npm run dev`}</code>
            </pre>
          </div>
        </div>
      </section>
    </main>
  );
}
