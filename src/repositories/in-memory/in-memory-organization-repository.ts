import { Organization, Prisma } from "@prisma/client";
import { LoginProps, OrganizationRepository } from "../organization-repository";
import { randomUUID } from "crypto";

export class InMemoryOrganizationRepository implements OrganizationRepository {
  public items: Organization[] = [];

  async register(
    data: Prisma.OrganizationUncheckedCreateInput
  ): Promise<Organization> {
    const organization: Organization = {
      id: data.id ?? randomUUID(),
      street: data.street,
      city: data.city,
      email: data.email,
      number: data.number,
      password: data.password,
      phone: data.phone,
      responsible: data.responsible,
    };

    this.items.push(organization);

    return organization;
  }
  async login(data: LoginProps): Promise<Organization> {
    throw new Error("Method not implemented.");
  }

  async findPetsByQuery(city: string): Promise<Organization[]> {
    return this.items.filter(
      (organization) => organization.city.toLowerCase() === city.toLowerCase()
    );
  }

  async findByEmail(email: string): Promise<Organization | null> {
    const org = this.items.find((org) => org.email === email);

    if (!org) {
      return null;
    }

    return org;
  }
}
