/// <reference types="cypress" />

describe('Login de Usuário', () => {
  let usuario;

  beforeEach(() => {
    cy.fixture('usuarios').then((data) => {
      usuario = data.novoUsuario;
    });
  });

  it('Deve fazer login com credenciais válidas', () => {
    const emailUnico = 'usuario1763982181155@teste.com';
    const senha = 'senha123';

    cy.visit('/login');

    cy.login(emailUnico, senha);

    cy.url().should('include', '/home');
    cy.pause();

    cy.get('[data-testid="logout"]').should('exist');
  });
});

