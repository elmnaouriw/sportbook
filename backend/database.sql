-- ============================================
--  SportBook — MySQL Schema
-- ============================================

CREATE DATABASE IF NOT EXISTS sportbook CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sportbook;

-- ── USERS ──────────────────────────────────
CREATE TABLE users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100)        NOT NULL,
  email       VARCHAR(150)        NOT NULL UNIQUE,
  password    VARCHAR(255)        NOT NULL,   -- bcrypt hash
  role        ENUM('user','admin') DEFAULT 'user',
  created_at  DATETIME            DEFAULT CURRENT_TIMESTAMP
);

-- ── SPORTS ─────────────────────────────────
CREATE TABLE sports (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  name  VARCHAR(50) NOT NULL,
  slug  VARCHAR(50) NOT NULL UNIQUE
);

INSERT INTO sports (name, slug) VALUES
  ('Yoga',     'yoga'),
  ('Cardio',   'cardio'),
  ('Football', 'football'),
  ('Fitness',  'fitness');

-- ── INSTRUCTORS ────────────────────────────
CREATE TABLE instructors (
  id        INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email     VARCHAR(150)
);

INSERT INTO instructors (full_name) VALUES
  ('Sarah Johnson'), ('Mike Chen'), ('David Martinez'),
  ('Emma Wilson'),   ('Lisa Park'), ('James Torres'),
  ('Carlos Ruiz'),   ('Nora Kim'),  ('Ana Rivera');

-- ── SESSIONS ───────────────────────────────
CREATE TABLE sessions (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  title         VARCHAR(150)  NOT NULL,
  sport_id      INT           NOT NULL,
  instructor_id INT           NOT NULL,
  session_date  DATE          NOT NULL,
  start_time    TIME          NOT NULL,
  duration_min  INT           NOT NULL,
  location      VARCHAR(100)  NOT NULL,
  total_spots   INT           NOT NULL,
  created_at    DATETIME      DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sport_id)      REFERENCES sports(id),
  FOREIGN KEY (instructor_id) REFERENCES instructors(id)
);

INSERT INTO sessions (title, sport_id, instructor_id, session_date, start_time, duration_min, location, total_spots) VALUES
  ('Morning Yoga Flow',  1, 1, '2026-05-20', '07:00:00', 60, 'Studio A',      15),
  ('HIIT Cardio Blast',  2, 2, '2026-05-20', '18:00:00', 45, 'Gym Floor',     20),
  ('Football Match',     3, 3, '2026-05-21', '17:00:00', 90, 'Outdoor Field', 22),
  ('Strength Training',  4, 4, '2026-05-21', '08:00:00', 60, 'Weight Room',   12),
  ('Evening Yoga',       1, 5, '2026-05-22', '19:00:00', 60, 'Studio B',      18),
  ('Spin Class',         2, 6, '2026-05-22', '09:00:00', 45, 'Cycling Studio',16),
  ('5-a-side Football',  3, 7, '2026-05-23', '18:00:00', 60, 'Indoor Pitch',  10),
  ('Core & Abs',         4, 8, '2026-05-23', '12:00:00', 30, 'Studio A',      20),
  ('Zumba Dance',        2, 9, '2026-05-24', '10:00:00', 50, 'Dance Studio',  25);

-- ── BOOKINGS ───────────────────────────────
CREATE TABLE bookings (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT      NOT NULL,
  session_id  INT      NOT NULL,
  booked_at   DATETIME DEFAULT CURRENT_TIMESTAMP,
  status      ENUM('confirmed','cancelled') DEFAULT 'confirmed',
  UNIQUE KEY uq_booking (user_id, session_id),
  FOREIGN KEY (user_id)    REFERENCES users(id),
  FOREIGN KEY (session_id) REFERENCES sessions(id)
);

-- ── VIEW : sessions avec places disponibles ─
CREATE OR REPLACE VIEW sessions_view AS
SELECT
  s.id,
  s.title,

  sp.name AS sport,
  sp.slug AS sport,

  i.full_name AS instructor,

  s.session_date AS date,
  s.start_time AS time,
  s.duration_min AS duration,
  s.location,

  s.total_spots AS total,

  COUNT(b.id) AS booked,

  CASE
    WHEN COUNT(b.id) >= s.total_spots THEN TRUE
    ELSE FALSE
  END AS full

FROM sessions s
JOIN sports sp ON sp.id = s.sport_id
JOIN instructors i ON i.id = s.instructor_id
LEFT JOIN bookings b ON b.session_id = s.id AND b.status = 'confirmed'

GROUP BY s.id;