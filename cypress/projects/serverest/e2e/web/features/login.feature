Feature: Login
  As a user, I want to access the system with my credentials.

  Background:
    Given the login page is loaded

  @valid
  Scenario Outline: Login with user <user>
    When I input the user "<user>"
    And I submit the form
    Then the home page for my "<user>" is loaded
  Examples:
    | user     |
    | customer |
    | admin    |

  @invalid
  Scenario Outline: Invalid login with user <user>
    When I input the user "<user>"
    And I submit the form
    Then I should see an error message
  Examples:
    | user             |
    | customerInvalido |
    | adminInvalido    |

  @invalid_format
  Scenario Outline: Invalid email format on login
    When I input the user "<user>"
    And I submit the form
    Then I should see the invalid email error message
  Examples:
    | user             |
    | wrongEmailFormat |
