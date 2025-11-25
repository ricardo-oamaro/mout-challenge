import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('I send a GET request to {string}', (endpoint) => {
  cy.request({
    method: 'GET',
    url: `https://serverest.dev${endpoint}`,
    failOnStatusCode: false,
  }).as('apiResponse');
});

Then('I should receive status code {int}', (statusCode) => {
  cy.get('@apiResponse').its('status').should('eq', statusCode);
});

Then('the response should contain an array of products', () => {
  cy.get('@apiResponse').its('body').should('have.property', 'produtos');
  cy.get('@apiResponse').its('body.produtos').should('be.an', 'array');
});

Then('each product should have required fields', () => {
  cy.get('@apiResponse').then((response) => {
    const products = response.body.produtos;
    
    if (products && products.length > 0) {
      const firstProduct = products[0];
      expect(firstProduct).to.have.property('_id');
      expect(firstProduct).to.have.property('nome');
      expect(firstProduct).to.have.property('preco');
      expect(firstProduct).to.have.property('descricao');
      expect(firstProduct).to.have.property('quantidade');
    }
  });
});


