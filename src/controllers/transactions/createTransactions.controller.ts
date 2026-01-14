import { FastifyReply, FastifyRequest } from "fastify";

const createTransactions = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<void> => {
  const userId = "AD5261GG";

  if (!userId) {
    reply.status(401).send({ message: "Unauthorized" });
  }
};

export default createTransactions;
