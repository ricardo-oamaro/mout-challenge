/// <reference types="cypress" />

describe('Login de Usuário', () => {
  let usuario;

  beforeEach(() => {
    // Carrega os dados de teste
    cy.fixture('usuarios').then((data) => {
      usuario = data.novoUsuario;
    });
  });

  it('Deve fazer login com credenciais válidas', () => {
    // Gerar email único e cadastrar usuário primeiro
    // const timestamp = Date.now();
    // const emailUnico = `usuario${timestamp}@teste.com`;
    // const senha = usuario.senha;
    const emailUnico = 'usuario1763982181155@teste.com';
    const senha = 'senha123';

    // Cadastrar usuário usando comando customizado
    // cy.cadastrarUsuario(usuario.nome, emailUnico, senha, false);

    // Ir para login
    cy.visit('/login');

    // Fazer login
    cy.login(emailUnico, senha);

    // Validar que o login foi bem-sucedido com fallback
    // cy.url().then((url) => {
    //   if (!url.includes('/home')) {
    //     cy.log('⚠️ Não redirecionou para /home, tentando ir manualmente');
    //     cy.visit('/home');
    //   }
    // });

    cy.url().should('include', '/home');
    cy.pause();

    // Verificar elementos da página logada
    cy.get('[data-testid="logout"]').should('exist');
  });
});

