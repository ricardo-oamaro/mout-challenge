import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';
import { loginLocators } from '../../support/locators/login.locators.js';

let usuario;
let emailUnico;
let senha;

Before(() => {
  cy.fixture('usuarios').then((data) => {
    usuario = data.novoUsuario;
    const timestamp = Date.now();
    emailUnico = `usuario${timestamp}@teste.com`;
    senha = usuario.senha;
    
    cy.cadastrarUsuario(usuario.nome, emailUnico, senha, usuario.administrador);
  });
});

Given('que tenho um usuário cadastrado', () => {
  cy.wrap(emailUnico).should('exist');
  cy.wrap(senha).should('exist');
});

Given('que estou logado no sistema', () => {
  cy.visit('/login');
  cy.login(emailUnico, senha);
  cy.visit('/home');
  cy.get(loginLocators.logoutButton).should('exist');
});

When('acesso a página de login', () => {
  cy.visit('/login');
});

When('preencho as credenciais válidas', () => {
});

When('submeto o formulário de login', () => {
  cy.login(emailUnico, senha);
});

When('clico no botão de logout', () => {
  cy.get(loginLocators.logoutButton).click();
});

Then('devo ser redirecionado para a página home', () => {
  cy.url().should('include', '/home');
});

Then('devo ver o botão de logout', () => {
  cy.get(loginLocators.logoutButton).should('exist');
});

Then('devo ser redirecionado para a página de login', () => {
  cy.url().should('include', '/login');
});

Then('devo ver o título {string}', (titulo) => {
  cy.contains(titulo).should('exist');
});

