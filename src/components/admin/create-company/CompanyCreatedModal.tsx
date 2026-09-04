"use client";

import Link from "next/link";
import { Check, ExternalLink, ListPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";

type CompanyCreatedModalProps = {
  company: {
    name: string;
    slug: string;
  } | null;
  open: boolean;
  onClose: () => void;
};

export function CompanyCreatedModal({
  company,
  open,
  onClose,
}: CompanyCreatedModalProps) {
  if (!open || !company) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[80] grid place-items-center bg-[#171714]/34 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="w-full max-w-[520px] border border-[#ded6c8] bg-[#fbfaf6] p-6 shadow-[0_30px_90px_rgba(23,19,15,0.24)]">
        <div className="mb-6 flex items-start justify-between gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[var(--home-contrast)] text-white">
            <Check className="h-5 w-5" />
          </span>
          <Button
            aria-label="Close success message"
            type="button"
            variant="ghost"
            size="icon"
            className="h-9 w-9 rounded-full"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b7a66]">
          Company added
        </p>
        <h2 className="display-type mt-3 text-[42px] leading-none">
          {company.name} is ready.
        </h2>
        <p className="mt-4 text-[15px] leading-7 text-[#73695e]">
          The company profile has been created. Add review questions next, or
          open the public page now.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Button asChild className="rounded-full bg-[#171714] px-5 text-white hover:bg-[#302c27]">
            <Link href={`/admin/new/${company.slug}/questions`}>
              <ListPlus className="h-4 w-4" />
              Add review questions
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full bg-white/70 px-5">
            <Link href={`/${company.slug}`}>
              <ExternalLink className="h-4 w-4" />
              Company page
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
