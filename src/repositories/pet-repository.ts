import { Organization, Pet, Prisma } from "@prisma/client";
import { FindManyPetsByCharacteristicsProps } from "./in-memory/in-memory-pet-repository";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findManyPetsByCharacteristics(
    params: FindManyPetsByCharacteristicsProps
  ): Promise<Pet[] | null>;
  findManyPetsByOrgs(organizations: Organization[]): Promise<Pet[] | null>;
  findUniquePet(petId: string): Promise<Pet | null>;
}
