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

