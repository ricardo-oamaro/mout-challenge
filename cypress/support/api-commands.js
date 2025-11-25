Cypress.Commands.add('apiLogin', (email, password) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/login',
    body: {
      email: email,
      password: password,
    },
    failOnStatusCode: false,
  }).then((response) => {
    if (response.status === 200) {
      return response.body.authorization;
    }
    throw new Error(`Login failed with status ${response.status}`);
  });
});

Cypress.Commands.add('apiCreateUser', (userData) => {
  const payload = {
    ...userData,
    ...(userData.administrador !== undefined && { administrador: String(userData.administrador) }),
  };
  
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/usuarios',
    body: payload,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiCreateProduct', (productData, authToken) => {
  return cy.request({
    method: 'POST',
    url: 'https://serverest.dev/produtos',
    headers: {
      authorization: authToken,
    },
    body: productData,
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('apiGenerateUniqueEmail', () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `usuario${timestamp}${random}@teste.com`;
});


