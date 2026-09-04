import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Check, Plus } from "lucide-react";
import { CircularLoader } from "@/components/admin/create-company/CircularLoader";

type BasicsStepProps = {
  name: string;
  slug: string;
  description: string;
  googleReviewUrl: string;
  isActive: boolean;
  suggestedSlug: string;
  onNameChange: (value: string) => void;
  onSlugChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onGoogleReviewUrlChange: (value: string) => void;
  onIsActiveChange: (value: boolean) => void;
  canSubmit: boolean;
  isPending: boolean;
  completed: boolean;
};

export function BasicsStep({
  name,
  slug,
  description,
  googleReviewUrl,
  isActive,
  suggestedSlug,
  onNameChange,
  onSlugChange,
  onDescriptionChange,
  onGoogleReviewUrlChange,
  onIsActiveChange,
  canSubmit,
  isPending,
  completed,
}: BasicsStepProps) {
  return (
    <section className="border border-[#ded6c8] bg-[#fbfaf6] p-5 shadow-[0_20px_70px_rgba(44,34,22,0.06)] sm:p-7">
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-[#171714]/10 pb-6">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b7a66]">
            Step 01
          </p>
          <h2 className="display-type mt-3 text-[clamp(38px,4vw,54px)] font-normal leading-none">
            Company profile
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#73695e]">
            Set the public identity customers see before they write a review.
          </p>
        </div>
        <span className="rounded-full bg-[#f1eadf] px-3 py-1.5 text-xs font-bold text-[#73695e]">
          {completed ? "Profile saved" : "Required first"}
        </span>
      </div>

      <fieldset disabled={completed || isPending}>
        <div className="grid gap-4 md:grid-cols-2">
          <label className="space-y-2">
            <span className="text-[13px] font-bold">Company name</span>
            <Input
              name="name"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              placeholder="Lumina Interiors"
              required
              className="h-12 px-4 text-[15px]"
            />
          </label>
          <label className="space-y-2">
            <span className="text-[13px] font-bold">Public slug</span>
            <Input
              name="slug"
              value={slug}
              onChange={(event) => onSlugChange(event.target.value)}
              placeholder={suggestedSlug || "lumina-interiors"}
              className="h-12 px-4 text-[15px]"
            />
            <span className="block truncate text-xs font-semibold text-[#8b7a66]">
              {slug || suggestedSlug
                ? `/${slug || suggestedSlug}`
                : "Generated from company name"}
            </span>
          </label>
        </div>

        <label className="mt-4 block space-y-2">
          <span className="text-[13px] font-bold">Short description</span>
          <Textarea
            name="description"
            value={description}
            onChange={(event) => onDescriptionChange(event.target.value)}
            rows={4}
            placeholder="A concise description of the business and customer experience."
            required
            className="px-4 py-3 text-[15px]"
          />
        </label>

        <label className="mt-4 block space-y-2">
          <span className="text-[13px] font-bold">Google review page link</span>
          <Textarea
            name="googleReviewUrl"
            value={googleReviewUrl}
            onChange={(event) => onGoogleReviewUrlChange(event.target.value)}
            rows={3}
            placeholder="https://search.google.com/local/writereview?placeid=..."
            required
            className="px-4 py-3 text-[15px]"
          />
        </label>

        <label className="mt-4 flex items-center justify-between gap-4 border border-[#e7ded1] bg-white/58 px-4 py-3 text-sm font-bold">
          <span>
            Active review page
            <span className="block text-xs font-semibold text-[#8b7a66]">
              Customers can open the page as soon as it is created.
            </span>
          </span>
          <input
            type="checkbox"
            name="isActive"
            checked={isActive}
            onChange={(event) => onIsActiveChange(event.target.checked)}
            className="h-4 w-4 accent-[#1f6c63]"
          />
        </label>
      </fieldset>

      <Button
        type="submit"
        disabled={!canSubmit || isPending || completed}
        className="mt-6 h-12 rounded-full bg-[#171714] px-6 text-sm font-bold text-white hover:bg-[#302c27]"
      >
        {isPending ? (
          <>
            <CircularLoader />
            Creating company
          </>
        ) : completed ? (
          <>
            <Check className="h-4 w-4" />
            Company added
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            Create company
          </>
        )}
      </Button>
    </section>
  );
}
