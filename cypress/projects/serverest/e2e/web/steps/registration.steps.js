const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const { faker } = require('@faker-js/faker');
const LoginPage = require('../pages/LoginPage');
const RegistrationPage = require('../pages/RegistrationPage');
const HomePage = require('../pages/HomePage');

function genRandomUser() {
  const name = faker.person.fullName();
  const email = faker.internet.email({ provider: 'cypress.com' }).toLowerCase();
  const password = faker.internet.password({ length: 12 });
  return { name, email, password };
}

Given('I navigate to the registration page', () => {
  // intercept para sincronizar
  cy.intercept('POST', '**/usuarios').as('registerRequest');

  LoginPage.clickRegister();
  cy.fixture('static_text').then(({ messages }) => {
    // texto do título permanece em PT (resource)
    RegistrationPage.assertOnRegistration(messages.registration.title);
  });
});

When('I fill the registration data for {string}', (role) => {
  cy.fixture('RegistrationData').then(({ usuarios }) => {
    const data = usuarios?.[role];
    if (!data) throw new Error(`Tipo de usuário não mapeado em RegistrationData.json: ${role}`);

    RegistrationPage.fillAll(data);
    RegistrationPage.toggleAdmin(role === 'admin');

    cy.wrap(role).as('registrationRole');
  });
});

When('I confirm the registration', () => {
  const submitAndWait = () => {
    RegistrationPage.submit();
    return cy.wait('@registerRequest');
  };

  submitAndWait().then((interception) => {
    const status = interception?.response?.statusCode;

    if (status && [200, 201].includes(status)) {
      cy.log(`[registration] first attempt OK (${status})`);
      return;
    }

    cy.fixture('static_text').then(({ messages }) => {
      const duplicateMsg = messages.registration.duplicateEmail;
      const bodyStr = interception?.response?.body ? JSON.stringify(interception.response.body) : '';
      const isDuplicate = status >= 400 && bodyStr.includes(duplicateMsg);

      if (isDuplicate) {
        const rnd = genRandomUser();
        cy.log(`[registration] duplicate email detected. Retrying with random data: ${rnd.name} | ${rnd.email}`);
        RegistrationPage.fillAll(rnd);
        cy.get('@registrationRole').then((role) => {
          RegistrationPage.toggleAdmin(role === 'admin');
        });
        submitAndWait().its('response.statusCode').should('be.oneOf', [200, 201]);
      }
    });
  });
});


