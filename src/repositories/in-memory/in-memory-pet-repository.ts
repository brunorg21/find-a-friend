import { Organization, Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";
import { InMemoryOrganizationRepository } from "./in-memory-organization-repository";

export interface FindManyPetsByCharacteristicsProps {
  query: string;
  city: string;
}

export class InMemoryPetRepository implements PetRepository {
  constructor(private orgsRepository?: InMemoryOrganizationRepository) {}

  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      about: data.about ?? null,
      name: data.name,
      organizationId: data.organizationId,
    };

    this.items.push(pet);

    return pet;
  }

  async findManyPetsByOrgs(organizations: Organization[]): Promise<Pet[]> {
    const orgs = organizations.map((org) => org.id);

    return this.items.filter((pet) => orgs.includes(pet.organizationId));
  }

  async findManyPetsByCharacteristics({
    city,
    query,
  }: FindManyPetsByCharacteristicsProps): Promise<Pet[]> {
    const orgsByCity = this.orgsRepository?.items.filter(
      (org) => org.city === city
    );

    return this.items
      .filter((pet) => orgsByCity?.some((org) => org.id === pet.organizationId))
      .filter((pet) => pet.about?.toLowerCase().includes(query.toLowerCase()));
  }
  async findUniquePet(petId: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === petId);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
