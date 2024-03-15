import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { FindManyPetsByCharacteristics } from "../find-many-pets-by-characteristics";

export function makeFindManyPetsByCharacteristicsUseCase() {
  const petRepository = new PrismaPetRepository();

  const findManyPetsByCharacteristicsUseCase =
    new FindManyPetsByCharacteristics(petRepository);

  return findManyPetsByCharacteristicsUseCase;
}
