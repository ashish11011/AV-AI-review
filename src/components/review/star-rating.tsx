"use client";

import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StarRatingProps = {
  value?: number;
  onChange: (value: number) => void;
  label: string;
  index: number;
};

export function StarRating({ value = 0, onChange, label, index }: StarRatingProps) {
  return (
    <div className="border-b border-[#171714]/10 bg-[#fbfaf6] p-5 last:border-b-0 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-[1fr_auto] sm:items-start">
        <div className="grid min-w-0 grid-cols-[28px_minmax(0,1fr)] gap-4">
          <span className="pt-1 text-[11px] font-semibold text-[#b87854]">
            0{index}
          </span>
          <p className="max-w-lg text-[15px] font-semibold leading-6 text-[#27221d]">
            {label}
          </p>
        </div>
        <span
          className={`text-[11px] font-semibold sm:pt-1 ${
            value ? "text-[#1f6c63]" : "text-[#a69888]"
          }`}
        >
          {value ? `${value}/5` : "Not rated"}
        </span>
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-1 sm:ml-11">
        {[1, 2, 3, 4, 5].map((rating) => (
          <Button
            key={rating}
            type="button"
            size="icon"
            aria-label={`${rating} star${rating === 1 ? "" : "s"}`}
            onClick={() => onChange(rating)}
            className={cn(
              "h-9 w-9 rounded-full border border-transparent bg-transparent p-0 text-[#c9b7a0] shadow-none hover:border-[#1f6c63]/20 hover:bg-[#e7f0ed] hover:text-[#1f6c63]",
              value >= rating && "border-[#1f6c63]/15 bg-[#e7f0ed] text-[#1f6c63] hover:text-[#1f6c63]"
            )}
          >
            <Star className={cn("h-4 w-4", value >= rating && "fill-current")} />
          </Button>
        ))}
      </div>
    </div>
  );
}
