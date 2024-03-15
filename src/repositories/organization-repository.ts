import { Organization, Prisma } from "@prisma/client";

export interface LoginProps {
  email: string;
  password: string;
}

export interface OrganizationRepository {
  register(
    data: Prisma.OrganizationUncheckedCreateInput
  ): Promise<Organization>;
  findPetsByCity(city: string): Promise<Organization[] | null>;
  findByEmail(email: string): Promise<Organization | null>;
  findById(orgId: string): Promise<Organization | null>;
}
