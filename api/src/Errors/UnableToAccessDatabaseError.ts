export class UnableToAccessDatabaseError extends Error {
  constructor(error: Error) {
    super('There was not possible to acces the database. ' + error.message);
  }
}