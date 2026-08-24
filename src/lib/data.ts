import { asc, desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db} from "@/db";
import { companies, questions, reviews } from "@/db/schema";
import { clampRating, slugify } from "@/lib/utils";
import type {
  Company,
  CompanyWithDetails,
  CompanyWithQuestions,
  Review,
  ReviewAnswer
} from "@/lib/types";

const demoCompanyId = "00000000-0000-4000-8000-000000000001";

let demoCompanies: CompanyWithDetails[] = [
  {
    id: demoCompanyId,
    name: "Acme Dental Studio",
    slug: "acme-dental-studio",
    description: "A sample company so the review flow works before you connect Postgres.",
    googleReviewUrl: "https://www.google.com/search?q=Acme+Dental+Studio+reviews",
    isActive: true,
    questions: [
      {
        id: "00000000-0000-4000-8000-000000000101",
        companyId: demoCompanyId,
        prompt: "How satisfied were you with the overall service?",
        orderIndex: 0
      },
      {
        id: "00000000-0000-4000-8000-000000000102",
        companyId: demoCompanyId,
        prompt: "How would you rate the staff communication?",
        orderIndex: 1
      },
      {
        id: "00000000-0000-4000-8000-000000000103",
        companyId: demoCompanyId,
        prompt: "How likely are you to recommend us?",
        orderIndex: 2
      }
    ],
    reviews: []
  }
];

function normalizeQuestions(prompts: string[]) {
  return prompts
    .map((prompt) => prompt.trim())
    .filter(Boolean)
    .slice(0, 5);
}

function normalizeReviewRows(rows: Review[]) {
  return rows.map((review) => ({
    ...review,
    createdAt: new Date(review.createdAt)
  }));
}

export async function listCompanies(): Promise<Company[]> {

  if (!db) {
    return demoCompanies.map(({ questions: _questions, reviews: _reviews, ...company }) => company);
  }

  return db.query.companies.findMany({
    orderBy: [desc(companies.createdAt)]
  });
}

export async function listCompaniesWithDetails(): Promise<CompanyWithDetails[]> {
 
  if (!db) {
    return demoCompanies;
  }

  return db.query.companies.findMany({
    with: {
      questions: {
        orderBy: [asc(questions.orderIndex)]
      },
      reviews: {
        orderBy: [desc(reviews.createdAt)]
      }
    },
    orderBy: [desc(companies.createdAt)]
  });
}

export async function getCompanyBySlug(slug: string): Promise<CompanyWithQuestions | null> {
 
  if (!db) {
    const company = demoCompanies.find((item) => item.slug === slug && item.isActive);
    if (!company) {
      return null;
    }

    return {
      ...company,
      questions: company.questions.sort((a, b) => a.orderIndex - b.orderIndex)
    };
  }

  return (
    (await db.query.companies.findFirst({
      where: eq(companies.slug, slug),
      with: {
        questions: {
          orderBy: [asc(questions.orderIndex)]
        }
      }
    })) ?? null
  );
}

export async function getCompanyDetailsBySlug(slug: string): Promise<CompanyWithDetails | null> {
 
  if (!db) {
    return demoCompanies.find((item) => item.slug === slug) ?? null;
  }

  return (
    (await db.query.companies.findFirst({
      where: eq(companies.slug, slug),
      with: {
        questions: {
          orderBy: [asc(questions.orderIndex)]
        },
        reviews: {
          orderBy: [desc(reviews.createdAt)]
        }
      }
    })) ?? null
  );
}

export async function createCompany(input: {
  name: string;
  slug?: string;
  description?: string;
  googleReviewUrl?: string;
  isActive?: boolean;
}) {
  const name = input.name.trim();
  const slug = slugify(input.slug || input.name);

  if (!name || !slug) {
    throw new Error("Company name and slug are required.");
  }

 
  if (!db) {
    demoCompanies = [
      {
        id: crypto.randomUUID(),
        name,
        slug,
        description: input.description?.trim() || null,
        googleReviewUrl: input.googleReviewUrl?.trim() || null,
        isActive: input.isActive ?? true,
        questions: [],
        reviews: []
      },
      ...demoCompanies
    ];
    return;
  }

  await db.insert(companies).values({
    name,
    slug,
    description: input.description?.trim() || null,
    googleReviewUrl: input.googleReviewUrl?.trim() || null,
    isActive: input.isActive ?? true
  });
}

