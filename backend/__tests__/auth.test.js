const jwt = require('jsonwebtoken');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');

process.env.JWT_SECRET = 'test_secret_key';

function mockReqRes() {
  const req = { headers: {} };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  return { req, res, next };
}

describe('authMiddleware', () => {
  it('rejects request without Authorization header', async () => {
    const { req, res, next } = mockReqRes();
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token manquant ou invalide' });
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects request with malformed header', async () => {
    const { req, res, next } = mockReqRes();
    req.headers['authorization'] = 'Invalid';
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  it('accepts valid token and calls next', async () => {
    const token = jwt.sign({ id: 1, role: 'user' }, process.env.JWT_SECRET);
    const { req, res, next } = mockReqRes();
    req.headers['authorization'] = 'Bearer ' + token;
    await authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(1);
  });

  it('rejects expired token', async () => {
    const token = jwt.sign({ id: 1 }, process.env.JWT_SECRET, { expiresIn: '0s' });
    const { req, res, next } = mockReqRes();
    req.headers['authorization'] = 'Bearer ' + token;
    await new Promise(r => setTimeout(r, 100));
    await authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });
});

describe('adminMiddleware', () => {
  it('allows admin user', () => {
    const { req, res, next } = mockReqRes();
    req.user = { id: 1, role: 'admin' };
    adminMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });

  it('rejects non-admin user', () => {
    const { req, res, next } = mockReqRes();
    req.user = { id: 2, role: 'user' };
    adminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Accès réservé aux administrateurs' });
    expect(next).not.toHaveBeenCalled();
  });

  it('rejects request without user', () => {
    const { req, res, next } = mockReqRes();
    req.user = null;
    adminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
