import { beforeEach, describe, expect, it } from "vitest";
import { InMemoryOrganizationRepository } from "@/repositories/in-memory/in-memory-organization-repository";

import { hash } from "bcrypt";

import { SendMessageToOrgUseCase } from "./send-message-to-org";

let organizationRepository: InMemoryOrganizationRepository;
let sut: SendMessageToOrgUseCase;

describe("send message to org use case", async () => {
  beforeEach(() => {
    organizationRepository = new InMemoryOrganizationRepository();
    sut = new SendMessageToOrgUseCase(organizationRepository);
  });

  it("should be able to send message to org", async () => {
    const organization = await organizationRepository.register({
      city: "Pindamonhangaba",
      email: "bruno@email.com",
      number: 120,
      password: await hash("123456", 8),
      phone: "12987039524",
      responsible: "Bruno Rafael",
      street: "Rua José",
    });

    const wpURL = await sut.execute(organization.id);

    expect(wpURL).toEqual(expect.any(String));
  });
});
