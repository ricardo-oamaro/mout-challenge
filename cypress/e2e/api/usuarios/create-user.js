import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I have valid user data', () => {
  cy.fixture('api/payloads').then((payloads) => {
    const timestamp = Date.now();
    const userData = {
      ...payloads.userData,
      email: `usuario${timestamp}@teste.com`,
    };
    cy.log(`Creating user with email: ${userData.email}`);
    cy.wrap(userData).as('userData');
  });
});

When('I send a POST request to {string}', (endpoint) => {
  cy.get('@userData').then((userData) => {
    const payload = {
      ...userData,
      administrador: String(userData.administrador),
    };
    
    cy.log(`📤 Sending payload: ${JSON.stringify(payload, null, 2)}`);
    
    cy.request({
      method: 'POST',
      url: `https://serverest.dev${endpoint}`,
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

Then('the response body should contain the created user data', () => {
  cy.get('@apiResponse').then((response) => {
    if (response.status === 201) {
      expect(response.body).to.have.property('message');
      expect(response.body.message).to.eq('Cadastro realizado com sucesso');
      expect(response.body).to.have.property('_id');
      expect(response.body._id).to.be.a('string').and.not.be.empty;
      cy.log(`✅ User created successfully with ID: ${response.body._id}`);
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

let duplicateEmail;

Given('a user is already registered with a specific email', () => {
  const email = `duplicado${Date.now()}@teste.com`;
  duplicateEmail = email;
  cy.fixture('api/payloads').then((payloads) => {
    const payload = {
      ...payloads.userData,
      email: duplicateEmail,
      administrador: String(payloads.userData.administrador),
    };
    cy.apiCreateUser(payload);
  });
});

When('I send a POST request to {string} with the same email', (endpoint) => {
  cy.fixture('api/payloads').then((payloads) => {
    const payload = {
      ...payloads.userData,
      nome: "Test Duplicado",
      email: duplicateEmail,
      administrador: String(payloads.userData.administrador),
    };
    cy.log(`📤 Sending payload (duplicate email): ${JSON.stringify(payload, null, 2)}`);
    cy.request({
      method: 'POST',
      url: `https://serverest.dev${endpoint}`,
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(`Response status: ${response.status}`);
      cy.log(`Response body: ${JSON.stringify(response.body)}`);
      cy.wrap(response).as('apiResponse');
    });
  });
});

Then('the response body should contain a duplicate email error message', () => {
  cy.get('@apiResponse').its('body').should('have.property', 'message', 'Este email já está sendo usado');
});

Given('I have user data with a missing mandatory field', () => {
  cy.fixture('api/payloads').then((payloads) => {
    const incompleteData = { ...payloads.userData };
    delete incompleteData.nome;
    cy.wrap(incompleteData).as('incompleteData');
  });
});

When('I send a POST request to {string} with the incomplete data', (endpoint) => {
  cy.get('@incompleteData').then((incompleteData) => {
    const payload = {
      ...incompleteData,
      ...(incompleteData.administrador !== undefined && { administrador: String(incompleteData.administrador) }),
    };
    cy.log(`📤 Sending payload (incomplete data): ${JSON.stringify(payload, null, 2)}`);
    cy.request({
      method: 'POST',
      url: `https://serverest.dev${endpoint}`,
      body: payload,
      failOnStatusCode: false,
    }).then((response) => {
      cy.log(`Response status: ${response.status}`);
      cy.log(`Response body: ${JSON.stringify(response.body)}`);
      cy.wrap(response).as('apiResponse');
    });
  });
});

Then('the response body should contain a mandatory field error message', () => {
  cy.get('@apiResponse').its('body').should('have.property', 'nome', 'nome é obrigatório');
});


