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
  findPetsByCity(city: string): Promise<Organization[]>;
}
