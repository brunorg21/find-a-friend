import { PetNoExistError } from "@/use-cases/errors/pet-not-exist-error";
import { ResourceNotFound } from "@/use-cases/errors/resource-not-found";
import { makeFindManyPetsByCharacteristicsUseCase } from "@/use-cases/factories/makeFindManyPetsByCharacteristicsUseCase";
import { makeFindPetsByCityUseCase } from "@/use-cases/factories/makeFindPetByCityUseCase";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findPetsByCity(req: FastifyRequest, reply: FastifyReply) {
  const findPetsByCityQuerySchema = z.object({
    city: z.string(),
  });

  const { city } = findPetsByCityQuerySchema.parse(req.query);

  const findManyPetsByCityUseCase = makeFindPetsByCityUseCase();

  try {
    const { pet } = await findManyPetsByCityUseCase.execute(city);

    return reply.status(200).send({
      pet,
    });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(400).send({
        message: error.message,
      });
    }
  }
}
