// ***********************************************
// Custom commands for ServeRest automation
// ***********************************************

// Import locators usando require para compatibilidade com CommonJS
const cadastroLocators = {
  nomeInput: 'input[data-testid="nome"]',
  emailInput: 'input[data-testid="email"]',
  passwordInput: 'input[data-testid="password"]',
  checkboxAdmin: 'input[data-testid="checkbox"]',
  cadastrarButton: 'button[data-testid="cadastrar"]',
};

const loginLocators = {
  emailInput: 'input[data-testid="email"]',
  senhaInput: 'input[data-testid="senha"]',
  entrarButton: 'button[data-testid="entrar"]',
  logoutButton: '[data-testid="logout"]',
};

/**
 * Comando customizado para fazer cadastro de usuário
 * @param {string} nome - Nome do usuário
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 * @param {boolean} administrador - Se é administrador ou não
 */
Cypress.Commands.add('cadastrarUsuario', (nome, email, senha, administrador = false) => {
  cy.visit('/cadastrarusuarios');
  
  // Campo Nome
  cy.get(cadastroLocators.nomeInput)
    .should('be.visible')
    .clear()
    .type(nome);
  
  // Campo Email
  cy.get(cadastroLocators.emailInput)
    .should('be.visible')
    .clear()
    .type(email);
  
  // Campo Senha (cadastro usa "password")
  cy.get(cadastroLocators.passwordInput)
    .should('be.visible')
    .clear()
    .type(senha);
  
  // Checkbox administrador
  if (administrador) {
    cy.get(cadastroLocators.checkboxAdmin).check();
  }
  
  // Botão Cadastrar
  cy.get(cadastroLocators.cadastrarButton).click();
});

/**
 * Comando customizado para fazer login
 * @param {string} email - Email do usuário
 * @param {string} senha - Senha do usuário
 */
Cypress.Commands.add('login', (email, senha) => {
  cy.visit('/login');
  
  // Campo Email
  cy.get(loginLocators.emailInput)
    .should('be.visible')
    .clear()
    .type(email);
  
  // Campo Senha (login usa "senha")
  cy.get(loginLocators.senhaInput)
    .should('be.visible')
    .clear()
    .type(senha);
  
  // Botão Entrar
  cy.get(loginLocators.entrarButton).click();
});

/**
 * Comando customizado para fazer logout
 */
Cypress.Commands.add('logout', () => {
  cy.get(loginLocators.logoutButton).click();
});

/**
 * Gerar email único usando timestamp
 */
Cypress.Commands.add('gerarEmailUnico', () => {
  const timestamp = Date.now();
  return `usuario${timestamp}@teste.com`;
});

