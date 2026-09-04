import { Star } from "lucide-react";
import type { Review } from "@/lib/types";

type ReviewsTableProps = {
  reviews: Review[];
};

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  return (
    <section className="border border-[#171714]/10 bg-[#fbf9f5] p-6 shadow-[0_18px_54px_rgba(45,35,22,0.045)] sm:p-8">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-5 border-b border-[#171714]/10 pb-6">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-accent)]">
            Review record
          </p>
          <h2 className="display-type mt-3 text-[40px] font-normal leading-none">
            Saved reviews
          </h2>
          <p className="mt-2 text-sm text-[#73695e]">
            Customers&apos; polished review drafts.
          </p>
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#8b7a66]">
          {reviews.length} saved
        </span>
      </div>
      {reviews.length ? (
        <div className="grid gap-3 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="border border-[#e7ded1] bg-[#fbfaf6] p-4"
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e7dccd] text-sm font-semibold">
                    {review.reviewerName?.slice(0, 1) ?? "-"}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-semibold">
                      {review.reviewerName ?? "Reviewer"}
                    </p>
                    <p className="text-xs text-[#8b7a66]">
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }).format(new Date(review.createdAt))}
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-600">
                  <Star className="h-4 w-4 fill-current" />
                  {review.rating}/5
                </span>
              </div>
              <p className="line-clamp-3 text-sm leading-6 text-[#5c5248]">
                {review.generatedReview}
              </p>
            </article>
          ))}
        </div>
      ) : (
        <div className="border border-dashed border-[#ded6c8] p-8 text-center text-sm text-[#73695e]">
          No reviews yet.
        </div>
      )}
    </section>
  );
}
