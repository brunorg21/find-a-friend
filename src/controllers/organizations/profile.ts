import { ResourceNotFound } from "@/use-cases/errors/resource-not-found";
import { makeGetOrganizationProfileUseCase } from "@/use-cases/factories/makeGetOrganizationProfileUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const getOrganizationProfileUseCase = makeGetOrganizationProfileUseCase();

  try {
    const organization = await getOrganizationProfileUseCase.execute(
      req.user.sub
    );

    return reply.status(200).send({
      organization,
    });
  } catch (error) {
    if (error instanceof ResourceNotFound) {
      return reply.status(401).send({
        message: error.message,
      });
    }
  }
}
