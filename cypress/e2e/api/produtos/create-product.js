import { Given, When, Then, Before } from '@badeball/cypress-cucumber-preprocessor';

const ADMIN_EMAIL = 'admin@teste.com';
const ADMIN_PASSWORD = 'admin123';

Before(() => {
  cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: {
      email: ADMIN_EMAIL,
      password: ADMIN_PASSWORD,
    },
    failOnStatusCode: false,
  }).then((loginResponse) => {
    expect(loginResponse.status).to.eq(200);
    const authToken = loginResponse.body.authorization;
    expect(authToken).to.exist;
    cy.wrap(authToken).as('authToken');
  });
});

Given('I have an admin user authenticated', () => {
  cy.get('@authToken').should('exist');
});

Given('I have valid product data', () => {
  cy.fixture('api/payloads').then((payloads) => {
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    const productData = {
      ...payloads.productData,
      nome: `Produto API ${timestamp}${randomSuffix}`,
    };
    cy.log(`Creating product with name: ${productData.nome}`);
    cy.wrap(productData).as('productData');
  });
});

When('I send a POST request to {string} with authentication token', (endpoint) => {
  cy.get('@authToken').then((token) => {
    cy.get('@productData').then((productData) => {
      const payload = {
        nome: productData.nome,
        preco: Number(productData.preco),
        descricao: productData.descricao,
        quantidade: Number(productData.quantidade),
      };
      
      cy.log(`📤 Sending payload: ${JSON.stringify(payload, null, 2)}`);
      
      cy.request({
        method: 'POST',
        url: `https://serverest.dev${endpoint}`,
        headers: {
          Authorization: token,
        },
        body: payload,
        failOnStatusCode: false,
      }).then((response) => {
        cy.log(`Response status: ${response.status}`);
        cy.log(`Response body: ${JSON.stringify(response.body)}`);
        
        if (response.body && response.body.message) {
          if (response.status === 201) {
            cy.log(`✅ Success message from API: ${response.body.message}`);
          } else {
            cy.log(`❌ Error message from API: ${response.body.message}`);
          }
        }
        
        cy.wrap(response).as('apiResponse');
      });
    });
  });
});

Then('I should receive status code {int}', (statusCode) => {
  cy.get('@apiResponse').then((response) => {
    if (response.status !== statusCode) {
      cy.log(`❌ Erro: Status code inesperado. Esperado: ${statusCode}, Recebido: ${response.status}`);
      cy.log(`Corpo da resposta: ${JSON.stringify(response.body)}`);
      
      if (response.body && response.body.message) {
        cy.log(`❌ Mensagem de erro da API: ${response.body.message}`);
      }
    }
    expect(response.status).to.eq(statusCode);
  });
});

Then('the response body should contain the created product data', () => {
  cy.get('@apiResponse').then((response) => {
    if (response.status === 201) {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
      expect(response.body._id).to.be.a('string').and.not.be.empty;
      cy.log(`✅ Product created successfully with ID: ${response.body._id}`);
    } else {
      cy.log(`❌ Status code não é 201. Status recebido: ${response.status}`);
      if (response.body && response.body.message) {
        cy.log(`❌ Mensagem de erro da API: ${response.body.message}`);
      }
      throw new Error(`Expected status 201 but got ${response.status}. Error message: ${response.body?.message || 'No error message'}`);
    }
  });
});

Then('the "_id" field should be present in the response', () => {
  cy.get('@apiResponse').then((response) => {
    if (response.status !== 201) {
      cy.log(`❌ Status code não é 201. Status recebido: ${response.status}`);
      if (response.body && response.body.message) {
        cy.log(`❌ Mensagem de erro da API: ${response.body.message}`);
      }
    }
    
    expect(response.body).to.have.property('_id');
    expect(response.body._id).to.be.a('string').and.not.be.empty;
  });
});

