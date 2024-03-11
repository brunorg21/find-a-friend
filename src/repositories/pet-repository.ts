import { Organization, Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  findManyPetsByCharacteristics(q: string): Promise<Pet[]>;
  findManyPetsByOrgs(organizations: Organization[]): Promise<Pet[]>;
  findUniquePet(petId: string): Promise<Pet | null>;
}
