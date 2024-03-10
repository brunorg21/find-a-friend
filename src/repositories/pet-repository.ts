import { Organization, Pet, Prisma } from "@prisma/client";

export interface PetRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>;
  listByCharacteristics(q: string): Promise<Pet[]>;
  findManyByOrgs(organizations: Organization[]): Promise<Pet[]>;
  findUniquePet(petId: string): Promise<Pet | null>;
}
