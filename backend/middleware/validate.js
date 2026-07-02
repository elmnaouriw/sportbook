const { body, validationResult } = require('express-validator');

function handleValidation(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const messages = errors.array().map(e => e.msg);
    return res.status(400).json({ error: messages.join('. ') });
  }
  next();
}

const registerValidation = [
  body('full_name').trim().notEmpty().withMessage('Le nom est requis'),
  body('full_name').isLength({ min: 2 }).withMessage('Le nom doit faire au moins 2 caractères'),
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  handleValidation
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  body('password').notEmpty().withMessage('Mot de passe requis'),
  handleValidation
];

const createSessionValidation = [
  body('title').trim().notEmpty().withMessage('Le titre est requis'),
  body('sport_id').isInt({ min: 1 }).withMessage('Sport invalide'),
  body('instructor').trim().notEmpty().withMessage("L'instructeur est requis"),
  body('date').isISO8601().withMessage('Date invalide (format ISO8601 attendu)'),
  body('time').matches(/^\d{2}:\d{2}(:\d{2})?$/).withMessage('Heure invalide (format HH:MM)'),
  body('duration').isInt({ min: 1 }).withMessage('La durée doit être un nombre positif'),
  body('location').trim().notEmpty().withMessage('Le lieu est requis'),
  body('total_spots').isInt({ min: 1 }).withMessage('Le nombre de places doit être un nombre positif'),
  handleValidation
];

const updateSessionValidation = [
  body('title').optional().trim().notEmpty().withMessage('Le titre ne peut pas être vide'),
  body('sport_id').optional().isInt({ min: 1 }).withMessage('Sport invalide'),
  body('instructor').optional().trim().notEmpty().withMessage("L'instructeur ne peut pas être vide"),
  body('date').optional().isISO8601().withMessage('Date invalide (format ISO8601 attendu)'),
  body('time').optional().matches(/^\d{2}:\d{2}(:\d{2})?$/).withMessage('Heure invalide (format HH:MM)'),
  body('duration').optional().isInt({ min: 1 }).withMessage('La durée doit être un nombre positif'),
  body('location').optional().trim().notEmpty().withMessage('Le lieu ne peut pas être vide'),
  body('total_spots').optional().isInt({ min: 1 }).withMessage('Le nombre de places doit être un nombre positif'),
  handleValidation
];

const createBookingValidation = [
  body('session_id').isInt({ min: 1 }).withMessage('session_id doit être un entier positif'),
  handleValidation
];

const createAnnouncementValidation = [
  body('title').trim().notEmpty().withMessage('Le titre est requis'),
  body('content').trim().notEmpty().withMessage('Le contenu est requis'),
  handleValidation
];

const updateProfileValidation = [
  body('full_name').optional().trim().notEmpty().withMessage('Le nom ne peut pas être vide'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Email invalide'),
  body('new_password').optional().isLength({ min: 6 }).withMessage('Le nouveau mot de passe doit faire au moins 6 caractères'),
  handleValidation
];

const forgotPasswordValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Email invalide'),
  handleValidation
];

const resetPasswordValidation = [
  body('token').notEmpty().withMessage('Token requis'),
  body('password').isLength({ min: 6 }).withMessage('Le mot de passe doit faire au moins 6 caractères'),
  handleValidation
];

module.exports = {
  registerValidation,
  loginValidation,
  createSessionValidation,
  updateSessionValidation,
  createBookingValidation,
  createAnnouncementValidation,
  updateProfileValidation,
  forgotPasswordValidation,
  resetPasswordValidation
};
