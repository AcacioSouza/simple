const { Given, When, Then } = require('@badeball/cypress-cucumber-preprocessor');
const LoginPage = require('../pages/LoginPage');
const HomePage = require('../pages/HomePage');

Given('the login page is loaded', () => {
  LoginPage.visit();
});

When('I input the user {string}', (userKey) => {
  cy.fixture('loginData').then(({ usuarios }) => {
    const dados = usuarios?.[userKey];
    if (!dados) throw new Error(`Usuário não mapeado em loginData.json: ${userKey}`);
    LoginPage.fillLoginForm(dados.email, dados.password);
  });
});

When('I submit the form', () => {
  LoginPage.submitForm();
});

Then('I should see an error message', () => {
  cy.fixture('static_text').then(({ messages }) => {
    // mensagens permanecem em PT, assert usa o texto da fixture
    LoginPage.assertErrorVisible(messages.login.invalidCredentials);
  });
});

Then('I should see the invalid email error message', () => {
  cy.fixture('static_text').then(({ messages }) => {
    LoginPage.assertErrorVisible(messages.login.invalidEmail);
  });
});

Then('I log out', () => {
  HomePage.logout();
});
