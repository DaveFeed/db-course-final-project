class ConflictError extends Error {
  constructor(message, status) {
    super();
    this.message = message || 'Conflict error';
    this.status = status || 409;
  }
}

module.exports = ConflictError;
