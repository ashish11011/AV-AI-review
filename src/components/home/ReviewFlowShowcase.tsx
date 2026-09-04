import { Copy, Edit3, Star, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

const questions = [
  ["How would you rate the quality of service?", 5],
  ["How would you rate communication?", 4],
  ["How would you rate the overall experience?", 5],
];

const draftActions: Array<[LucideIcon, string]> = [
  [Edit3, "Edit review"],
  [Copy, "Copy review"],
];

export function ReviewFlowShowcase() {
  return (
    <section id="review-experience" className="bg-[var(--home-surface-soft)] py-24">
      <div className="page-shell max-w-[1320px]">
        <Reveal className="mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-muted)]">
            Customer review experience
          </p>
          <h2 className="display-type mx-auto mt-5 max-w-3xl text-[clamp(46px,4.8vw,78px)] font-normal leading-none tracking-[-0.035em]">
            One calm path from feedback to finished review.
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <div className="rounded-[30px] border border-[var(--home-border)] bg-[var(--home-surface)] p-5 shadow-[0_24px_80px_rgba(45,35,22,0.09)]">
            <div className="mb-5 flex items-center justify-between border-b border-[var(--home-border)] pb-4">
              <span className="display-type text-2xl">ReviewPilot</span>
              <span className="text-sm font-semibold text-[var(--home-contrast)]">Guided review page</span>
            </div>
            <div className="grid gap-5 xl:grid-cols-[0.92fr_1.12fr_0.72fr]">
              <div className="rounded-[24px] border border-[var(--home-border)] bg-[#fbfaf6] p-5">
                <h3 className="display-type text-3xl">Your experience matters</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--home-muted)]">Rate the moments that made the experience memorable.</p>
                <div className="mt-5 divide-y divide-[var(--home-border)]">
                  {questions.map(([question, rating]) => (
                    <div key={question} className="py-4">
                      <p className="mb-3 text-sm font-semibold">{question}</p>
                      <div className="flex gap-1 text-[var(--home-accent)]">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${Number(rating) >= star ? "fill-current" : "text-[#d9cbb9]"}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-[var(--home-border)] bg-white/70 p-5">
                <h3 className="display-type text-3xl">Your review draft</h3>
                <div className="mt-5 rounded-[20px] bg-[#fbfaf6] p-5 shadow-sm">
                  <div className="mb-4 flex gap-1 text-[var(--home-accent)]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[15px] leading-7 text-[#514a42]">
                    Your ratings become a clear, natural review draft that can be edited before it is shared.
                  </p>
                </div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {draftActions.map(([Icon, label]) => (
                    <span
                      key={String(label)}
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--home-border)] px-4 py-2 text-sm font-semibold"
                    >
                      <Icon className="h-4 w-4" />
                      {label}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center justify-center rounded-[24px] border border-[var(--home-border)] bg-[#fbfaf6] p-6 text-center">
                <div className="google-g mb-6 text-5xl font-bold">G</div>
                <h3 className="display-type text-3xl">Share on Google</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--home-muted)]">
                  When it feels right, take your completed review where people can find it.
                </p>
                <span className="mt-7 rounded-full bg-[var(--home-contrast)] px-5 py-3 text-sm font-semibold text-white">Review on Google</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
