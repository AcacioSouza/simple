// cypress/projects/serverest/e2e/web/pages/HomePage.js
const homeMap = require('../mappings/HomePageMap');

class HomePage {
  // Asserta o header comum (se existir no mapping)
  assertCommonHeader() {
    const header = [homeMap.homeLink, homeMap.logoutButton].filter(Boolean);
    header.forEach((sel) => cy.get(sel).should('be.visible'));
  }

  // Asserta uma coleção de seletores (strings ou objetos com instrução)
  assertSection(section) {
    if (!section) return;

    const items = Array.isArray(section)
      ? section
      : typeof section === 'object'
      ? Object.values(section)
      : [];

    items.forEach((item) => {
      if (typeof item === 'string') {
        cy.get(item).should('be.visible');
      } else if (item && typeof item === 'object') {
        const { selector, assert } = item;
        const assertion = assert || 'be.visible';
        cy.get(selector).should(assertion);
      }
    });
  }

  // Asserta a home conforme a role
  assertRole(role) {
    this.assertCommonHeader();

    switch (role) {
      case 'customer':
        this.assertSection(homeMap.customer);
        break;

      case 'admin':
        cy.contains(homeMap.admin.dashboardText).should('be.visible');
        this.assertSection({
          userManagementLink: homeMap.admin.userManagementLink,
        });
        break;

      default:
        throw new Error(`Role desconhecida: ${role}`);
    }
  }

  // ✅ novo: ação de logout para ser usada no final dos cenários válidos
  logout() {
    if (!homeMap.logoutButton) {
      throw new Error('Selector de logoutButton não definido em HomePageMap.js');
    }
    cy.get(homeMap.logoutButton).click();
  }
}

module.exports = new HomePage();
