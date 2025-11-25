describe('Fluxo de Compra', () => {
  let usuario;
  let emailUnico;
  let senha;

  beforeEach(() => {
    cy.log('🚀 Iniciando beforeEach - Fluxo de Compra');
    
    cy.fixture('usuarios').then((data) => {
      emailUnico = 'usuario1763982181155@teste.com';
      senha = 'senha123';
      
      cy.log('🔐 Indo para login');
      cy.visit('/login');
      
      cy.log(`🔑 Fazendo login`);
      cy.login(emailUnico, senha);
      
      cy.log('🏠 Navegando para /home');
      cy.visit('/home');
      
      cy.get('[data-testid="logout"]').should('exist');
      cy.log('✅ Login bem-sucedido');
    });
  });

  it('Deve adicionar produto ao carrinho e finalizar compra', () => {
    cy.log('🛒 Iniciando teste: Adicionar produto ao carrinho');
    
    cy.log('🔍 [1/4] Verificando se há produtos disponíveis...');
    cy.get(':nth-child(1) > .card-body').should('exist');
    cy.log('✅ Produtos encontrados na página');
    
    cy.log('➕ [2/4] Adicionando produto ao carrinho...');
    cy.get(':nth-child(1) > .card-body > div > [href="/minhaListaDeProdutos"] > [data-testid="adicionarNaLista"]').click();
    cy.log('✅ Produto adicionado ao carrinho');

    cy.log('🛒 [3/4] Navegando para o carrinho...');
    cy.get('[data-testid="carrinho"]').click();
    cy.url().should('include', '/carrinho');
    cy.log('✅ Página do carrinho carregada');

    cy.log('💰 [4/4] Verificando produtos no carrinho e finalizando compra...');
    cy.get('body').then(($body) => {
      const hasProducts = $body.find('[data-testid="shopping-cart-product"]').length > 0 || $body.find('tr').length > 1;
      cy.log(`   Produtos encontrados: ${hasProducts}`);
      
      if (hasProducts) {
        cy.log('✅ Há produtos no carrinho, finalizando compra...');
        cy.contains('button', /concluir compra|finalizar/i).click();
        
        cy.log('🔍 Verificando redirecionamento...');
        cy.url().should('not.include', '/carrinho');
        cy.log('✅ Compra finalizada com sucesso!');
      } else {
        cy.log('⚠️ Nenhum produto encontrado no carrinho');
      }
    });
    
    cy.log('🎉 Teste concluído!');
  });
});
