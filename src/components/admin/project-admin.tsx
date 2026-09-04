import Link from "next/link";
import { ArrowLeft, ExternalLink, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Company } from "@/lib/types";

type ProjectAdminProps = { companies: Company[] };

export function ProjectAdmin({ companies }: ProjectAdminProps) {
  return (
    <section>
      <Link
        href="/"
        className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-[#73695e] transition hover:text-[#171714]"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to ReviewPilot
      </Link>

      <header className="mb-10 grid gap-6 border-b border-[#171714]/12 pb-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--home-contrast)]">
            Project admin
          </p>
          <h1 className="display-type mt-4 text-[clamp(46px,5.4vw,76px)] font-normal leading-[0.92]">
            Companies
          </h1>
          <p className="mt-4 max-w-xl text-[16px] leading-7 text-[#746b60]">
            Create and manage every ReviewPilot page in this project.
          </p>
        </div>
        <Button
          asChild
          className="h-11 bg-[#171714] px-5 text-sm text-white hover:bg-[#302c27]"
        >
          <Link href="/admin/new">
            <Plus className="h-4 w-4" />
            Add company
          </Link>
        </Button>
      </header>

      {companies.length ? (
        <div className="border-t border-[#171714]/12">
          <div className="grid grid-cols-[1.35fr_0.55fr_1fr_210px] border-b border-[#171714]/12 py-3 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#8b7a66] max-lg:hidden">
            <span>Company</span>
            <span>Status</span>
            <span>Public page</span>
            <span className="text-right">Actions</span>
          </div>
          {companies.map((company) => (
            <article
              key={company.id}
              className="grid gap-4 border-b border-[#171714]/12 py-5 text-sm lg:grid-cols-[1.35fr_0.55fr_1fr_210px] lg:items-center"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#e7dccd] text-sm font-semibold text-[#4f3b2b]">
                  {company.name.slice(0, 1)}
                </span>
                <div className="min-w-0">
                  <p className="truncate font-semibold text-[#171714]">
                    {company.name}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-[#8b7a66] lg:hidden">
                    /{company.slug}
                  </p>
                </div>
              </div>
              <span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                    company.isActive
                      ? "bg-[#edf1ed] text-[#426149]"
                      : "bg-[#eee7df] text-[#7f7163]"
                  }`}
                >
                  {company.isActive ? "Active" : "Paused"}
                </span>
              </span>
              <span className="hidden truncate font-semibold text-[#73695e] lg:block">
                /{company.slug}
              </span>
              <span className="flex flex-wrap gap-2 lg:justify-end">
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#171714]/12 bg-transparent"
                >
                  <Link href={`/${company.slug}`}>
                    <ExternalLink className="h-3.5 w-3.5" />
                    Page
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="border-[#171714]/12 bg-transparent"
                >
                  <Link href={`/${company.slug}/admin`}>
                    <Settings2 className="h-3.5 w-3.5" />
                    Admin
                  </Link>
                </Button>
              </span>
            </article>
          ))}
        </div>
      ) : (
        <div className="border-y border-[#171714]/12 py-14 text-center">
          <p className="display-type text-4xl font-normal">No companies yet.</p>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#746b60]">
            Add the first company to create its public review page.
          </p>
        </div>
      )}
    </section>
  );
}
