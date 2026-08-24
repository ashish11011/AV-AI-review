export type Question = {
  id: string;
  companyId: string;
  prompt: string;
  orderIndex: number;
  createdAt?: Date;
};

export type ReviewAnswer = {
  questionId: string;
  prompt: string;
  rating: number;
};

export type Review = {
  id: string;
  companyId: string;
  reviewerName: string | null;
  reviewerEmail: string | null;
  rating: number;
  generatedReview: string;
  questionAnswers: ReviewAnswer[];
  createdAt: Date;
};

export type Company = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  googleReviewUrl: string | null;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export type CompanyWithQuestions = Company & {
  questions: Question[];
};

export type CompanyWithDetails = Company & {
  questions: Question[];
  reviews: Review[];
};
