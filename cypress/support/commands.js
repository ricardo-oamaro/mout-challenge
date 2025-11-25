import { cadastroLocators } from './locators/cadastro.locators.js';
import { loginLocators } from './locators/login.locators.js';

Cypress.Commands.add('cadastrarUsuario', (nome, email, senha, administrador = false) => {
  cy.visit('/cadastrarusuarios');
  
  cy.get(cadastroLocators.nomeInput)
    .should('be.visible')
    .clear()
    .type(nome);
  
  cy.get(cadastroLocators.emailInput)
    .should('be.visible')
    .clear()
    .type(email);
  
  cy.get(cadastroLocators.passwordInput)
    .should('be.visible')
    .clear()
    .type(senha);
  
  if (administrador) {
    cy.get(cadastroLocators.checkboxAdmin).check();
  }
  
  cy.get(cadastroLocators.cadastrarButton).click();
});

Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login');
  
  cy.get(loginLocators.emailInput)
    .should('be.visible')
    .clear()
    .type(email);
  
  cy.get(loginLocators.senhaInput)
    .should('be.visible')
    .clear()
    .type(senha);
  
  cy.get(loginLocators.entrarButton).click();
});

Cypress.Commands.add('logout', () => {
  cy.get(loginLocators.logoutButton).click();
});

Cypress.Commands.add('gerarEmailUnico', () => {
  const timestamp = Date.now();
  return `usuario${timestamp}@teste.com`;
});

