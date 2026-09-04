import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { HeroVisual } from "@/components/home/HeroVisual";
import { TrustLogos } from "@/components/home/TrustLogos";
import { MaskedText } from "@/components/motion/MaskedText";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  demoHref: string;
};

export function HeroSection({ demoHref }: HeroSectionProps) {
  return (
    <section className="bg-[var(--home-bg)] px-4 pb-10 pt-24 sm:px-5">
      <div className="hero-panel relative mx-auto grid min-h-[700px] w-full max-w-[1440px] overflow-hidden rounded-[26px] border border-[var(--home-border)] bg-[var(--home-surface)] shadow-[0_25px_72px_rgba(45,35,22,0.07)] lg:grid-cols-[49%_51%]">
        <div className="relative z-10 flex flex-col justify-center px-8 py-14 sm:px-12 lg:px-16 xl:px-20">
          <MaskedText
            lines={["More authentic", "reviews. More trust.", "More growth."]}
            className="display-type text-[clamp(54px,5vw,80px)] leading-[0.92] tracking-[-0.05em] text-[var(--home-text)]"
          />

          <p className="hero-copy mt-7 max-w-[410px] text-[15px] leading-[1.62] text-[var(--home-muted)]">
            Turn simple customer feedback into thoughtful, polished reviews that
            are easier to write and easier to share.
          </p>

          <div className="hero-cta mt-7 flex flex-wrap items-center gap-3">
            <Button asChild className="group h-11 px-5 text-[13px]">
              <Link href={demoHref}>
                Create your review page
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group h-11 border-[var(--home-border)] bg-transparent px-5 text-[13px] text-[var(--home-text)]"
            >
              <Link href="#review-experience">
                See how it works
                <Play className="h-3.5 w-3.5 fill-current transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          <TrustLogos />

        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
