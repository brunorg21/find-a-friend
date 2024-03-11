import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

export class FindUniquePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute(petId: string) {
    const pet = await this.petRepository.findUniquePet(petId);

    if (!pet) {
      throw new ResourceNotFound();
    }

    return {
      pet,
    };
  }
}
