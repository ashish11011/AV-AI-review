"use client";

import { Copy, ExternalLink, Loader2, Send, Sparkles } from "lucide-react";
import { useMemo, useState, useTransition } from "react";
import { saveReviewAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { StarRating } from "@/components/star-rating";
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
          rating: ratings[question.id]
        })),
    [company.questions, ratings]
  );

  const isComplete = answers.length === company.questions.length && answers.length > 0;

  function generateReview() {
    setError("");
    setCopyStatus("");
    startGenerating(async () => {
      const response = await fetch("/api/generate-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          companyName: company.name,
          answers: answers.map(({ prompt, rating }) => ({ prompt, rating }))
        })
      });
      const data = (await response.json()) as { review?: string; error?: string };

      if (!response.ok || !data.review) {
        setError(data.error || "Review generation failed. Please try again.");
        return;
      }

      setReview(data.review);
    });
  }

  async function copyReviewAndOpenGoogle() {
    setError("");
    setCopyStatus("");

    if (!review.trim()) {
      setError("Generate a review before opening the Google review page.");
      return;
    }

    if (!company.googleReviewUrl?.trim()) {
      setError("This company has not added a Google review page link yet.");
      return;
    }

    let destination: URL;
    try {
      destination = new URL(company.googleReviewUrl);
      if (!["http:", "https:"].includes(destination.protocol)) {
        throw new Error("Unsupported URL protocol.");
      }
    } catch {
      setError("The Google review page link is not a valid URL.");
      return;
    }

    try {
      await navigator.clipboard.writeText(review.trim());
      setCopyStatus("Review copied. Opening Google reviews...");
      window.location.href = destination.toString();
    } catch {
      setError("Could not copy the review. Please copy it manually before opening Google.");
    }
  }

  if (!company.questions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>No questions yet</CardTitle>
          <CardDescription>
            This company needs to add at least one question before customers can create a review.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
      <div className="space-y-4">
        {company.questions.map((question) => (
          <StarRating
            key={question.id}
            label={question.prompt}
            value={ratings[question.id]}
            onChange={(value) => {
              setRatings((current) => ({ ...current, [question.id]: value }));
              setReview("");
            }}
          />
        ))}
      </div>

      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Create your review</CardTitle>
          <CardDescription>
            Answer every question, generate a draft, edit it if needed, then submit.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <Button
            type="button"
            className="w-full"
            disabled={!isComplete || isGenerating}
            onClick={generateReview}
          >
            {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            Generate review
          </Button>
          {error ? <p className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</p> : null}
          <form action={saveReviewAction} className="space-y-4">
            <input type="hidden" name="companyId" value={company.id} />
            <input type="hidden" name="companySlug" value={company.slug} />
            <input type="hidden" name="questionAnswers" value={JSON.stringify(answers)} />
            <input type="hidden" name="generatedReview" value={review} />

            <div className="space-y-2">
              <Label htmlFor="reviewerName">Name</Label>
              <Input id="reviewerName" name="reviewerName" placeholder="Jane Customer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewerEmail">Email</Label>
              <Input id="reviewerEmail" name="reviewerEmail" type="email" placeholder="jane@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviewDraft">Generated review</Label>
              <Textarea
                id="reviewDraft"
                value={review}
                onChange={(event) => setReview(event.target.value)}
                placeholder="Your generated review will appear here."
                rows={7}
              />
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <Button
                type="button"
                variant="outline"
                disabled={!review.trim()}
                onClick={async () => {
                  setError("");
                  setCopyStatus("");
                  try {
                    await navigator.clipboard.writeText(review.trim());
                    setCopyStatus("Review copied.");
                  } catch {
                    setError("Could not copy the review. Please copy it manually.");
                  }
                }}
              >
                <Copy className="h-4 w-4" />
                Copy review
              </Button>
              <Button
                type="button"
                variant="secondary"
                disabled={!review.trim() || !company.googleReviewUrl}
                onClick={copyReviewAndOpenGoogle}
              >
                <ExternalLink className="h-4 w-4" />
                Copy and open Google
              </Button>
            </div>
            {copyStatus ? <p className="text-sm text-muted-foreground">{copyStatus}</p> : null}
            <Button type="submit" className="w-full" disabled={!review.trim()}>
              <Send className="h-4 w-4" />
              Save review
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
