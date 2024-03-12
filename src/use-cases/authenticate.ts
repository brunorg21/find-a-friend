import { PetRepository } from "@/repositories/pet-repository";
import { ResourceNotFound } from "./errors/resource-not-found";
import { PetNoExistError } from "./errors/pet-not-exist-error";
import { OrganizationRepository } from "@/repositories/organization-repository";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { compare, hash } from "bcrypt";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

interface AuthenticateProps {
  email: string;
  password: string;
}

export class AuthenticateUseCase {
  constructor(private organizationRepository: OrganizationRepository) {}

  async execute({ email, password }: AuthenticateProps) {
    const organization = await this.organizationRepository.findByEmail(email);

    if (!organization) {
      throw new InvalidCredentialsError();
    }

    const isPasswordMath = await compare(password, organization.password);

    if (!isPasswordMath) {
      throw new InvalidCredentialsError();
    }

    return {
      organization: {
        ...organization,
        password: undefined,
      },
    };
  }
}
