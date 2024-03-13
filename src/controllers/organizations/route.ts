import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/authenticate", authenticate);
}
