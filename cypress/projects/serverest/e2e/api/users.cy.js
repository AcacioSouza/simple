/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('API - Users', () => {
  it('should create a user successfully (201)', () => {
    const payload = {
      nome: faker.person.fullName(),
      email: faker.internet.email({ provider: 'qa.com' }).toLowerCase(),
      password: 'Teste@123',
      administrador: 'false'
    };

    cy.apiRequest('POST', '/usuarios', { body: payload }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(res.body).to.have.property('_id').and.to.be.a('string').and.not.be.empty;
    });
  });

  it('should not allow duplicated email (400)', () => {
    const email = faker.internet.email({ provider: 'qa.com' }).toLowerCase();
    const base = { nome: faker.person.fullName(), email, password: 'Teste@123', administrador: 'false' };

    cy.apiRequest('POST', '/usuarios', { body: base }).its('status').should('eq', 201);

    cy.apiRequest('POST', '/usuarios', { failOnStatusCode: false, body: base }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('message', 'Este email já está sendo usado');
    });
  });

  it('should fetch a user by ID (200) after creation', () => {
    const payload = {
      nome: faker.person.fullName(),
      email: faker.internet.email({ provider: 'qa.com' }).toLowerCase(),
      password: 'Teste@123',
      administrador: 'false'
    };

    cy.apiRequest('POST', '/usuarios', { body: payload }).then((res) => {
      expect(res.status).to.eq(201);
      const id = res.body._id;

      cy.apiRequest('GET', `/usuarios/${id}`).then((getRes) => {
        expect(getRes.status).to.eq(200);
        expect(getRes.body).to.have.property('email', payload.email);
        expect(getRes.body).to.have.property('_id', id);
      });
    });
  });
});
