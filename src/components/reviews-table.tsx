import { Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Review } from "@/lib/types";

type ReviewsTableProps = {
  reviews: Review[];
};

export function ReviewsTable({ reviews }: ReviewsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reviews</CardTitle>
        <CardDescription>{reviews.length} generated review{reviews.length === 1 ? "" : "s"}</CardDescription>
      </CardHeader>
      <CardContent>
        {reviews.length ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="border-b text-muted-foreground">
                <tr>
                  <th className="py-3 pr-4 font-medium">Customer</th>
                  <th className="py-3 pr-4 font-medium">Rating</th>
                  <th className="py-3 pr-4 font-medium">Review</th>
                  <th className="py-3 pr-4 font-medium">Created</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {reviews.map((review) => (
                  <tr key={review.id}>
                    <td className="py-4 pr-4 align-top">
                      <div className="font-medium">{review.reviewerName || "Anonymous"}</div>
                      <div className="text-muted-foreground">{review.reviewerEmail || "No email"}</div>
                    </td>
                    <td className="py-4 pr-4 align-top">
                      <span className="inline-flex items-center gap-1 rounded-md bg-amber-100 px-2 py-1 text-amber-900">
                        <Star className="h-4 w-4 fill-current" />
                        {review.rating}/5
                      </span>
                    </td>
                    <td className="max-w-xl py-4 pr-4 align-top leading-6">{review.generatedReview}</td>
                    <td className="py-4 pr-4 align-top text-muted-foreground">
                      {new Intl.DateTimeFormat("en", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      }).format(new Date(review.createdAt))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-lg border border-dashed p-8 text-center text-sm text-muted-foreground">
            No reviews yet.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
