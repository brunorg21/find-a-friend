import { PetRepository } from "@/repositories/pet-repository";
import { Pet } from "@prisma/client";
import { randomUUID } from "crypto";

interface CreatePetRequest {
  name: string;
  organizationId: string;
  about: string;
}

export class CreatePetUseCase {
  constructor(private petRepository: PetRepository) {}

  async execute({ about, name, organizationId }: CreatePetRequest) {
    const pet = await this.petRepository.create({
      name,
      organizationId,
      about,
    });

    return {
      pet,
    };
  }
}
