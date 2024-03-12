import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { RegisterOrgUseCase } from "./register-org";
import { hash } from "bcrypt";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";
import { AuthenticateUseCase } from "./authenticate";
import { InvalidCredentialsError } from "./errors/invalid-credentials-error";

let organizationRepository: InMemoryOrganizationRepository;
let sut: AuthenticateUseCase;

describe("authenticate use case", async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new AuthenticateUseCase(organizationRepository);
  });

  it("should be able to authenticate", async () => {
    await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 120,
      password: await hash("123456", 8),
      phone: "12999999",
      responsible: "Bruno Rafael",
      street: "Rua José",
    });

    const { organization } = await sut.execute({
      email: "bruno@email.com",
      password: "123456",
    });

    expect(organization.id).toEqual(expect.any(String));
  });
  it("should not be able to authenticate with wrong password", async () => {
    await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 120,
      password: await hash("123456", 8),
      phone: "12999999",
      responsible: "Bruno Rafael",
      street: "Rua José",
    });

    await expect(
      async () =>
        await sut.execute({
          email: "bruno@email.com",
          password: "1234568",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
  it("should not be able to authenticate with wrong email", async () => {
    await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 120,
      password: await hash("123456", 8),
      phone: "12999999",
      responsible: "Bruno Rafael",
      street: "Rua José",
    });

    await expect(
      async () =>
        await sut.execute({
          email: "bruno@email1.com",
          password: "123456",
        })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
