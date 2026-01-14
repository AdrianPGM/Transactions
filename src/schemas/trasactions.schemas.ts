import { z } from "zod";
import { ObjectId } from "mongodb";

const isValidBojectId = (id: string): boolean => ObjectId.isValid(id);
export const createTransaction = z.object({
  amount: z.number().positive("Amount must be a positive number"),
  description: z.string().min(1, "Description cannot be empty"),
  date: z.coerce.date({
    error: "Invalid date format",
  }),
  CategoryId: z.string().refine(isValidBojectId, {
    message: "Invalid CategoryId format",
  }),
  type: z.enum(["TransactionType.INCOME", "TransactionType.EXPENSE"], {
    error: "Type must be either INCOME or EXPENSE",
  }),
});
