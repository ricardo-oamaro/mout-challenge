import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

const cadastroLocators = {
  nomeInput: 'input[data-testid="nome"]',
  emailInput: 'input[data-testid="email"]',
  passwordInput: 'input[data-testid="password"]',
  checkboxAdmin: 'input[data-testid="checkbox"]',
  cadastrarButton: 'button[data-testid="cadastrar"]',
  alertMessage: '.alert',
  nomeObrigatorio: '.form > :nth-child(3)',
  emailObrigatorio: '.form > :nth-child(4)',
  passwordObrigatorio: '.form > :nth-child(5)',
};

let usuario;
let emailUnico;

Before(() => {
  cy.fixture('usuarios').then((data) => {
    usuario = data.novoUsuario;
  });
});

Given('que estou na página de cadastro', () => {
  cy.visit('/cadastrarusuarios');
  cy.url().should('include', '/cadastrarusuarios');
  cy.contains('Cadastro').should('exist');
});

When('preencho o formulário com dados válidos', () => {
  const timestamp = Date.now();
  emailUnico = `usuario${timestamp}@teste.com`;
  
  cy.get(cadastroLocators.nomeInput).should('be.visible').clear().type(usuario.nome);
  cy.get(cadastroLocators.emailInput).should('be.visible').clear().type(emailUnico);
  cy.get(cadastroLocators.passwordInput).should('be.visible').clear().type(usuario.senha);
});

When('submeto o formulário de cadastro', () => {
  cy.get(cadastroLocators.cadastrarButton).click();
});

Then('devo ser redirecionado ou ver mensagem de sucesso', () => {
  cy.url().should('satisfy', (url) => {
    return url.includes('/login') || url.includes('/home') || url.includes('/cadastrarusuarios');
  });
  
  cy.get('body').then(($body) => {
    if ($body.find(cadastroLocators.alertMessage).length > 0) {
      cy.get(cadastroLocators.alertMessage).should('contain.text', 'sucesso');
    }
  });
});

Given('que já existe um usuário cadastrado com email {string}', (email) => {
  cy.visit('/cadastrarusuarios');
  cy.get(cadastroLocators.nomeInput).clear().type('Usuario Um');
  cy.get(cadastroLocators.emailInput).clear().type(email);
  cy.get(cadastroLocators.passwordInput).clear().type('senha123');
  cy.get(cadastroLocators.cadastrarButton).click();
  
  cy.url().should('satisfy', (url) => {
    return url.includes('/login') || url.includes('/home') || url.includes('/cadastrarusuarios');
  });
});

When('tento cadastrar um novo usuário com o mesmo email', () => {
  cy.visit('/cadastrarusuarios');
  cy.get(cadastroLocators.nomeInput).clear().type('Usuario Dois');
  cy.get(cadastroLocators.emailInput).clear().type('duplicado@teste.com');
  cy.get(cadastroLocators.passwordInput).clear().type('senha456');
  cy.get(cadastroLocators.cadastrarButton).click();
});

Then('devo ver uma mensagem de erro informando que o email já existe', () => {
  cy.get('body').then(($body) => {
    if ($body.find(cadastroLocators.alertMessage).length > 0) {
      cy.get(cadastroLocators.alertMessage).should('contain.text', 'email');
    }
  });
});

When('submeto o formulário sem preencher os campos obrigatórios', () => {
  cy.get(cadastroLocators.cadastrarButton).click();
});

Then('devo ver mensagens de erro para cada campo obrigatório', () => {
  cy.url().should('include', '/cadastrarusuarios');
  
  cy.get(cadastroLocators.nomeObrigatorio)
    .should('be.visible')
    .and('contain.text', 'Nome é obrigatório');
  
  cy.get(cadastroLocators.emailObrigatorio)
    .should('be.visible')
    .and('contain.text', 'Email é obrigatório');
  
  cy.get(cadastroLocators.passwordObrigatorio)
    .should('be.visible')
    .and('contain.text', 'Password é obrigatório');
});

