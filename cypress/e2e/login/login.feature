Feature: Login de Usuário
  Como um usuário cadastrado
  Eu quero fazer login no sistema
  Para acessar funcionalidades restritas

  Scenario: Deve fazer login com credenciais válidas
    Given que tenho um usuário cadastrado
    When acesso a página de login
    And preencho as credenciais válidas
    And submeto o formulário de login
    Then devo ser redirecionado para a página home
    And devo ver o botão de logout

