const { AppError, errorHandler } = require('../middleware/errorHandler');

describe('AppError', () => {
  it('creates an operational error with status code', () => {
    const err = new AppError('Not found', 404);
    expect(err.message).toBe('Not found');
    expect(err.statusCode).toBe(404);
    expect(err.isOperational).toBe(true);
  });

  it('creates a 400 error by default', () => {
    const err = new AppError('Bad request');
    expect(err.message).toBe('Bad request');
    expect(err.statusCode).toBeUndefined();
  });
});

describe('errorHandler', () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('handles operational errors with correct status', () => {
    const err = new AppError('Session introuvable', 404);
    errorHandler(err, null, mockRes, jest.fn());
    expect(mockRes.status).toHaveBeenCalledWith(404);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Session introuvable' });
  });

  it('handles ER_DUP_ENTRY errors', () => {
    const err = new Error('Duplicate entry');
    err.code = 'ER_DUP_ENTRY';
    errorHandler(err, null, mockRes, jest.fn());
    expect(mockRes.status).toHaveBeenCalledWith(409);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Conflit : cet élément existe déjà' });
  });

  it('handles unknown errors with 500', () => {
    const err = new Error('Something broke');
    errorHandler(err, null, mockRes, jest.fn());
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({ error: 'Erreur serveur' });
  });
});
