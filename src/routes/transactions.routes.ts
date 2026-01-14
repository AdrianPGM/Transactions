import { FastifyInstance } from "fastify";
import createTransactions from "../controllers/transactions/createTransactions.controller";

const transactionsRoutes = async (fastify: FastifyInstance): Promise<void> => {
  fastify.route({
    method: "POST",
    url: "/",
    schema: {},
    handler: createTransactions,
  });
};

export default transactionsRoutes;
