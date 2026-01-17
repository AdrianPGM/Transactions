import { FastifyInstance } from "fastify";
import createTransactions from "../controllers/transactions/createTransactions.controller";
import { zodToJsonSchema } from "zod-to-json-schema";
import {
  createTransactionSchema,
  getTransactionsSchema,
} from "../schemas/trasactions.schemas";
import { getTransactions } from "../controllers/transactions/getTransactions.controller";

const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {
      body: zodToJsonSchema(createTransactionSchema),
    },
    handler: createTransactions,
  });

  fastify.route({
    method: "GET",
    url: "/",
    schema: {
      querystring: zodToJsonSchema(getTransactionsSchema),
    },
    handler: getTransactions,
  });
};

export default transactionsRoutes;
