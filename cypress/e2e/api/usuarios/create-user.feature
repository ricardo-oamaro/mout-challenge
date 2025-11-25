Feature: API - Create User
  As a developer
  I want to create a user via API
  So that I can validate the user creation endpoint

  Scenario: Should create a new user successfully
    Given I have valid user data
    When I send a POST request to "/usuarios"
    Then I should receive status code 201
    And the response body should contain the created user data
    And the "_id" field should be present in the response

  Scenario: Should not create user with duplicate email
    Given a user is already registered with a specific email
    When I send a POST request to "/usuarios" with the same email
    Then I should receive status code 400
    And the response body should contain a duplicate email error message

  Scenario: Should not create user with missing mandatory fields
    Given I have user data with a missing mandatory field
    When I send a POST request to "/usuarios" with the incomplete data
    Then I should receive status code 400
    And the response body should contain a mandatory field error message


