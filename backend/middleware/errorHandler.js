class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

function errorHandler(err, req, res, _next) {
  if (err.isOperational) {
    return res.status(err.statusCode).json({ error: err.message });
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ error: 'Conflit : cet élément existe déjà' });
  }

  console.error('❌ Erreur:', err);
  res.status(500).json({ error: 'Erreur serveur' });
}

module.exports = { AppError, errorHandler };
