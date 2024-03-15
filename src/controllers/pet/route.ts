import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/middlewares/verify-token";

export async function petRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/pet", create);
}
