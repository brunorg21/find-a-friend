import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { register } from "./register";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/authenticate", authenticate);
  app.post("/register", register);
}
