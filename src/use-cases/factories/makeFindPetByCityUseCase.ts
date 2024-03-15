import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { FindManyPetsByCity } from "../find-many-pets-by-city";
import { PrismaOrganizationRepository } from "@/repositories/prisma/prisma-organization-repository";

export function makeFindPetsByCityUseCase() {
  const petRepository = new PrismaPetRepository();
  const organizationRepository = new PrismaOrganizationRepository();

  const findPetsByCityUseCase = new FindManyPetsByCity(
    petRepository,
    organizationRepository
  );

  return findPetsByCityUseCase;
}
