Feature: Cadastro de Usuário
  Como um usuário
  Eu quero me cadastrar no sistema
  Para poder acessar funcionalidades do ServeRest

  Scenario: Deve cadastrar um novo usuário com sucesso
    Given que estou na página de cadastro
    When preencho o formulário com dados válidos
    And submeto o formulário de cadastro
    Then devo ser redirecionado ou ver mensagem de sucesso

  Scenario: Não deve permitir cadastro com email duplicado
    Given que já existe um usuário cadastrado com email "duplicado@teste.com"
    When tento cadastrar um novo usuário com o mesmo email
    Then devo ver uma mensagem de erro informando que o email já existe

  Scenario: Não deve permitir cadastro sem preencher campos obrigatórios
    Given que estou na página de cadastro
    When submeto o formulário sem preencher os campos obrigatórios
    Then devo ver mensagens de erro para cada campo obrigatório

