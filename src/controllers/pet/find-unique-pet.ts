import { PetNoExistError } from "@/use-cases/errors/pet-not-exist-error";
import { makeFindUniquePetUseCase } from "@/use-cases/factories/makeFindUniquePetUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findUniquePet(req: FastifyRequest, reply: FastifyReply) {
  const findUniquePetParamsSchema = z.object({
    petId: z.string(),
  });

  const { petId } = findUniquePetParamsSchema.parse(req.params);

  const findUniquePetUseCase = makeFindUniquePetUseCase();

  try {
    const { pet } = await findUniquePetUseCase.execute(petId);

    return reply.status(200).send({
      pet,
    });
  } catch (error) {
    if (error instanceof PetNoExistError) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}
