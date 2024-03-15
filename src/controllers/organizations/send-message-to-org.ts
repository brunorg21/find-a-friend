import { makeSendMessageToOrgUseCase } from "@/use-cases/factories/makeSendMessageToOrgUseCase";
import { FastifyReply, FastifyRequest } from "fastify";

export async function sendMessageToOrg(
  req: FastifyRequest,
  reply: FastifyReply
) {
  const sendMessageToOrgUseCase = makeSendMessageToOrgUseCase();

  const url = await sendMessageToOrgUseCase.execute(req.user.sub);

  return reply.status(200).send({
    url,
  });
}
