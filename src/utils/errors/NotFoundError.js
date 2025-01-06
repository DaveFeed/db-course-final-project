class NotFoundError extends Error {
  constructor(message, status) {
    super();
    this.message = message || 'Not found';
    this.status = status || 404;
  }
}

module.exports = NotFoundError;
