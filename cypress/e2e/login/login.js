import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

// Locators da página de login
const loginLocators = {
  emailInput: 'input[data-testid="email"]',
  senhaInput: 'input[data-testid="senha"]',
  entrarButton: 'button[data-testid="entrar"]',
  logoutButton: '[data-testid="logout"]',
};

let usuario;
let emailUnico;
let senha;

Before(() => {
  // Carrega dados do fixture e cadastra usuário dinamicamente antes de cada teste
  cy.fixture('usuarios').then((data) => {
    usuario = data.novoUsuario;
    // Gera email único usando timestamp (síncrono)
    const timestamp = Date.now();
    emailUnico = `usuario${timestamp}@teste.com`;
    senha = usuario.senha;
    
    // Cadastra usuário usando comando com await implícito
    cy.cadastrarUsuario(usuario.nome, emailUnico, senha, usuario.administrador);
  });
});

Given('que tenho um usuário cadastrado', () => {
  // Usuário já foi cadastrado no Before hook
  // Apenas garante que as variáveis estão disponíveis
  cy.wrap(emailUnico).should('exist');
  cy.wrap(senha).should('exist');
});

Given('que estou logado no sistema', () => {
  // Usuário já foi cadastrado no Before hook
  // Faz login usando comandos com await implícito
  cy.visit('/login');
  cy.login(emailUnico, senha);
  cy.visit('/home');
  cy.get(loginLocators.logoutButton).should('exist');
});

When('acesso a página de login', () => {
  cy.visit('/login');
});

When('preencho as credenciais válidas', () => {
  // Credenciais já foram definidas no Given
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

