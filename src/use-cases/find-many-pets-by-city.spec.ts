import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindUniquePetUseCase } from "./find-unique-pet";
import { FindManyPetsByCity } from "./find-many-pets-by-city";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";
import { hash } from "bcrypt";

let petRepository: InMemoryPetRepository;
let organizationRepository: InMemoryOrganizationRepository;
let sut: FindManyPetsByCity;

describe("find many pets by city use case", async () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new FindManyPetsByCity(petRepository, organizationRepository);
  });

  it("should be able to find many pets by city", async () => {
    const organization = await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 120,
      password: await hash("123456", 8),
      phone: "12999999",
      responsible: "Bruno Rafael",
      street: "Rua José",
    });

    await petRepository.create({
      about: "Pet lindo e carinhoso",
      name: "Mario",
      organizationId: organization.id,
    });
    await petRepository.create({
      about: "Pet calmo",
      name: "João",
      organizationId: organization.id,
    });

    const { pet } = await sut.execute("Pindamonhangaba");

    expect(pet).toHaveLength(2);
  });
});
