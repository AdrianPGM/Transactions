import { type FastifyInstance } from "fastify";
import categoryRoutes from "./category.routes";
import transactionsRoutes from "./transactions.routes";

async function routes(Fastify: FastifyInstance): Promise<void> {
  Fastify.get("/health", async () => {
    return { status: "ok", message: "Server is running healthy" };
  });

  Fastify.register(transactionsRoutes, { prefix: "/transaction" });
  Fastify.register(categoryRoutes, { prefix: "/categories" });
}

export default routes;
