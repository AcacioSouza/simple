/// <reference types="cypress" />

describe('API - Login', () => {
  it('should log in successfully (200) and return authorization token', () => {
    cy.apiLoginFromFixture('admin').then((token) => {
      expect(token).to.match(/^Bearer\s.+/);
    });
  });

  it('should fail with invalid credentials (401)', () => {
    cy.apiLoginInvalidFromFixture('customerInvalido').then((res) => {
      expect(res.status).to.eq(401);
      // resposta da API permanece em PT; isso é OK
      expect(res.body).to.have.property('message', 'Email e/ou senha inválidos');
    });
  });
});
