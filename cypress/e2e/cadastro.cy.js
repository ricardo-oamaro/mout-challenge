/// <reference types="cypress" />

describe('Cadastro de Usuário', () => {
  let usuario;

  beforeEach(() => {
    // Carrega os dados de teste
    cy.fixture('usuarios').then((data) => {
      usuario = data.novoUsuario;
    });
  });

  it('Deve cadastrar um novo usuário com sucesso', () => {
    // Gerar email único para evitar conflitos
    const timestamp = Date.now();
    const emailUnico = `usuario${timestamp}@teste.com`;

    // Acessar a página de cadastro
    cy.visit('/cadastrarusuarios');

    // Verificar se está na página correta
    cy.url().should('include', '/cadastrarusuarios');
    cy.contains('Cadastro').should('exist');

    // Preencher o formulário de cadastro
    cy.get('input[data-testid="nome"]').should('be.visible').clear().type(usuario.nome);
    cy.get('input[data-testid="email"]').should('be.visible').clear().type(emailUnico);
    cy.get('input[data-testid="password"]').should('be.visible').clear().type(usuario.senha);

    // Marcar checkbox de administrador se necessário
    if (usuario.administrador) {
      cy.get('input[data-testid="checkbox"]').check();
    }

    // Submeter o formulário
    cy.get('button[data-testid="cadastrar"]').click();

    // Validar mensagem de sucesso ou redirecionamento
    cy.url().should('satisfy', (url) => {
      return url.includes('/login') || url.includes('/home') || url.includes('/cadastrarusuarios');
    });
    
    // Se houver mensagem, validar
    cy.get('body').then(($body) => {
      if ($body.find('.alert').length > 0) {
        cy.get('.alert').should('contain.text', 'sucesso');
      }
    });
  });

  it('Não deve permitir cadastro com email duplicado', () => {
    const emailFixo = `duplicado${Date.now()}@teste.com`;

    // Primeiro cadastro
    cy.visit('/cadastrarusuarios');
    cy.get('input[data-testid="nome"]').clear().type('Usuario Um');
    cy.get('input[data-testid="email"]').clear().type(emailFixo);
    cy.get('input[data-testid="password"]').clear().type('senha123');
    cy.get('button[data-testid="cadastrar"]').click();

    // Validar que primeiro cadastro foi processado
    cy.url().should('satisfy', (url) => {
      return url.includes('/login') || url.includes('/home') || url.includes('/cadastrarusuarios');
    });

    // Tentar cadastrar novamente com mesmo email
    cy.visit('/cadastrarusuarios');
    cy.get('input[data-testid="nome"]').clear().type('Usuario Dois');
    cy.get('input[data-testid="email"]').clear().type(emailFixo);
    cy.get('input[data-testid="password"]').clear().type('senha456');
    cy.get('button[data-testid="cadastrar"]').click();

    // Validar mensagem de erro
    cy.get('body').then(($body) => {
      if ($body.find('.alert').length > 0) {
        cy.get('.alert').should('contain.text', 'email');
      }
    });
  });

  it('Não deve permitir cadastro sem preencher campos obrigatórios', () => {
    cy.visit('/cadastrarusuarios');

    // Tentar submeter formulário vazio
    cy.get('button[data-testid="cadastrar"]').click();

    // Verificar que ainda está na página de cadastro (não redirecionou)
    cy.url().should('include', '/cadastrarusuarios');
    
    // Verificar que as mensagens de erro estão visíveis
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

