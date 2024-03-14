import { PetNoExistError } from "./errors/pet-not-exist-error";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { ResourceNotFound } from "./errors/resource-not-found";

export class GetOrganizationProfileUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(orgId: string) {
    const organization = await this.organizationRepository.findById(orgId);

    if (!organization) {
      throw new ResourceNotFound();
    }

    return {
      ...organization,
      password: undefined,
    };
  }
}
