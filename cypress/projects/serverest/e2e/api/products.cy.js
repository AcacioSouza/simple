/// <reference types="cypress" />
import { faker } from '@faker-js/faker';

describe('API - Products (admin required)', () => {
  let adminToken;

  before(() => {
    cy.apiLoginFromFixture('admin').then((token) => (adminToken = token));
  });

  it('should create a product successfully (201)', () => {
    const product = {
      nome: `Produto QA ${Date.now()}`,
      preco: faker.number.int({ min: 10, max: 9999 }),
      descricao: faker.commerce.productDescription(),
      quantidade: faker.number.int({ min: 1, max: 500 })
    };

    cy.apiRequest('POST', '/produtos', {
      headers: { Authorization: adminToken },
      body: product
    }).then((res) => {
      expect(res.status).to.eq(201);
      expect(res.body).to.have.property('message', 'Cadastro realizado com sucesso');
      expect(res.body).to.have.property('_id');
    });
  });

  it('should not allow duplicated product name (400)', () => {
    const name = `Produto Duplicado ${Date.now()}`;
    const base = { nome: name, preco: 123, descricao: 'Teste duplicado', quantidade: 10 };

    cy.apiRequest('POST', '/produtos', {
      headers: { Authorization: adminToken },
      body: base
    }).its('status').should('eq', 201);

    cy.apiRequest('POST', '/produtos', {
      headers: { Authorization: adminToken },
      failOnStatusCode: false,
      body: base
    }).then((res) => {
      expect(res.status).to.eq(400);
      expect(res.body).to.have.property('message', 'Já existe produto com esse nome');
    });
  });

  it('should require token to create a product (401)', () => {
    const product = { nome: `Produto Sem Token ${Date.now()}`, preco: 99, descricao: 'Sem token', quantidade: 3 };

    cy.apiRequest('POST', '/produtos', {
      failOnStatusCode: false,
      body: product
    }).then((res) => {
      expect(res.status).to.eq(401);
      expect(res.body).to.have.property(
        'message',
        'Token de acesso ausente, inválido, expirado ou usuário do token não existe mais'
      );
    });
  });
});
