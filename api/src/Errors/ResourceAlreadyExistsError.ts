export class ResourceAlreadyExistsError extends Error {
  constructor(message: string, error?: Error) {
    super(message + error?.message);
  }
}