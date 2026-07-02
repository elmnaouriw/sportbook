const request = require('supertest');

jest.mock('../config/db', () => {
  const mockQuery = jest.fn();
  return { query: mockQuery };
});

const db = require('../config/db');

describe('API — Functional Tests', () => {
  let app;

  beforeAll(() => {
    process.env.JWT_SECRET = 'test_secret_key';
    app = require('../server');
  });

  afterEach(() => {
    db.query.mockReset();
  });

  describe('GET /api/health', () => {
    it('returns ok status', async () => {
      const res = await request(app).get('/api/health');
      expect(res.status).toBe(200);
      expect(res.body.status).toBe('ok');
      expect(res.body.timestamp).toBeDefined();
    });
  });

  describe('GET /api/sessions', () => {
    it('returns sessions list', async () => {
      const mockSessions = [
        { id: 1, title: 'Morning Yoga', sport_slug: 'yoga' },
        { id: 2, title: 'HIIT Cardio', sport_slug: 'cardio' }
      ];
      db.query.mockResolvedValue([mockSessions]);

      const res = await request(app).get('/api/sessions');
      expect(res.status).toBe(200);
      expect(res.body.total).toBe(2);
      expect(res.body.sessions).toHaveLength(2);
    });

    it('returns empty list when no sessions', async () => {
      db.query.mockResolvedValue([[]]);

      const res = await request(app).get('/api/sessions');
      expect(res.status).toBe(200);
      expect(res.body.total).toBe(0);
      expect(res.body.sessions).toEqual([]);
    });

    it('handles server errors gracefully', async () => {
      db.query.mockRejectedValue(new Error('DB error'));

      const res = await request(app).get('/api/sessions');
      expect(res.status).toBe(500);
      expect(res.body.error).toBe('Erreur serveur');
    });
  });

  describe('GET /api/sessions/featured', () => {
    it('returns featured sessions', async () => {
      const mockFeatured = [
        { id: 1, title: 'Morning Yoga' },
        { id: 2, title: 'HIIT Cardio' },
        { id: 3, title: 'Football Match' },
        { id: 4, title: 'Strength Training' }
      ];
      db.query.mockResolvedValue([mockFeatured]);

      const res = await request(app).get('/api/sessions/featured');
      expect(res.status).toBe(200);
      expect(res.body).toHaveLength(4);
    });
  });
});
