import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindUniquePetUseCase } from "./find-unique-pet";
import { PetNoExistError } from "./errors/pet-not-exist-error";
import { GetOrganizationProfileUseCase } from "./get-organization-profile";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { hash } from "bcrypt";
import { ResourceNotFound } from "./errors/resource-not-found";

let organizationRepository: InMemoryOrganizationRepository;
let sut: GetOrganizationProfileUseCase;

describe("find unique pet use case", async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new GetOrganizationProfileUseCase(organizationRepository);
  });

  it("should be able to get a organization profile", async () => {
    const createdOrg = await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 200,
      password: await hash("123456", 8),
      phone: "129999999",
      responsible: "Bruno",
      street: "Rua José",
    });

    const organization = await sut.execute(createdOrg.id);

    expect(organization.id).toEqual(expect.any(String));
  });

  it("should not able to get a organization profile with wrong id", async () => {
    await expect(async () => {
      await sut.execute("wrong-id");
    }).rejects.toBeInstanceOf(ResourceNotFound);
  });
});
