// ***********************************************
// Custom API commands for ServeRest automation
// ***********************************************

/**
 * Comando customizado para autenticação via API
 * @param {string} email - Email do usuário
 * @param {string} password - Senha do usuário
 */
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

/**
 * Comando customizado para criar usuário via API
 * @param {object} userData - Dados do usuário (nome, email, password, administrador)
 */
Cypress.Commands.add('apiCreateUser', (userData) => {
  // Ensure administrador is sent as string (API requirement)
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

/**
 * Comando customizado para criar produto via API
 * @param {object} productData - Dados do produto (nome, preco, descricao, quantidade)
 * @param {string} authToken - Token de autenticação
 */
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

/**
 * Gerar email único usando timestamp para testes de API
 */
Cypress.Commands.add('apiGenerateUniqueEmail', () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `usuario${timestamp}${random}@teste.com`;
});


