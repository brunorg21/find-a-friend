import { PrismaPetRepository } from "@/repositories/prisma/prisma-pet-repository";
import { FindUniquePetUseCase } from "../find-unique-pet";

export function makeFindUniquePetUseCase() {
  const petRepository = new PrismaPetRepository();

  const findUniquePetUseCase = new FindUniquePetUseCase(petRepository);

  return findUniquePetUseCase;
}
