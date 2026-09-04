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
    <section className="bg-[var(--home-bg)] px-3 pb-8 pt-20 sm:px-5 sm:pb-10 sm:pt-24">
      <div className="hero-panel relative mx-auto grid min-h-0 w-full max-w-[1440px] overflow-hidden rounded-[22px] border border-[var(--home-border)] bg-[var(--home-surface)] shadow-[0_25px_72px_rgba(45,35,22,0.07)] md:rounded-[26px] xl:min-h-[700px] xl:grid-cols-[49%_51%]">
        <div className="relative z-10 flex min-w-0 flex-col justify-center px-6 py-11 sm:px-10 sm:py-14 xl:px-20">
          <MaskedText
            lines={["More authentic", "reviews. More trust.", "More growth."]}
            className="display-type max-w-[760px] text-[40px] leading-[0.96] text-[var(--home-text)] min-[380px]:text-[46px] sm:text-[60px] md:text-[68px] xl:text-[80px]"
          />

          <p className="hero-copy mt-7 max-w-[430px] text-[16px] leading-[1.62] text-[var(--home-muted)]">
            Turn simple customer feedback into thoughtful, polished reviews that
            are easier to write and easier to share.
          </p>

          <div className="hero-cta mt-7 flex flex-wrap items-center gap-3">
            <Button asChild className="group h-11 px-5 text-[14px]">
              <Link href={demoHref}>
                Create your review page
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="group h-11 border-[var(--home-border)] bg-transparent px-5 text-[14px] text-[var(--home-text)]"
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
