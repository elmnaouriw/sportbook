describe('Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('affiche le titre principal', () => {
    cy.contains('h1', 'Book your sport sessions easily').should('be.visible');
  });

  it('affiche les sections de la page d\'accueil', () => {
    cy.contains('Featured Sessions').should('be.visible');
    cy.contains('Why Choose SportBook?').should('be.visible');
    cy.contains('Ready to Get Started?').should('be.visible');
  });

  it('affiche les statistiques', () => {
    cy.contains('Active Members').should('be.visible');
    cy.contains('Sessions Monthly').should('be.visible');
    cy.contains('Satisfaction Rate').should('be.visible');
  });
});

describe('Navigation', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('navigue vers la page sessions', () => {
    cy.contains('a', 'Sessions').click();
    cy.contains('h1', 'Browse Sessions').should('be.visible');
  });

  it('navigue vers la page login', () => {
    cy.contains('button', 'Login').click();
    cy.contains('h2', 'Welcome Back').should('be.visible');
  });

  it('navigue vers la page register', () => {
    cy.contains('button', 'Register').click();
    cy.contains('h2', 'Create Account').should('be.visible');
  });
});

describe('Login page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', 'Login').click();
  });

  it('affiche le formulaire de connexion', () => {
    cy.get('#login-email').should('be.visible');
    cy.get('#login-password').should('be.visible');
    cy.contains('button', 'Sign In').should('be.visible');
  });

  it('affiche un lien mot de passe oublié', () => {
    cy.contains('Forgot password?').should('be.visible');
  });

  it('affiche un lien vers la page register', () => {
    cy.contains('Create account').should('be.visible');
  });
});

describe('Forgot password page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', 'Login').click();
    cy.contains('Forgot password?').click();
  });

  it('affiche le formulaire', () => {
    cy.contains('h2', 'Reset Password').should('be.visible');
    cy.get('#forgot-email').should('be.visible');
    cy.contains('button', 'Send Reset Link').should('be.visible');
  });

  it('retourne vers la page login', () => {
    cy.contains('Back to login').click();
    cy.contains('h2', 'Welcome Back').should('be.visible');
  });
});

describe('Register page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.contains('button', 'Register').click();
  });

  it('affiche le formulaire d\'inscription', () => {
    cy.get('#reg-name').should('be.visible');
    cy.get('#reg-email').should('be.visible');
    cy.get('#reg-password').should('be.visible');
    cy.get('#reg-confirm').should('be.visible');
    cy.contains('button', 'Create Account').should('be.visible');
  });

  it('affiche les options de rôle', () => {
    cy.get('input[name="role"]').should('have.length', 2);
  });

  it('affiche la case à cocher des conditions', () => {
    cy.get('#terms').should('be.visible');
  });
});

describe('Reset password page (direct URL)', () => {
  it('affiche le formulaire avec un token dans l\'URL', () => {
    cy.visit('/?page=reset-password&token=fake-test-token');
    cy.contains('h2', 'Choose a New Password').should('be.visible');
    cy.get('#reset-password').should('be.visible');
    cy.get('#reset-confirm').should('be.visible');
    cy.contains('button', 'Reset Password').should('be.visible');
  });
});
