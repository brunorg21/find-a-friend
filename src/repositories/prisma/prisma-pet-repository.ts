import { Organization, Pet, Prisma } from "@prisma/client";
import { PetRepository } from "../pet-repository";
import { randomUUID } from "crypto";
import { PrismaOrganizationRepository } from "./prisma-organization-repository";
import { prisma } from "@/lib/prisma";

export interface FindManyPetsByCharacteristicsProps {
  query: string;
  city: string;
}

export class PrismaPetRepository implements PetRepository {
  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    });

    return pet;
  }

  async findManyPetsByOrgs(
    organizations: Organization[]
  ): Promise<Pet[] | null> {
    const orgs = organizations.map((org) => org.id);

    const pets = await prisma.pet.findMany();

    return pets.filter((pet) => orgs.includes(pet.organizationId));
  }

  async findManyPetsByCharacteristics({
    city,
    query,
  }: FindManyPetsByCharacteristicsProps): Promise<Pet[]> {
    const orgsByCity = await prisma.organization.findMany({
      where: {
        city,
      },
    });
    const pets = await prisma.pet.findMany();
    return pets
      .filter((pet) => orgsByCity?.some((org) => org.id === pet.organizationId))
      .filter((pet) => pet.about?.toLowerCase().includes(query.toLowerCase()));
  }
  async findUniquePet(petId: string): Promise<Pet | null> {
    const pet = await prisma.pet.findUnique({
      where: {
        id: petId,
      },
    });

    if (!pet) {
      return null;
    }

    return pet;
  }
}
