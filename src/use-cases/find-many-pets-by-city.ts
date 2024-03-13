import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { OrganizationRepository } from "@/repositories/organization-repository";

export class FindManyPetsByCity {
  constructor(
    private petRepository: PetRepository,
    private organizationRepository: OrganizationRepository
  ) {}

  async execute(city: string) {
    const organizations = await this.organizationRepository.findPetsByCity(
      city
    );

    if (!organizations) {
      throw new ResourceNotFound();
    }

    const pet = await this.petRepository.findManyPetsByOrgs(organizations);

    return {
      pet,
    };
  }
}
