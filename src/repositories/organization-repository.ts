import { Organization, Prisma } from "@prisma/client";

export interface LoginProps {
  email: string;
  password: string;
}

export interface OrganizationRepository {
  register(
    data: Prisma.OrganizationUncheckedCreateInput
  ): Promise<Organization>;
  login(data: LoginProps): Promise<Organization>;
  findPetsByQuery(query: string): Promise<Organization[]>;
  findByEmail(email: string): Promise<Organization | null>;
}
