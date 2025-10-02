// cypress/support/apiCommands.js

// Helper: monta URL completa da API
const apiUrl = () => Cypress.env('apiUrl') || 'https://serverest.dev';

// Requisição para a API já concatenando base
Cypress.Commands.add('apiRequest', (method, path, options = {}) => {
  return cy.request({ method, url: `${apiUrl()}${path}`, ...options });
});

// Login com dados vindos da fixture loginData.json
// role: 'admin' | 'customer' | etc. (chaves do arquivo)
Cypress.Commands.add('apiLoginFromFixture', (role = 'admin') => {
  return cy.fixture('loginData').then(({ usuarios }) => {
    const cred = usuarios?.[role];
    if (!cred) throw new Error(`Role não mapeada em loginData.json: ${role}`);

    return cy.apiRequest('POST', '/login', { body: { email: cred.email, password: cred.password } })
      .then((res) => {
        expect(res.status, 'login OK').to.eq(200);
        expect(res.body).to.have.property('authorization');
        return res.body.authorization; // "Bearer <token>"
      });
  });
});

// Login inválido com dados da fixture (ex.: 'customerInvalido', 'adminInvalido')
Cypress.Commands.add('apiLoginInvalidFromFixture', (aliasKey) => {
  return cy.fixture('loginData').then(({ usuarios }) => {
    const cred = usuarios?.[aliasKey];
    if (!cred) throw new Error(`Usuário inválido não mapeado em loginData.json: ${aliasKey}`);

    return cy.apiRequest('POST', '/login', {
      failOnStatusCode: false,
      body: { email: cred.email, password: cred.password }
    });
  });
});
