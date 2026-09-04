import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/motion/Reveal";

type FinalCTAProps = {
  demoHref: string;
};

export function FinalCTA({ demoHref }: FinalCTAProps) {
  return (
    <section className="bg-[var(--home-bg)] px-4 pb-10 sm:px-5">
      <Reveal>
        <div className="relative mx-auto grid max-w-[1360px] overflow-hidden rounded-[24px] bg-[var(--home-dark)] p-7 text-[var(--home-surface)] shadow-[0_24px_80px_rgba(45,35,22,0.12)] sm:rounded-[30px] sm:p-8 xl:grid-cols-[1fr_360px] xl:p-14">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-accent-soft)]">ReviewPilot</p>
            <h2 className="display-type mt-6 max-w-4xl text-[clamp(48px,5.8vw,92px)] font-normal leading-[0.96] tracking-[-0.04em]">
              Turn great customer experiences into reviews people can actually
              see.
            </h2>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="h-12 bg-[var(--home-surface)] px-6 text-[var(--home-text)] hover:bg-white">
                <Link href={demoHref}>
                  Create your review page
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 border-white/16 bg-transparent px-6 text-white hover:bg-white/10">
                <Link href="#review-experience">See how it works</Link>
              </Button>
            </div>
          </div>
          <article className="mt-10 rounded-[24px] border border-white/10 bg-[var(--home-contrast)]/30 p-5 xl:mt-0 xl:self-end">
            <div className="mb-4 flex gap-1 text-[var(--home-accent-soft)]">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-4 w-4 fill-current" />
              ))}
            </div>
            <p className="text-[15px] leading-7 text-white/74">
              Better feedback should lead to a better public reputation. ReviewPilot keeps that path simple.
            </p>
          </article>
        </div>
      </Reveal>
    </section>
  );
}
