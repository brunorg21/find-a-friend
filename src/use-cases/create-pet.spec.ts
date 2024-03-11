import { InMemoryPetRepository } from "@/repositories/in-memory/in-memory-pet-repository";
import { beforeEach, describe, expect, it } from "vitest";
import { CreatePetUseCase } from "./create-pet";

let petRepository: InMemoryPetRepository;
let sut: CreatePetUseCase;

describe("create-pet use case", async () => {
  beforeEach(() => {
    petRepository = new InMemoryPetRepository();
    sut = new CreatePetUseCase(petRepository);
  });

  it("should be able to create a pet", async () => {
    const { pet } = await sut.execute({
      about: "Pet lindo e carinhoso",
      name: "Mario",
      organizationId: "organization-1",
    });

    expect(pet.id).toEqual(expect.any(String));
  });
});
