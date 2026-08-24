"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value?: number;
  onChange: (value: number) => void;
  label: string;
};

export function StarRating({ value = 0, onChange, label }: StarRatingProps) {
  return (
    <div className="space-y-3 rounded-lg border bg-card p-4">
      <p className="text-sm font-medium leading-6">{label}</p>
      <div className="flex flex-wrap items-center gap-2">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            type="button"
            variant="outline"
            size="icon"
            aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
            onClick={() => onChange(rating)}
            className={cn(
              "h-11 w-11 border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100",
              value >= rating && "bg-amber-400 text-amber-950 hover:bg-amber-400"
            )}
          >
            <Star className={cn("h-5 w-5", value >= rating && "fill-current")} />
          </Button>
        ))}
        {value > 0 ? (
          <span className="ml-1 text-sm text-muted-foreground">{value}/5</span>
        ) : null}
      </div>
    </div>
  );
}
