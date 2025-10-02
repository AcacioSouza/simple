// Cypress/projetos/serverest/e2e/web/pages/RegistrationPage.js
const regMap = require('../mappings/RegistrationPageMap');

class RegistrationPage {
  assertOnRegistration(text = 'Cadastro') {
    cy.contains(text).should('be.visible');
  }

  fillName(value) {
    cy.get(regMap.name).clear().type(value);
  }

  fillEmail(value) {
    cy.get(regMap.email).clear().type(value);
  }

  fillPassword(value) {
    cy.get(regMap.password).clear().type(value);
  }

  fillAll({ name, email, password }) {
    if (name) this.fillName(name);
    if (email) this.fillEmail(email);
    if (password) this.fillPassword(password);
  }

  toggleAdmin(checked = true) {
    const el = cy.get(regMap.adminCheckbox);
    checked ? el.check({ force: true }) : el.uncheck({ force: true });
  }

  submit() {
    cy.get(regMap.submit).click();
  }

  hasDuplicateEmailError(expectedText) {
    return cy.get('body').then(($body) => {
      const $err = $body.find(regMap.duplicateEmailError);
      const visible = $err.length > 0 && $err.is(':visible');
      return Boolean(visible && $err.text().includes(expectedText));
    });
  }
}

module.exports = new RegistrationPage();
