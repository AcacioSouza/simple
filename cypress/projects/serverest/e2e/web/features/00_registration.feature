@registration
Feature: User registration
  As a visitor, I want to create an account to access the application.

  Background:
    Given the login page is loaded
    And I navigate to the registration page

  Scenario Outline: Successfully register a new <role>
    When I fill the registration data for "<role>"
    And I confirm the registration
    Then the home page for my "<role>" is loaded
    And I log out

  Examples:
    | role     |
    | admin    |
    | customer |
