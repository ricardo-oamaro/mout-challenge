Feature: API - Create Product
  As an admin user
  I want to create a product via API
  So that I can validate the product creation endpoint

  Scenario: Should create a product successfully as admin
    Given I have an admin user authenticated
    And I have valid product data
    When I send a POST request to "/produtos" with authentication token
    Then I should receive status code 201
    And the response body should contain the created product data
    And the "_id" field should be present in the response


