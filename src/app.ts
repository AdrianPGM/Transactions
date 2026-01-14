import fastify from "fastify";
import type { FastifyInstance } from "fastify";
import routes from "./routes/index";

const app: FastifyInstance = fastify({ logger: true });
app.register(routes, { prefix: "/api" });
export default app;
