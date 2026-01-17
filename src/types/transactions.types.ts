import { TransactionType } from "@prisma/client";

export interface TransactionFilters {
  userId: string;
  date?: {
    gte: Date;
    lte: Date;
  };
  type?: TransactionType;
  categoryId?: string;
}
