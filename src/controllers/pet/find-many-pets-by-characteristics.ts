import { PetNoExistError } from "@/use-cases/errors/pet-not-exist-error";
import { makeFindManyPetsByCharacteristicsUseCase } from "@/use-cases/factories/makeFindManyPetsByCharacteristicsUseCase";

import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function findManyPetsByCharacteristics(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const findManyPetsByCharacteristicsQuerySchema = z.object({
    city: z.string(),
    q: z.string(),
  });

  const { city, q } = findManyPetsByCharacteristicsQuerySchema.parse(req.query);

  const findManyPetsByCharacteristicsUseCase =
    makeFindManyPetsByCharacteristicsUseCase();

  try {
    const { pet } = await findManyPetsByCharacteristicsUseCase.execute(q, city);

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
