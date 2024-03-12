import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { RegisterOrgUseCase } from "./register-org";
import { hash } from "bcrypt";
import { OrgAlreadyExistsError } from "./errors/org-already-exists-error";

let organizationRepository: InMemoryOrganizationRepository;
let sut: RegisterOrgUseCase;

describe("register org use case", async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new RegisterOrgUseCase(organizationRepository);
  });

  it("should be able to register a org", async () => {
    const { organization } = await sut.execute({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 120,
      password: await hash("123456", 8),
      phone: "12999999",
      responsible: "Bruno Rafael",
      street: "Rua José",
    });

    expect(organization.id).toEqual(expect.any(String));
  });
  it("should not be able to register a org with same email", async () => {
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
          city: "Pindamonhangaba",
          email: "bruno@email.com",
          number: 120,
          password: await hash("123456", 8),
          phone: "12999999",
          responsible: "Bruno Rafael",
          street: "Rua José",
        })
    ).rejects.toBeInstanceOf(OrgAlreadyExistsError);
  });
});
