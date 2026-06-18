const mysql = require('mysql2/promise');
require('dotenv').config();

const dbConfig = {
  host:     process.env.DB_HOST     || 'localhost',
  port:     process.env.DB_PORT     || 3306,
  user:     process.env.DB_USER     || 'root',
  password: process.env.DB_PASSWORD || '',
};

const dbName = process.env.DB_NAME || 'sportbook';

let pool;

// ── FONCTION D'AUTO-INSTALLATION DE LA BASE ET DES TABLES ──
async function initializeDatabase() {
  try {
    // 1. Connexion temporaire au serveur MySQL sans spécifier de base
    const connection = await mysql.createConnection(dbConfig);
    console.log('🔌 Connexion au serveur MySQL réussie...');

    // 2. Création de la base de données
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    console.log(`📦 Base de données "${dbName}" vérifiée/créée.`);

   

    // 3. Basculer sur la base de données SportBook
    await connection.query(`USE \`${dbName}\`;`);

    // 4. Création Table SPORTS
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`sports\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`slug\` VARCHAR(50) NOT NULL UNIQUE,
        \`name\` VARCHAR(100) NOT NULL
      ) ENGINE=InnoDB;
    `);

    // 5. Création Table USERS
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`users\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`full_name\` VARCHAR(100) NOT NULL,
        \`email\` VARCHAR(150) NOT NULL UNIQUE,
        \`password\` VARCHAR(255) NOT NULL,
        \`role\` ENUM('user', 'admin') DEFAULT 'user',
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB;
    `);

    // 6. Création Table SESSIONS
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`sessions\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`sport_id\` INT NOT NULL,
        \`title\` VARCHAR(150) NOT NULL,
        \`instructor\` VARCHAR(100) NOT NULL,
        \`date\` DATE NOT NULL,
        \`time\` TIME NOT NULL,
        \`duration\` INT NOT NULL,
        \`location\` VARCHAR(150) NOT NULL,
        \`total_spots\` INT NOT NULL,
        FOREIGN KEY (\`sport_id\`) REFERENCES \`sports\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // 7. Création Table BOOKINGS
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`bookings\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`user_id\` INT NOT NULL,
        \`session_id\` INT NOT NULL,
        \`status\` ENUM('confirmed', 'cancelled') DEFAULT 'confirmed',
        \`booked_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE,
        FOREIGN KEY (\`session_id\`) REFERENCES \`sessions\`(\`id\`) ON DELETE CASCADE,
        UNIQUE KEY \`user_session_unique\` (\`user_id\`, \`session_id\`)
      ) ENGINE=InnoDB;
    `);

    // 8. Création Table TOKEN_BLACKLIST
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`token_blacklist\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`token_hash\` VARCHAR(64) NOT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_token_hash (\`token_hash\`)
      ) ENGINE=InnoDB;
    `);

    // 9. Création Table ANNOUNCEMENTS
    await connection.query(`
      CREATE TABLE IF NOT EXISTS \`announcements\` (
        \`id\` INT AUTO_INCREMENT PRIMARY KEY,
        \`user_id\` INT NOT NULL,
        \`title\` VARCHAR(255) NOT NULL,
        \`content\` TEXT NOT NULL,
        \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE
      ) ENGINE=InnoDB;
    `);

    // 10. Création / Remplacement de la VUE SQL
    await connection.query(`
  CREATE OR REPLACE VIEW \`sessions_view\` AS
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
    IFNULL(COUNT(b.id), 0)                                    AS booked_spots,
    s.total_spots - IFNULL(COUNT(b.id), 0)                    AS available_spots,
    ROUND(IFNULL(COUNT(b.id), 0) / s.total_spots * 100)       AS fill_pct,
    CASE
      WHEN IFNULL(COUNT(b.id), 0) >= s.total_spots THEN 'full'
      WHEN IFNULL(COUNT(b.id), 0) / s.total_spots >= 0.8 THEN 'almost_full'
      ELSE 'available'
    END AS status
  FROM \`sessions\` s
  JOIN \`sports\` sp ON s.sport_id = sp.id
  LEFT JOIN \`bookings\` b ON s.id = b.session_id AND b.status = 'confirmed'
  GROUP BY s.id;
`);

    // 11. Injection des données de test si la table sports est vide
    const [rows] = await connection.query('SELECT id FROM sports LIMIT 1');
    if (rows.length === 0) {
      console.log('🌱 Base vide. Injection des données de test...');
      
      await connection.query(`
        INSERT INTO \`sports\` (\`slug\`, \`name\`) VALUES 
        ('yoga', 'Yoga'), ('cardio', 'Cardio'), ('football', 'Football'), ('fitness', 'Fitness');
      `);

      // On injecte des séances avec la date d'aujourd'hui pour qu'elles s'affichent sur le Front (CURDATE())
      await connection.query(`
        INSERT INTO \`sessions\` (\`sport_id\`, \`title\`, \`instructor\`, \`date\`, \`time\`, \`duration\`, \`location\`, \`total_spots\`) VALUES 
        (1, 'Morning Yoga Flow', 'Sarah Johnson', CURDATE(), '07:00:00', 60, 'Studio A', 15),
        (2, 'HIIT Cardio Blast', 'Mike Chen', CURDATE(), '18:00:00', 45, 'Gym Floor', 20),
        (3, 'Football Match', 'David Martinez', CURDATE() + INTERVAL 1 DAY, '17:00:00', 90, 'Outdoor Field', 22),
        (4, 'Strength Training', 'Emma Wilson', CURDATE() + INTERVAL 2 DAY, '08:00:00', 60, 'Weight Room', 12);
      `);
      console.log('✅ Données de test injectées.');
    }

    // Fermer la connexion temporaire
    await connection.end();

    // 11. Initialiser enfin le Pool final qui sera exporté vers l'application
    pool = mysql.createPool({
      ...dbConfig,
      database: dbName,
      waitForConnections: true,
      connectionLimit:    10,
      queueLimit:         0,
    });

    console.log('✅ MySQL connecté & Pool de connexions prêt !');

  } catch (err) {
    console.error('❌ Erreur lors de l\'initialisation MySQL :');
    console.error(err); // <── REVERIFIE QUE CETTE LIGNE EST BIEN LÀ ET PAS EN COMMENTAIRE
    process.exit(1);
  }
}


// Lancement de l'initialisation asynchrone
initializeDatabase();

// On exporte un proxy ou une fonction d'accès pour s'assurer que le pool est utilisé après création
module.exports = {
  query: async (sql, params) => {
    if (!pool) {
      // Petit délai de sécurité si une requête arrive trop vite au démarrage
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    return pool.query(sql, params);
  }
};