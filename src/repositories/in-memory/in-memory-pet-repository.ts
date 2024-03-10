import { Organization, Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";

export class InMemoryPetRepository implements PetRepository {
  public items: Pet[] = [];

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet: Pet = {
      id: data.id ?? randomUUID(),
      about: data.about ?? null,
      name: data.name,
      organizationId: data.organizationId!,
    };

    this.items.push(pet);

    return pet;
  }

  async findManyByOrgs(organizations: Organization[]): Promise<Pet[]> {
    const orgs = organizations.map((org) => org.id);

    return this.items.filter((pet) => orgs.includes(pet.organizationId));
  }

  async listByCharacteristics(q: string): Promise<Pet[]> {
    return this.items.filter((pet) => pet.about?.includes(q));
  }
  async findUniquePet(petId: string): Promise<Pet | null> {
    const pet = this.items.find((pet) => pet.id === petId);

    if (!pet) {
      return null;
    }

    return pet;
  }
}
