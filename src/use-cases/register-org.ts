import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { PetNoExistError } from "./errors/pet-not-exist-error";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { hash } from "bcrypt";

interface RegisterOrgProps {
  city: string;
  street: string;
  number: number;
  phone: string;
  responsible: string;
  email: string;
  password: string;
}

export class RegisterOrgUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({
    city,
    email,
    number,
    password,
    phone,
    responsible,
    street,
  }: RegisterOrgProps) {
    const organizationWithSameEmail =
      await this.organizationRepository.findByEmail(email);

    if (organizationWithSameEmail) {
      throw new OrgAlreadyExistsError();
    }

    const passwordHash = await hash(password, 8);

    const organization = await this.organizationRepository.register({
      city,
      email,
      number,
      password: passwordHash,
      phone,
      responsible,
      street,
    });

    return {
      ...organization,
      password: undefined,
    };
  }
}
