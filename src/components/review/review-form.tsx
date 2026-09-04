"use client";

import {
  Check,
  Copy,
  ExternalLink,
  Loader2,
  LockKeyhole,
  RotateCcw,
  Send,
  Sparkles,
} from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { saveReviewAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/review/star-rating";
import type { CompanyWithQuestions, ReviewAnswer } from "@/lib/types";

type ReviewFormProps = {
  company: CompanyWithQuestions;
};

export function ReviewForm({ company }: ReviewFormProps) {
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [review, setReview] = useState("");
  const [error, setError] = useState("");
  const [copyStatus, setCopyStatus] = useState("");
  const [isGenerating, startGenerating] = useTransition();

  const answers = useMemo<ReviewAnswer[]>(
    () =>
      company.questions
        .filter((question) => ratings[question.id])
        .map((question) => ({
          questionId: question.id,
          prompt: question.prompt,
          rating: ratings[question.id],
        })),
    [company.questions, ratings],
  );

  const isComplete =
    answers.length === company.questions.length && answers.length > 0;
  const completion = company.questions.length
    ? (answers.length / company.questions.length) * 100
    : 0;

  function generateReview() {
    if (!isComplete) return;

    setError("");
    setCopyStatus("");
    startGenerating(async () => {
      const response = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: company.name,
          answers: answers.map(({ prompt, rating }) => ({ prompt, rating })),
        }),
      });
      const data = (await response.json()) as {
        review?: string;
        error?: string;
      };

      if (!response.ok || !data.review) {
        setError(data.error || "We could not prepare the review. Please try again.");
        return;
      }

      setReview(data.review);
    });
  }

  async function copyReviewAndOpenGoogle() {
    setError("");
    setCopyStatus("");

    if (!review.trim()) {
      setError("Create your review before opening the Google review page.");
      return;
    }

    if (!company.googleReviewUrl?.trim()) {
      setError("This business has not added a Google review link.");
      return;
    }

    try {
      const destination = new URL(company.googleReviewUrl);
      if (!["http:", "https:"].includes(destination.protocol)) {
        throw new Error("Unsupported protocol");
      }

      await navigator.clipboard.writeText(review.trim());
      setCopyStatus("Your review is copied. Opening Google reviews...");
      window.location.href = destination.toString();
    } catch {
      setError("We could not open Google. Please copy the review and try again.");
    }
  }

  if (!company.questions.length) {
    return (
      <section className="mx-auto max-w-xl border border-[#1f6c63]/20 bg-[#eef6f3] p-8 text-center">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f6c63]">
          ReviewPilot
        </p>
        <h2 className="display-type mt-4 text-4xl font-normal leading-none">
          This review page is being prepared.
        </h2>
        <p className="mt-4 text-[16px] leading-7 text-[#70675d]">
          The business has not added its review questions yet.
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-7 xl:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:items-start">
      <section className="overflow-hidden border border-[#171714]/10 bg-[#fbf9f5] shadow-[0_20px_60px_rgba(45,35,22,0.06)]">
        <div className="border-b border-[#171714]/10 p-6 sm:p-7">
          <div className="flex items-start justify-between gap-5">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-contrast)]">
                Step 01 / Rate
              </p>
              <h2 className="display-type mt-3 text-[clamp(36px,3vw,48px)] font-normal leading-none">
                What stood out?
              </h2>
            </div>
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#1f6c63]/30 text-sm font-semibold text-[#1f6c63]">
              {answers.length}/{company.questions.length}
            </span>
          </div>
          <p className="mt-4 max-w-md text-[15px] leading-6 text-[#746b60]">
            Rate each part of the experience. The review stage opens after every
            question is complete.
          </p>
          <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#e6ded3]">
            <div
              className="h-full rounded-full bg-[var(--home-contrast)] transition-[width] duration-500"
              style={{ width: `${completion}%` }}
            />
          </div>
        </div>

        <div>
          {company.questions.map((question, index) => (
            <StarRating
              key={question.id}
              label={question.prompt}
              value={ratings[question.id]}
              onChange={(value) => {
                setRatings((current) => ({
                  ...current,
                  [question.id]: value,
                }));
                setReview("");
              }}
              index={index + 1}
            />
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-[#171714]/10 bg-[#f3eee6] px-6 py-4 text-sm font-semibold text-[#70675d]">
          {isComplete ? (
            <Check className="h-4 w-4 text-[#1f6c63]" />
          ) : (
            <span className="h-4 w-4 rounded-full border border-[#a69888]" />
          )}
          <span>
            {isComplete
              ? "Ratings complete. Your draft is ready."
              : "Complete every rating to unlock your draft."}
          </span>
        </div>
      </section>

      <section className="relative overflow-hidden border border-[#171714]/10 bg-[#fbf9f5] shadow-[0_20px_60px_rgba(45,35,22,0.06)]">
        <div
          className={`transition duration-500 ${
            isComplete
              ? "opacity-100"
              : "pointer-events-none select-none opacity-30 grayscale"
          }`}
          aria-disabled={!isComplete}
        >
          <div className="flex items-start justify-between gap-5 border-b border-[#171714]/10 p-6 sm:p-7">
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-accent)]">
                Step 02 / Shape
              </p>
              <h2 className="display-type mt-3 text-[clamp(36px,3vw,48px)] font-normal leading-none">
                Your review, your voice.
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-6 text-[#746b60]">
                Turn the ratings into a natural draft, then edit before sharing.
              </p>
            </div>
            <span className="hidden shrink-0 rounded-full bg-[#dcebe7] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#1f6c63] sm:inline-flex">
              Ready to write
            </span>
          </div>

          <div className="p-6 sm:p-7">
            <Button
              type="button"
              className="h-12 w-full bg-[var(--home-contrast)] text-white hover:bg-[#174e48]"
              disabled={!isComplete || isGenerating}
              onClick={generateReview}
            >
              {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="h-4 w-4" />
              )}
              {isGenerating ? "Preparing your review" : "Create my review"}
            </Button>

            {error ? (
              <p className="mt-4 border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                {error}
              </p>
            ) : null}

            <form action={saveReviewAction} className="mt-6 space-y-5">
              <input type="hidden" name="companyId" value={company.id} />
              <input type="hidden" name="companySlug" value={company.slug} />
              <input
                type="hidden"
                name="questionAnswers"
                value={JSON.stringify(answers)}
              />
              <input type="hidden" name="generatedReview" value={review} />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="reviewerName">Name</Label>
                  <Input
                    id="reviewerName"
                    name="reviewerName"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reviewerEmail">Email</Label>
                  <Input
                    id="reviewerEmail"
                    name="reviewerEmail"
                    type="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="reviewDraft">Review draft</Label>
                <Textarea
                  id="reviewDraft"
                  value={review}
                  onChange={(event) => setReview(event.target.value)}
                  placeholder="Your review will appear here after you create it."
                  rows={9}
                  className="resize-y border-[#171714]/12 bg-[#f6f1e9] px-5 py-4 text-[16px] leading-7"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  disabled={!review.trim()}
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(review.trim());
                      setCopyStatus("Review copied.");
                    } catch {
                      setError("We could not copy the review. Please select it manually.");
                    }
                  }}
                >
                  <Copy className="h-4 w-4" />
                  Copy
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={!isComplete || isGenerating}
                  onClick={generateReview}
                >
                  <RotateCcw className="h-4 w-4" />
                  Rewrite
                </Button>
                <Button
                  type="submit"
                  className="bg-[#171714] text-white hover:bg-[#302c27]"
                  disabled={!review.trim()}
                >
                  <Send className="h-4 w-4" />
                  Save draft
                </Button>
              </div>

              {copyStatus ? (
                <p className="text-sm font-semibold text-[#1f6c63]">
                  {copyStatus}
                </p>
              ) : null}
            </form>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-5 border-t border-[#171714]/10 bg-[#f3eee6] p-6 sm:px-7">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#1f6c63]">
                Step 03 / Share
              </p>
              <p className="mt-1 text-sm text-[#746b60]">
                Copy your review, then open the business&apos;s Google page.
              </p>
            </div>
            <Button
              type="button"
              className="shrink-0 bg-[#171714] text-white hover:bg-[#302c27]"
              disabled={!review.trim() || !company.googleReviewUrl}
              onClick={copyReviewAndOpenGoogle}
            >
              Google
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {!isComplete ? (
          <div className="absolute inset-0 z-10 grid place-items-center bg-[#fbf9f5]/40 p-6">
            <div className="max-w-[260px] text-center">
              <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-[#e9e1d5] text-[#746b60]">
                <LockKeyhole className="h-5 w-5" />
              </span>
              <p className="display-type mt-5 text-3xl font-normal leading-none">
                Finish ratings first.
              </p>
              <p className="mt-3 text-sm leading-6 text-[#746b60]">
                The draft opens after every question has a rating.
              </p>
            </div>
          </div>
        ) : null}
      </section>
    </div>
  );
}
