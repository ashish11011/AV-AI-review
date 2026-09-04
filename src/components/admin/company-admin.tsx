import { Save } from "lucide-react";
import { replaceQuestionsAction, updateCompanyAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { CompanyWithDetails } from "@/lib/types";

type CompanyAdminProps = {
  company: CompanyWithDetails;
};

export function CompanyAdmin({ company }: CompanyAdminProps) {
  return (
    <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
      <section className="border border-[#171714]/10 bg-[#fbf9f5] p-6 shadow-[0_18px_54px_rgba(45,35,22,0.045)] sm:p-8">
        <div className="mb-7 border-b border-[#171714]/10 pb-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-contrast)]">
            Public identity
          </p>
          <h2 className="display-type mt-3 text-[40px] font-normal leading-none">
            Company profile
          </h2>
          <p className="mt-2 text-sm text-[#73695e]">
            Update public identity, page URL, and Google destination.
          </p>
        </div>
        <form action={updateCompanyAction} className="space-y-5">
          <input type="hidden" name="id" value={company.id} />
          <div className="space-y-2">
            <Label htmlFor="companyName">Name</Label>
            <Input
              id="companyName"
              name="name"
              defaultValue={company.name}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companySlug">Slug</Label>
            <Input
              id="companySlug"
              name="slug"
              defaultValue={company.slug}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="companyDescription">Description</Label>
            <Textarea
              id="companyDescription"
              name="description"
              defaultValue={company.description ?? ""}
              rows={5}
              className="resize-y leading-6"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="googleReviewUrl">Google review page link</Label>
            <Textarea
              id="googleReviewUrl"
              name="googleReviewUrl"
              defaultValue={company.googleReviewUrl ?? ""}
              placeholder="https://search.google.com/local/writereview?placeid=..."
              rows={4}
              className="resize-y break-all leading-6"
            />
          </div>
          <label className="flex items-center justify-between gap-4 border border-[#171714]/10 bg-[#f4f0e9] px-4 py-3 text-sm font-semibold">
            <span>Active review page</span>
            <input
              type="checkbox"
              name="isActive"
              defaultChecked={company.isActive}
              className="h-4 w-4 accent-[#1f6c63]"
            />
          </label>
          <Button
            type="submit"
            className="h-11 w-full bg-[#171714] text-white hover:bg-[#302c27]"
          >
            <Save className="h-4 w-4" />
            Save profile
          </Button>
        </form>
      </section>

      <section className="border border-[#171714]/10 bg-[#fbf9f5] p-6 shadow-[0_18px_54px_rgba(45,35,22,0.045)] sm:p-8">
        <div className="mb-7 flex items-start justify-between gap-4 border-b border-[#171714]/10 pb-6">
          <div className="min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--home-accent)]">
              Review experience
            </p>
            <h2 className="display-type mt-3 text-[40px] font-normal leading-none">
              Rating questions
            </h2>
            <p className="mt-2 text-sm text-[#73695e]">
              These questions shape the customer review experience.
            </p>
          </div>
          <span className="rounded-full bg-[#f1eadf] px-3 py-1 text-xs font-semibold text-[#73695e]">
            Up to 5
          </span>
        </div>
        <form action={replaceQuestionsAction} className="space-y-3">
          <input type="hidden" name="companyId" value={company.id} />
          <input type="hidden" name="slug" value={company.slug} />
          {[0, 1, 2, 3, 4].map((index) => (
            <div
              className="grid min-w-0 grid-cols-[28px_minmax(0,1fr)] items-center gap-3 border border-[#171714]/10 bg-[#f8f5ef] px-4 py-3"
              key={index}
            >
              <span className="text-sm font-semibold text-[#9b8e80]">
                {index + 1}
              </span>
              <Input
                id={`question-${index}`}
                name={`question-${index}`}
                defaultValue={company.questions[index]?.prompt ?? ""}
                placeholder="How would you rate your experience?"
                className="min-w-0 border-0 bg-transparent px-0 text-[14px] shadow-none focus-visible:ring-0"
              />
            </div>
          ))}
          <Button
            type="submit"
            className="mt-3 h-11 w-full bg-[#171714] text-white hover:bg-[#302c27]"
          >
            <Save className="h-4 w-4" />
            Save questions
          </Button>
        </form>
      </section>
    </div>
  );
}
