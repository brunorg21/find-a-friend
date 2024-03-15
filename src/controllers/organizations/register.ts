import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { OrgAlreadyExistsError } from "@/use-cases/errors/org-already-exists-error";
import { makeRegisterUseCase } from "@/use-cases/factories/makeRegisterUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function register(req: FastifyRequest, reply: FastifyReply) {
  const registerRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
    phone: z.string(),
    number: z.number(),
    street: z.string(),
    city: z.string(),
    responsible: z.string(),
  });

  const { email, password, city, number, phone, responsible, street } =
    registerRequestSchema.parse(req.body);

  const registerUseCase = makeRegisterUseCase();

  try {
    await registerUseCase.execute({
      email,
      password,
      city,
      number,
      phone,
      responsible,
      street,
    });

    return reply.status(201).send();
  } catch (error) {
    if (error instanceof OrgAlreadyExistsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
}
