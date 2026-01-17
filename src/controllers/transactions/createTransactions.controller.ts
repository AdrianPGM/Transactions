import { FastifyReply, FastifyRequest } from "fastify";
import {
  CreateTransactionBody,
  createTransactionSchema,
} from "../../schemas/trasactions.schemas";
import prisma from "../../config/prisma";

const createTransactions = async (
  request: FastifyRequest<{ Body: CreateTransactionBody }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "AD5261GG";

  if (!userId) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const result = createTransactionSchema.safeParse(request.body);

  if (!result.success) {
    return reply.status(400).send(result.error || "Validation Error");
  }

  const transaction = result.data;

  try {
    const category = await prisma.category.findFirst({
      where: {
        id: transaction.categoryId,
        type: transaction.type,
      },
    });

    if (!category) {
      return reply.status(400).send({ message: "Category not found" });
    }

    const parsedDate = new Date(transaction.date);

    const newTransaction = await prisma.transaction.create({
      data: {
        ...transaction,
        userId,
        date: parsedDate,
      },
      include: {
        category: true,
      },
    });

    reply.status(201).send(newTransaction);
  } catch (err) {
    request.log.error(err);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};

export default createTransactions;
