class InternalServerError extends Error {
  constructor(message, status) {
    super();
    this.message = message || 'Internal Server Error';
    this.status = status || 500;
  }
}
