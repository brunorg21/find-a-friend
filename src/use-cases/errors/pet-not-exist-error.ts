export class PetNoExistError extends Error {
  constructor() {
    super("Pet not exist.");
  }
}
