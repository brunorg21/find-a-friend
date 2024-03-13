import { Organization, Prisma } from "@prisma/client";
import { OrganizationRepository } from "../organization-repository";
import { prisma } from "@/lib/prisma";

export class PrismaOrganizationRepository implements OrganizationRepository {
  async register(
    data: Prisma.OrganizationUncheckedCreateInput
  ): Promise<Organization> {
    const organization = await prisma.organization.create({
      data,
    });

    return organization;
  }
  async findPetsByCity(city: string): Promise<Organization[]> {
    const organizations = await prisma.organization.findMany({
      where: {
        city: {
          contains: city,
        },
      },
    });

    return organizations;
  }
  async findByEmail(email: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        email,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }
  async findById(orgId: string): Promise<Organization | null> {
    const organization = await prisma.organization.findUnique({
      where: {
        id: orgId,
      },
    });

    if (!organization) {
      return null;
    }

    return organization;
  }
}
