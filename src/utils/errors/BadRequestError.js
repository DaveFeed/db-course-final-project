class BadRequestError extends Error {
  constructor(message, status) {
    super();
    this.message = message || 'Bad Request';
    this.status = status || 400;
  }
}

module.exports = BadRequestError;
