import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";
import { GetOrganizationProfileUseCase } from "../get-organization-profile";

export function makeGetOrganizationProfileUseCase() {
  const organizationRepository = new PrismaOrganizationRepository();

  const getOrganizationProfile = new GetOrganizationProfileUseCase(
    organizationRepository
  );

  return getOrganizationProfile;
}
