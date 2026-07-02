-- ============================================
--  SportBook — MySQL Schema (synchronisé avec config/db.js)
-- ============================================

CREATE DATABASE IF NOT EXISTS sportbook CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sportbook;

-- ── SPORTS ─────────────────────────────────
CREATE TABLE IF NOT EXISTS sports (
  id    INT AUTO_INCREMENT PRIMARY KEY,
  slug  VARCHAR(50) NOT NULL UNIQUE,
  name  VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- ── USERS ──────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  full_name   VARCHAR(100)        NOT NULL,
  email       VARCHAR(150)        NOT NULL UNIQUE,
  password    VARCHAR(255)        NOT NULL,   -- bcrypt hash
  role        ENUM('user','admin') DEFAULT 'user',
  created_at  TIMESTAMP            DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- ── SESSIONS ───────────────────────────────
-- Note : instructor est stocké directement (VARCHAR), pas de table instructors dédiée
CREATE TABLE IF NOT EXISTS sessions (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  sport_id    INT           NOT NULL,
  title       VARCHAR(150)  NOT NULL,
  instructor  VARCHAR(100)  NOT NULL,
  date        DATE          NOT NULL,
  time        TIME          NOT NULL,
  duration    INT           NOT NULL,
  location    VARCHAR(150)  NOT NULL,
  total_spots INT           NOT NULL,
  FOREIGN KEY (sport_id) REFERENCES sports(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── BOOKINGS ───────────────────────────────
CREATE TABLE IF NOT EXISTS bookings (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT      NOT NULL,
  session_id  INT      NOT NULL,
  status      ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
  booked_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY user_session_unique (user_id, session_id),
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── TOKEN BLACKLIST ───────────────────────
CREATE TABLE IF NOT EXISTS token_blacklist (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  token_hash  VARCHAR(64) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token_hash (token_hash)
) ENGINE=InnoDB;

-- ── PASSWORD RESET TOKENS ──────────────────
CREATE TABLE IF NOT EXISTS password_reset_tokens (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  email       VARCHAR(150)  NOT NULL,
  token_hash  VARCHAR(64)   NOT NULL,
  expires_at  DATETIME      NOT NULL,
  used        TINYINT(1)    DEFAULT 0,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_token_hash (token_hash),
  INDEX idx_email (email)
) ENGINE=InnoDB;

-- ── ANNOUNCEMENTS ──────────────────────────
CREATE TABLE IF NOT EXISTS announcements (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  user_id     INT           NOT NULL,
  title       VARCHAR(255)  NOT NULL,
  content     TEXT          NOT NULL,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ── VUE : sessions avec places disponibles ─
CREATE OR REPLACE VIEW sessions_view AS
SELECT
  s.id,
  s.title,
  s.sport_id,
  s.instructor,
  s.date        AS session_date,
  s.time        AS start_time,
  s.duration    AS duration_min,
  s.location,
  s.total_spots,
  sp.slug       AS sport_slug,
  sp.name       AS sport_name,
  IFNULL(COUNT(b.id), 0)                                AS booked_spots,
  s.total_spots - IFNULL(COUNT(b.id), 0)                AS available_spots,
  CASE
    WHEN s.total_spots > 0 THEN ROUND(IFNULL(COUNT(b.id), 0) / s.total_spots * 100)
    ELSE 0
  END AS fill_pct,
  CASE
    WHEN s.total_spots = 0 THEN 'full'
    WHEN IFNULL(COUNT(b.id), 0) >= s.total_spots THEN 'full'
    WHEN s.total_spots > 0 AND IFNULL(COUNT(b.id), 0) / s.total_spots >= 0.8 THEN 'almost_full'
    ELSE 'available'
  END AS status
FROM sessions s
JOIN sports sp ON s.sport_id = sp.id
LEFT JOIN bookings b ON s.id = b.session_id AND b.status = 'confirmed'
GROUP BY s.id;

-- ── SEED DATA ──────────────────────────────
INSERT IGNORE INTO sports (slug, name) VALUES
  ('yoga', 'Yoga'),
  ('cardio', 'Cardio'),
  ('football', 'Football'),
  ('fitness', 'Fitness');
