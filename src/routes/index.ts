import type { FastifyInstance } from "fastify";

async function routes(Fastify: FastifyInstance): Promise<void> {
  Fastify.get("/health", async () => {
    return { status: "ok", message: "Server is running healthy" };
  });
}

export default routes;
