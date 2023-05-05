export class UnableToPersistDataError extends Error {
  constructor(error: Error) {
    super('The data could not be persisted to the database. ' + error.message);
  }
}