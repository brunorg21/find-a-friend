import { FastifyInstance } from "fastify";
import { authenticate } from "./authenticate";
import { register } from "./register";
import { profile } from "./profile";
import { verifyJwt } from "@/middlewares/verify-token";
import { sendMessageToOrg } from "./send-message-to-org";

export async function organizationRoutes(app: FastifyInstance) {
  app.post("/authenticate", authenticate);
  app.post("/register", register);

  app.get(
    "/me",
    {
      onRequest: verifyJwt,
    },
    profile
  );
  app.get(
    "/message",
    {
      onRequest: verifyJwt,
    },
    sendMessageToOrg
  );
}
