export class OrgAlreadyExistsError extends Error {
  constructor() {
    super("Organization already exist.");
  }
}