export async function updateCompany(input: {
  id: string;
  name: string;
  slug: string;
  description?: string;
  googleReviewUrl?: string;
  isActive?: boolean;
}) {
   const updates = {
    name: input.name.trim(),
    slug: slugify(input.slug),
    description: input.description?.trim() || null,
    googleReviewUrl: input.googleReviewUrl?.trim() || null,
    isActive: input.isActive ?? false,
    updatedAt: new Date()
  };

  if (!updates.name || !updates.slug) {
    throw new Error("Company name and slug are required.");
  }

  if (!db) {
    demoCompanies = demoCompanies.map((company) =>
      company.id === input.id ? { ...company, ...updates } : company
    );
    return;
  }

  await db.update(companies).set(updates).where(eq(companies.id, input.id));
}

export async function deleteCompany(id: string) {
 
  if (!db) {
    demoCompanies = demoCompanies.filter((company) => company.id !== id);
    return;
  }

  await db.delete(companies).where(eq(companies.id, id));
}

export async function replaceCompanyQuestions(companyId: string, prompts: string[]) {
  const cleanPrompts = normalizeQuestions(prompts);
 
  if (!db) {
    demoCompanies = demoCompanies.map((company) =>
      company.id === companyId
        ? {
            ...company,
            questions: cleanPrompts.map((prompt, index) => ({
              id: crypto.randomUUID(),
              companyId,
              prompt,
              orderIndex: index
            }))
          }
        : company
    );
    return;
  }

  await db.transaction(async (tx) => {
    await tx.delete(questions).where(eq(questions.companyId, companyId));

    if (cleanPrompts.length) {
      await tx.insert(questions).values(
        cleanPrompts.map((prompt, orderIndex) => ({
          companyId,
          prompt,
          orderIndex
        }))
      );
    }
  });
}

export async function saveReview(input: {
  companyId: string;
  reviewerName?: string;
  reviewerEmail?: string;
  generatedReview: string;
  questionAnswers: ReviewAnswer[];
}) {
  const rating =
    input.questionAnswers.reduce((sum, answer) => sum + clampRating(answer.rating), 0) /
    Math.max(input.questionAnswers.length, 1);
  const normalizedRating = clampRating(rating);
 
  if (!input.generatedReview.trim() || input.questionAnswers.length === 0) {
    throw new Error("A generated review and at least one answer are required.");
  }

  if (!db) {
    demoCompanies = demoCompanies.map((company) =>
      company.id === input.companyId
        ? {
            ...company,
            reviews: [
              {
                id: crypto.randomUUID(),
                companyId: input.companyId,
                reviewerName: input.reviewerName?.trim() || null,
                reviewerEmail: input.reviewerEmail?.trim() || null,
                generatedReview: input.generatedReview.trim(),
                questionAnswers: input.questionAnswers,
                rating: normalizedRating,
                createdAt: new Date()
              },
              ...company.reviews
            ]
          }
        : company
    );
    return;
  }

  await db.insert(reviews).values({
    companyId: input.companyId,
    reviewerName: input.reviewerName?.trim() || null,
    reviewerEmail: input.reviewerEmail?.trim() || null,
    generatedReview: input.generatedReview.trim(),
    questionAnswers: input.questionAnswers,
    rating: normalizedRating
  });
}

// export function databaseStatusLabel() {
//   return hasDatabaseUrl() ? "Connected to DATABASE_URL" : "Demo mode: add DATABASE_URL to persist data";
// }

export function revalidateCompanyPaths(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  if (slug) {
    revalidatePath(`/${slug}`);
    revalidatePath(`/${slug}/admin`);
  }
}
