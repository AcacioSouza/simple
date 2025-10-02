// Cypress/projetos/serverest/e2e/web/mappings/HomePageMap.js
module.exports = {
  // Header comum (opcional)
  homeLink: '[data-testid="home"]',
  logoutButton: '[data-testid="logout"]',

  // ----- CUSTOMER -----
  customer: {
    // strings => assert 'be.visible' por padrão
    searchField: '[data-testid="pesquisar"]',
    productsList: '[data-testid="lista-de-compras"]'
  },

  // ----- ADMIN -----
  admin: {
    dashboardText: 'Este é seu sistema para administrar seu ecommerce.',
    userManagementLink: '[data-testid="listar-usuarios"]',
  },
};
