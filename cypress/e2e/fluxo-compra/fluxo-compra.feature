Feature: Fluxo de Compra
  Como um usuário logado
  Eu quero adicionar produtos ao carrinho
  Para visualizar os produtos no carrinho

  Scenario: Deve adicionar produto ao carrinho
    Given que estou logado e na página home
    When visualizo produtos disponíveis
    And adiciono o primeiro produto ao carrinho
    And acesso o carrinho de compras
    Then devo estar na página do carrinho

