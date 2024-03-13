import { InvalidCredentialsError } from "@/use-cases/errors/invalid-credentials-error";
import { makeAuthenticateUseCase } from "@/use-cases/factories/makeAuthenticateUseCase";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function authenticate(req: FastifyRequest, reply: FastifyReply) {
  const authenticateRequestSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  });

  const { email, password } = authenticateRequestSchema.parse(req.body);

  const authenticateUseCase = makeAuthenticateUseCase();

  try {
    const { organization } = await authenticateUseCase.execute({
      email,
      password,
    });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: organization.id,
        },
      }
    );

    return reply.status(200).send({
      token,
    });
  } catch (error) {
    if (error instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: error.message,
      });
    }

    throw error;
  }
}
