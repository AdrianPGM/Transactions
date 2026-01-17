import { z } from "zod";
import { ObjectId } from "mongodb";

const isValidBojectId = (id: string): boolean => ObjectId.isValid(id);
export const createTransactionSchema = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  description: z.string().min(1, "Description cannot be empty"),
  date: z.coerce.date({
    error: "Invalid date format",
  }),
  categoryId: z.string().refine(isValidBojectId, {
    message: "Invalid CategoryId format",
  }),
  type: z.enum(["INCOME", "EXPENSE"], {
    error: "Type must be either INCOME or EXPENSE",
  }),
});

export const getTransactionsSchema = z.object({
  month: z.string().optional(),
  year: z.string().optional(),
  categoryId: z
    .string()
    .refine(isValidBojectId, {
      message: "Invalid CategoryId format",
    })
    .optional(),
  type: z
    .enum(["INCOME", "EXPENSE"], {
      error: "Type must be either INCOME or EXPENSE",
    })
    .optional(),
});

export type GetTransactionsQuery = z.infer<typeof getTransactionsSchema>;

export type CreateTransactionBody = z.infer<typeof createTransactionSchema>;
