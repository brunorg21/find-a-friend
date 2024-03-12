import { ResourceNotFound } from "./errors/resource-not-found";

import { OrganizationRepository } from "@/repositories/organization-repository";

export class SendMessageToOrgUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute(orgId: string) {
    const organization = await this.organizationRepository.findById(orgId);

    if (!organization) {
      throw new ResourceNotFound();
    }

    const wpURL = `wa.me/55${organization.phone}`;

    return wpURL;
  }
}
