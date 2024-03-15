import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { RegisterOrgUseCase } from "../register-org";
import { SendMessageToOrgUseCase } from "../send-message-to-org";

export function makeSendMessageToOrgUseCase() {
  const organizationRepository = new PrismaOrganizationRepository();

  const sendMessageToOrgUseCase = new SendMessageToOrgUseCase(
    organizationRepository
  );

  return sendMessageToOrgUseCase;
}
