"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { ArrowLeft } from "lucide-react";
import { createCompanyAction } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { slugify } from "@/lib/utils";
import { BasicsStep } from "@/components/admin/create-company/BasicsStep";
import { CompanyCreatedModal } from "@/components/admin/create-company/CompanyCreatedModal";

export function CreateCompanyFlow() {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [googleReviewUrl, setGoogleReviewUrl] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [createError, setCreateError] = useState("");
  const [createdCompany, setCreatedCompany] = useState<{
    name: string;
    slug: string;
  } | null>(null);
  const [isCreating, startCreating] = useTransition();

  const suggestedSlug = useMemo(() => slugify(name), [name]);
  const resolvedSlug = slug || suggestedSlug;
  const companyCreated = Boolean(createdCompany);
  const basicsComplete = Boolean(
    name.trim() && description.trim() && googleReviewUrl.trim(),
  );

  function submitCompany(formData: FormData) {
    const companyName = name.trim();
    const companySlug = resolvedSlug;

    setCreateError("");
    startCreating(async () => {
      try {
        await createCompanyAction(formData);
        setCreatedCompany({ name: companyName, slug: companySlug });
        setSuccessModalOpen(true);
      } catch (error) {
        setCreateError(
          error instanceof Error
            ? error.message
            : "Could not add the company. Please check the details and try again.",
        );
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

      <form action={submitCompany} className="mb-5">
        <BasicsStep
          name={name}
          slug={slug}
          description={description}
          googleReviewUrl={googleReviewUrl}
          isActive={isActive}
          suggestedSlug={suggestedSlug}
          onNameChange={setName}
          onSlugChange={setSlug}
          onDescriptionChange={setDescription}
          onGoogleReviewUrlChange={setGoogleReviewUrl}
          onIsActiveChange={setIsActive}
          canSubmit={basicsComplete}
          isPending={isCreating}
          completed={companyCreated}
        />
      </form>

      {createError ? (
        <div className="mb-5 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900">
          {createError}
        </div>
      ) : null}

      <CompanyCreatedModal
        company={createdCompany}
        open={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
      />
    </div>
  );
}
