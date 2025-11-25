import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

const fluxoCompraLocators = {
  cardBody: ':nth-child(1) > .card-body',
  adicionarNaListaButton: '[data-testid="adicionarNaLista"]',
  carrinhoButton: '[data-testid="carrinho"]',
  shoppingCartProduct: '[data-testid="shopping-cart-product"]',
  finalizarCompraButton: 'button',
  logoutButton: '[data-testid="logout"]',
};

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
  cy.fixture('usuarios').then((data) => {
    usuario = data.novoUsuario;
    const timestamp = Date.now();
    emailUnico = `usuario${timestamp}@teste.com`;
    senha = usuario.senha;
    
    cy.cadastrarUsuario(usuario.nome, emailUnico, senha, usuario.administrador);
    cy.visit('/login');
    cy.login(emailUnico, senha);
  });
});

Given('que estou logado e na página home', () => {
  cy.get(loginLocators.logoutButton).should('exist');
  cy.visit('/home');
});

When('visualizo produtos disponíveis', () => {
  cy.get(fluxoCompraLocators.cardBody).should('exist');
});

When('adiciono o primeiro produto ao carrinho', () => {
  cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click();
});

When('acesso o carrinho de compras', () => {
  cy.get(fluxoCompraLocators.carrinhoButton).click();
  cy.url().should('include', '/carrinho');
});

Then('devo estar na página do carrinho', () => {
  cy.url().should('include', '/carrinho');
  cy.log('✅ Redirecionado para a página do carrinho com sucesso');
});

