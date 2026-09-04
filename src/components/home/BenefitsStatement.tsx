import { Reveal } from "@/components/motion/Reveal";

const principles = ["Guided ratings", "Natural drafts", "Ready to share"];

export function BenefitsStatement() {
  return (
    <section className="bg-[var(--home-bg)]">
      <div className="page-shell max-w-[1240px] py-24 lg:py-32">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[var(--home-accent)]">The ReviewPilot difference</p>
          <h2 className="display-type mt-7 max-w-4xl text-[clamp(52px,6.4vw,96px)] font-normal leading-[0.91] tracking-[-0.05em]">Good experiences deserve to be seen.</h2>
        </Reveal>
        <Reveal delay={100} className="mt-16 border-t border-[var(--home-border)]">
          <div className="grid divide-y divide-[var(--home-border)] md:grid-cols-3 md:divide-x md:divide-y-0">
            {principles.map((principle, index) => <div key={principle} className="flex items-center gap-4 py-5 md:px-6 md:first:pl-0"><span className="text-[11px] font-semibold text-[var(--home-accent)]">0{index + 1}</span><span className="text-[15px] font-semibold text-[var(--home-text)]">{principle}</span></div>)}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
