import { makeCreatePetUseCase } from "@/use-cases/factories/makeCreatePetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function create(req: FastifyRequest, reply: FastifyReply) {
  const createPetRequestSchema = z.object({
    name: z.string(),
    about: z.string().max(70),
  });

  const { about, name } = createPetRequestSchema.parse(req.body);

  const createPetUseCase = makeCreatePetUseCase();

  await createPetUseCase.execute({
    about,
    name,
    organizationId: req.user.sub,
  });

  return reply.status(201).send();
}
