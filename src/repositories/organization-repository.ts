import { Organization, Prisma } from "@prisma/client";

interface LoginProps {
  email: string;
  password: string;
}

export interface OrganizationRepository {
  register(
    data: Prisma.OrganizationUncheckedCreateInput
  ): Promise<Organization>;
  login(data: LoginProps): Promise<Organization>;
}
