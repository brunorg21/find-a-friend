import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { PetNoExistError } from "./errors/pet-not-exist-error";

export class findManyPetsByCharacteristics {
  constructor(private petRepository: PetRepository) {}

  async execute(q: string, city: string) {
    const pet = await this.petRepository.findManyPetsByCharacteristics({
      city,
      query: q,
    });

    if (pet.length === 0) {
      throw new PetNoExistError();
    }

    return {
      pet,
    };
  }
}
