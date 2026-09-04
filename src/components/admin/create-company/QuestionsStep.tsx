import { Check, Lock, Save, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircularLoader } from "@/components/admin/create-company/CircularLoader";

type QuestionsStepProps = {
  locked: boolean;
  canSubmit: boolean;
  isPending: boolean;
  state: {
    status: "idle" | "success" | "error";
    message: string;
  };
  companyId?: string;
  companyName?: string;
  companySlug?: string;
  questions: string[];
  onQuestionChange: (index: number, value: string) => void;
};

const placeholders = [
  "How satisfied were you with the quality of service?",
  "How would you rate the communication?",
  "Was the work delivered on time and as promised?",
  "How satisfied were you with the value for money?",
  "Would you recommend this company to others?",
];

export function QuestionsStep({
  locked,
  canSubmit,
  isPending,
  state,
  companyId,
  companyName,
  companySlug,
  questions,
  onQuestionChange,
}: QuestionsStepProps) {
  return (
    <section
      className={`border p-5 shadow-[0_20px_70px_rgba(44,34,22,0.07)] transition sm:p-7 ${
        locked
          ? "border-[#e4dccf] bg-[#f3eee6] opacity-65"
          : "border-[#ded6c8] bg-[#fbfaf6]"
      }`}
    >
      <div className="mb-7 flex flex-wrap items-start justify-between gap-4 border-b border-[#171714]/10 pb-6">
        <div className="min-w-0">
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8b7a66]">
            Step 02
          </p>
          <h2 className="display-type mt-3 text-[clamp(38px,4vw,54px)] font-normal leading-none">
            Rating questions
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-6 text-[#73695e]">
            Add five focused questions. These become the customer&apos;s rating
            path and shape the final review.
          </p>
        </div>
        {locked ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-[#8b7a66]">
            <Lock className="h-3.5 w-3.5" />
            Complete profile first
          </span>
        ) : (
          <span className="rounded-full bg-[#f1eadf] px-3 py-1.5 text-xs font-bold text-[#73695e]">
            5 required
          </span>
        )}
      </div>

      <input type="hidden" name="companyId" value={companyId ?? ""} />
      <input type="hidden" name="slug" value={companySlug ?? ""} />
      <input type="hidden" name="name" value={companyName ?? ""} />

      <fieldset className="space-y-3" disabled={locked || isPending}>
        {questions.map((question, index) => (
          <label
            key={index}
            className="grid grid-cols-[44px_minmax(0,1fr)] items-center gap-3 border border-[#e7ded1] bg-white/62 p-4 transition focus-within:border-[#b89363] focus-within:bg-white"
          >
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#f1eadf] text-xs font-bold text-[#8b7a66]">
              {index + 1}
            </span>
            <span className="min-w-0 space-y-2">
              <span className="flex gap-1 text-[#b89363]">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-3.5 w-3.5 fill-current" />
                ))}
              </span>
              <Input
                name={`question-${index}`}
                value={question}
                onChange={(event) => onQuestionChange(index, event.target.value)}
                placeholder={placeholders[index]}
                required
                className="h-9 border-0 bg-transparent px-0 text-[15px] font-semibold shadow-none focus-visible:ring-0"
              />
            </span>
          </label>
        ))}
      </fieldset>

      {state.status === "success" ? (
        <div className="mt-5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-900">
          {state.message}
        </div>
      ) : null}

      {state.status === "error" ? (
        <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
          {state.message}
        </div>
      ) : null}

      <Button
        type="submit"
        disabled={locked || !canSubmit || isPending}
        className="mt-6 h-12 rounded-full bg-[#171714] px-6 text-sm font-bold text-white hover:bg-[#302c27]"
      >
        {isPending ? (
          <>
            <CircularLoader />
            Saving questions
          </>
        ) : state.status === "success" ? (
          <>
            <Check className="h-4 w-4" />
            Questions saved
          </>
        ) : (
          <>
            <Save className="h-4 w-4" />
            Save review questions
          </>
        )}
      </Button>
    </section>
  );
}
