import { FastifyInstance } from "fastify";
import { create } from "./create";
import { verifyJwt } from "@/middlewares/verify-token";
import { findUniquePet } from "./find-unique-pet";
import { findManyPetsByCharacteristics } from "./find-many-pets-by-characteristics";

export async function petRoutes(app: FastifyInstance) {
  app.addHook("onRequest", verifyJwt);

  app.post("/pet", create);
  app.get("/pet/:petId", findUniquePet);
  app.get("/pet", findManyPetsByCharacteristics);
}
