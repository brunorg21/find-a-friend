import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindUniquePetUseCase } from "./find-unique-pet";
import { PetNoExistError } from "./errors/pet-not-exist-error";
import { findManyPetsByCharacteristics } from "./find-many-pets-by-characteristics";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { hash } from "bcrypt";

let petRepository: InMemoryPetRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: findManyPetsByCharacteristics;

describe("find many pets by characteristics use case", async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    petRepository = new InMemoryPetRepository(organizationRepository);
    sut = new findManyPetsByCharacteristics(petRepository);
  });

  it("should be able to find many pets by characteristics", async () => {
    const organization = await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 200,
      password: await hash("123456", 8),
      phone: "129999999",
      responsible: "Bruno",
      street: "Rua José",
    });

    await petRepository.create({
      about: "Pet lindo e carinhoso",
      name: "Mario",
      organizationId: organization.id,
    });
    await petRepository.create({
      about: "Pet lindo e carinhoso",
      name: "Mario",
      organizationId: organization.id,
    });

    const { pet } = await sut.execute("lindo", "Pindamonhangaba");

    expect(pet).toHaveLength(2);
  });
  it("should not be able to find pet with wrong id", async () => {
    await expect(
      async () => await sut.execute("aaa", "Taubaté")
    ).rejects.toBeInstanceOf(PetNoExistError);
  });
});
