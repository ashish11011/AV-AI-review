import { relations } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    googleReviewUrl: text("google_review_url"),
    isActive: boolean("is_active").notNull().default(true),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow()
  },
  (table) => ({
    slugIdx: uniqueIndex("companies_slug_unique").on(table.slug)
  })
);

export const questions = pgTable("questions", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  prompt: text("prompt").notNull(),
  orderIndex: integer("order_index").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const reviews = pgTable("reviews", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  reviewerName: varchar("reviewer_name", { length: 140 }),
  reviewerEmail: varchar("reviewer_email", { length: 180 }),
  rating: integer("rating").notNull(),
  generatedReview: text("generated_review").notNull(),
  questionAnswers: jsonb("question_answers")
    .$type<Array<{ questionId: string; prompt: string; rating: number }>>()
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow()
});

export const companyRelations = relations(companies, ({ many }) => ({
  questions: many(questions),
  reviews: many(reviews)
}));

export const questionRelations = relations(questions, ({ one }) => ({
  company: one(companies, {
    fields: [questions.companyId],
    references: [companies.id]
  })
}));

export const reviewRelations = relations(reviews, ({ one }) => ({
  company: one(companies, {
    fields: [reviews.companyId],
    references: [companies.id]
  })
}));
