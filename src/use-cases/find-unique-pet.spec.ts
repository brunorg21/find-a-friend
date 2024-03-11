import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { FindUniquePetUseCase } from "./find-unique-pet";

let petRepository: InMemoryPetRepository;
let sut: FindUniquePetUseCase;

describe("find unique pet use case", async () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new FindUniquePetUseCase(petRepository);
  });

  it("should be able to find a pet", async () => {
    const createdPet = await petRepository.create({
      about: "Pet lindo e carinhoso",
      name: "Mario",
      organizationId: "organization-1",
    });

    const { pet } = await sut.execute(createdPet.id);

    expect(pet).toEqual(
      expect.objectContaining({
        about: "Pet lindo e carinhoso",
        name: "Mario",
        organizationId: "organization-1",
      })
    );
  });
});
