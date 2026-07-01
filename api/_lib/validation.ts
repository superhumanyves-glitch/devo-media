import { z } from "zod";

// Shared server-side validation for the lead endpoints. Kept in sync with the
// client-side schemas (src/components/ContactForm.tsx and
// src/contexts/AssessmentContext.tsx) so contact info is enforced end-to-end.

// Core contact fields required for any sale/follow-up to happen.
const contactFields = {
  name: z
    .string()
    .trim()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name may not exceed 100 characters" }),
  company: z
    .string()
    .trim()
    .min(1, { message: "Company name is required" })
    .max(100, { message: "Company name may not exceed 100 characters" }),
  email: z
    .string()
    .trim()
    .email({ message: "Invalid email address" })
    .max(255, { message: "Email may not exceed 255 characters" }),
  phone: z
    .string()
    .trim()
    .min(6, { message: "Phone number is required" })
    .max(20, { message: "Phone number may not exceed 20 characters" }),
};

export const contactEmailSchema = z.object({
  ...contactFields,
  workTypes: z.array(z.string()).min(1, { message: "Select at least one option" }),
  message: z
    .string()
    .trim()
    .min(1, { message: "Message is required" })
    .max(1000, { message: "Message may not exceed 1000 characters" }),
});

export const assessmentEmailSchema = z.object({
  ...contactFields,
  score: z.number(),
  segment: z.string(),
  answers: z.record(z.unknown()).optional().default({}),
  decodedAnswers: z.record(z.string()).optional().default({}),
  responses: z
    .array(z.object({ question: z.string(), answer: z.string() }))
    .optional()
    .default([]),
});

export type ContactEmailInput = z.infer<typeof contactEmailSchema>;
export type AssessmentEmailInput = z.infer<typeof assessmentEmailSchema>;

