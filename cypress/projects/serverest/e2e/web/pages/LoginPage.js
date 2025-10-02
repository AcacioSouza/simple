const loginMap = require('../mappings/LoginPageMap');

class LoginPage {
  elements = {
    email: () => cy.get(loginMap.email),
    password: () => cy.get(loginMap.password),
    submit: () => cy.get(loginMap.submit),
    error: () => cy.get(loginMap.error),
    register: () => cy.get(loginMap.register)
  };

  visit() {
    cy.visit("/login");
  }

  fillEmail(value) {
    this.elements.email().clear().type(value);
  }

  fillPassword(value) {
    this.elements.password().clear().type(value);
  }

  fillLoginForm(email, password) {
    this.fillEmail(email);
    this.fillPassword(password);
  }

  submitForm() {
    this.elements.submit().click();
  }
  
  assertErrorVisible(text = 'Email e/ou senha inválidos') {
    this.elements.error().should('be.visible').and('contain.text', text);
  }

   clickRegister() {
    this.elements.register().click();
  }

}

module.exports = new LoginPage();