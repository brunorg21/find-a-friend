import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { PetNoExistError } from "./errors/pet-not-exist-error";

export class FindUniquePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(petId: string) {
    const pet = await this.petRepository.findUniquePet(petId);

    if (!pet) {
      throw new PetNoExistError();
    }

    return {
      pet,
    };
  }
}
