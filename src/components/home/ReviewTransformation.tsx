import { Star } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const prompts = [
  ["Quality of service", 5],
  ["Communication", 5],
  ["Value for money", 4],
];

export function ReviewTransformation() {
  return (
    <section className="relative overflow-hidden bg-[#24413a] py-24 text-[#fbf9f5] lg:py-28">
      <div className="absolute -right-32 -top-56 h-[620px] w-[620px] rounded-full border border-[#e8c5b2]/15" />
      <div className="absolute -right-16 -top-40 h-[480px] w-[480px] rounded-full border border-white/10" />

      <div className="page-shell relative mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[0.84fr_1.16fr] lg:items-center">
        <Reveal>
          <p className="text-[11px] font-semibold uppercase tracking-[0.17em] text-[#e8c5b2]">
            The better way to ask
          </p>
          <h2 className="display-type mt-7 max-w-lg text-[clamp(52px,5.5vw,78px)] font-normal leading-[0.92]">
            Better questions create better reviews.
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-7 text-white/66">
            ReviewPilot guides people through the details, then helps them turn
            real feedback into a review they are comfortable sharing.
          </p>
        </Reveal>

        <div className="relative grid gap-4 sm:grid-cols-[0.88fr_1.12fr]">
          <Reveal delay={120}>
            <div className="border border-white/12 bg-[#1d332e] p-5">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
                Customer ratings
              </p>
              {prompts.map(([label, rating]) => (
                <div key={String(label)} className="border-t border-white/10 py-4">
                  <p className="mb-2 text-sm text-white/86">{label}</p>
                  <div className="flex gap-1 text-[#efb965]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-3.5 w-3.5 ${
                          Number(rating) >= star ? "fill-current" : "text-white/18"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={220}>
            <article className="self-end bg-[#f1e7d8] p-6 text-[#252019] shadow-[0_24px_60px_rgba(7,19,15,0.28)]">
              <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-[#7d6e5e]">
                Your review draft
              </p>
              <div className="mt-5 flex gap-0.5 text-[#c96c45]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 font-serif text-[21px] leading-[1.33]">
                Clear questions give customers a natural way to reflect on the
                experience before they write.
              </p>
              <p className="mt-6 border-t border-[#252019]/12 pt-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-[#7d6e5e]">
                Ready to edit and share
              </p>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
