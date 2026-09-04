"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { replaceQuestionsAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import type { CompanyWithDetails } from "@/lib/types";
import { QuestionsStep } from "@/components/admin/create-company/QuestionsStep";

type QuestionsSetupFlowProps = {
  company: CompanyWithDetails;
};

export function QuestionsSetupFlow({ company }: QuestionsSetupFlowProps) {
  const [state, setState] = useState<{
    status: "idle" | "success" | "error";
    message: string;
  }>({ status: "idle", message: "" });
  const [isPending, startSaving] = useTransition();
  const [questions, setQuestions] = useState(() => {
    const existing = [...company.questions]
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .map((question) => question.prompt);

    return [...existing, "", "", "", "", ""].slice(0, 5);
  });

  const questionsComplete = useMemo(
    () => questions.every((question) => Boolean(question.trim())),
    [questions],
  );
  function updateQuestion(index: number, value: string) {
    setQuestions((current) =>
      current.map((question, questionIndex) =>
        questionIndex === index ? value : question,
      ),
    );
  }
  function submitQuestions(formData: FormData) {
    setState({ status: "idle", message: "" });
    startSaving(async () => {
      try {
        await replaceQuestionsAction(formData);
        setState({
          status: "success",
          message: "Review questions were saved successfully.",
        });
      } catch (error) {
        setState({
          status: "error",
          message:
            error instanceof Error
              ? error.message
              : "Could not save the questions. Please check them and try again.",
        });
      }
    });
  }

  return (
    <div className="mx-auto max-w-[1040px]">
      <Button asChild variant="ghost" className="-ml-3 mb-6 rounded-full text-[#73695e]">
        <Link href="/admin">
          <ArrowLeft className="h-4 w-4" />
          Companies
        </Link>
      </Button>

      <form action={submitQuestions}>
        <QuestionsStep
          locked={false}
          canSubmit={questionsComplete}
          isPending={isPending}
          state={state}
          companyId={company.id}
          companyName={company.name}
          companySlug={company.slug}
          questions={questions}
          onQuestionChange={updateQuestion}
        />
      </form>
    </div>
  );
}
