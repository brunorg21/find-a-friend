import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { PetNoExistError } from "./errors/pet-not-exist-error";

export class FindManyPetsByCity {
  constructor(
    private petRepository: PetRepository,
    private organizationRepository: OrganizationRepository
  ) {}

  async execute(city: string) {
    const organizations = await this.organizationRepository.findPetsByQuery(
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
