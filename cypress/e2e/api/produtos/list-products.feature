Feature: API - List Products
  As a developer
  I want to list products via API
  So that I can validate the products listing endpoint

  Scenario: Should list products successfully
    When I send a GET request to "/produtos"
    Then I should receive status code 200
    And the response should contain an array of products
    And each product should have required fields


