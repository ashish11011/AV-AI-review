"use server";

import { redirect } from "next/navigation";
import {
  createCompany,
  deleteCompany,
  replaceCompanyQuestions,
  revalidateCompanyPaths,
  saveReview,
  updateCompany
} from "@/lib/data";
import type { ReviewAnswer } from "@/lib/types";

function booleanFromForm(value: FormDataEntryValue | null) {
  return value === "on" || value === "true";
}

export async function createCompanyAction(formData: FormData) {
  await createCompany({
    name: String(formData.get("name") ?? ""),
    slug: String(formData.get("slug") ?? ""),
    description: String(formData.get("description") ?? ""),
    googleReviewUrl: String(formData.get("googleReviewUrl") ?? ""),
    isActive: booleanFromForm(formData.get("isActive"))
  });

  revalidateCompanyPaths();
}

export async function updateCompanyAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");

  await updateCompany({
    id: String(formData.get("id") ?? ""),
    name: String(formData.get("name") ?? ""),
    slug,
    description: String(formData.get("description") ?? ""),
    googleReviewUrl: String(formData.get("googleReviewUrl") ?? ""),
    isActive: booleanFromForm(formData.get("isActive"))
  });

  revalidateCompanyPaths(slug);
}

export async function deleteCompanyAction(formData: FormData) {
  await deleteCompany(String(formData.get("id") ?? ""));
  revalidateCompanyPaths();
}

export async function replaceQuestionsAction(formData: FormData) {
  const slug = String(formData.get("slug") ?? "");
  const prompts = [0, 1, 2, 3, 4].map((index) =>
    String(formData.get(`question-${index}`) ?? "")
  );

  await replaceCompanyQuestions(String(formData.get("companyId") ?? ""), prompts);
  revalidateCompanyPaths(slug);
}

export async function saveReviewAction(formData: FormData) {
  const companySlug = String(formData.get("companySlug") ?? "");
  const questionAnswers = JSON.parse(
    String(formData.get("questionAnswers") ?? "[]")
  ) as ReviewAnswer[];

  await saveReview({
    companyId: String(formData.get("companyId") ?? ""),
    reviewerName: String(formData.get("reviewerName") ?? ""),
    reviewerEmail: String(formData.get("reviewerEmail") ?? ""),
    generatedReview: String(formData.get("generatedReview") ?? ""),
    questionAnswers
  });

  revalidateCompanyPaths(companySlug);
  redirect(`/${companySlug}?saved=1`);
}
