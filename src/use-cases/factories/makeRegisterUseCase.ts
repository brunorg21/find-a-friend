import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { RegisterOrgUseCase } from "../register-org";

export function makeRegisterUseCase() {
  const organizationRepository = new PrismaOrganizationRepository();

  const registerOrgUseCase = new RegisterOrgUseCase(organizationRepository);

  return registerOrgUseCase;
}
