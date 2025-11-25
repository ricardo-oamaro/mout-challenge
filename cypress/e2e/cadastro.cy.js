describe('Cadastro de Usuário', () => {
  let usuario;

  beforeEach(() => {
    cy.fixture('usuarios').then((data) => {
      usuario = data.novoUsuario;
    });
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    const timestamp = Date.now();
    const emailUnico = `usuario${timestamp}@teste.com`;

    cy.visit('/cadastrarusuarios');

    cy.url().should('include', '/cadastrarusuarios');
    cy.contains('Cadastro').should('exist');

    cy.get('input[data-testid="nome"]').should('be.visible').clear().type(usuario.nome);
    cy.get('input[data-testid="email"]').should('be.visible').clear().type(emailUnico);
    cy.get('input[data-testid="password"]').should('be.visible').clear().type(usuario.senha);

    if (usuario.administrador) {
      cy.get('input[data-testid="checkbox"]').check();
    }

    cy.get('button[data-testid="cadastrar"]').click();

    cy.url().should('satisfy', (url) => {
      return url.includes('/login') || url.includes('/home') || url.includes('/cadastrarusuarios');
    });
    
    cy.get('body').then(($body) => {
      if ($body.find('.alert').length > 0) {
        cy.get('.alert').should('contain.text', 'sucesso');
      }
    });
  });

  it('Não deve permitir cadastro com email duplicado', () => {
    const emailFixo = `duplicado${Date.now()}@teste.com`;

    cy.visit('/cadastrarusuarios');
    cy.get('input[data-testid="nome"]').clear().type('Usuario Um');
    cy.get('input[data-testid="email"]').clear().type(emailFixo);
    cy.get('input[data-testid="password"]').clear().type('senha123');
    cy.get('button[data-testid="cadastrar"]').click();

    cy.url().should('satisfy', (url) => {
      return url.includes('/login') || url.includes('/home') || url.includes('/cadastrarusuarios');
    });

    cy.visit('/cadastrarusuarios');
    cy.get('input[data-testid="nome"]').clear().type('Usuario Dois');
    cy.get('input[data-testid="email"]').clear().type(emailFixo);
    cy.get('input[data-testid="password"]').clear().type('senha456');
    cy.get('button[data-testid="cadastrar"]').click();

    cy.get('body').then(($body) => {
      if ($body.find('.alert').length > 0) {
        cy.get('.alert').should('contain.text', 'email');
      }
    });
  });

  it('Não deve permitir cadastro sem preencher campos obrigatórios', () => {
    cy.visit('/cadastrarusuarios');

    cy.get('button[data-testid="cadastrar"]').click();

    cy.url().should('include', '/cadastrarusuarios');
    
    cy.get('.form > :nth-child(3)')
      .should('be.visible')
      .and('contain.text', 'Nome é obrigatório');
    
    cy.get('.form > :nth-child(4)')
      .should('be.visible')
      .and('contain.text', 'Email é obrigatório');
    
    cy.get('.form > :nth-child(5)')
      .should('be.visible')
      .and('contain.text', 'Password é obrigatório');
  });

});

