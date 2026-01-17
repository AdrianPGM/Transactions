import { FastifyReply, FastifyRequest } from "fastify";
import { GetTransactionsQuery } from "../../schemas/trasactions.schemas";
import { TransactionFilters } from "../../types/transactions.types";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import prisma from "../../config/prisma";
dayjs.extend(utc);

export const getTransactions = async (
  request: FastifyRequest<{ Querystring: GetTransactionsQuery }>,
  reply: FastifyReply,
): Promise<void> => {
  const userId = "AD5261GG";

  if (!userId) {
    return reply.status(401).send({ message: "Unauthorized" });
  }

  const { month, year, categoryId, type } = request.query;

  const filters: TransactionFilters = { userId };

  if (month && year) {
    const startDate = dayjs
      .utc(`${year}-${month}-01`)
      .startOf("month")
      .toDate();
    const endDate = dayjs.utc(startDate).endOf("month").toDate();

    filters.date = { gte: startDate, lte: endDate };
  }

  if (type) {
    filters.type = type;
  }

  if (categoryId) {
    filters.categoryId = categoryId;
  }

  try {
    const transactions = await prisma.transaction.findMany({
      where: filters,
      orderBy: { date: "desc" },
      include: {
        category: {
          select: {
            color: true,
            name: true,
            type: true,
          },
        },
      },
    });

    reply.send({ transactions });
  } catch (error) {
    request.log.error(`error: ${error}`);
    reply.status(500).send({ error: "Internal Server Error" });
  }
};
