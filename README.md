# Cypress E2E + API Tests - ServeRest

Automated tests for [ServeRest](https://github.com/PauloGoncalvesBH/ServeRest) using **Cypress**, **Cucumber (Gherkin)**, and the **Page Objects pattern**.  
This project includes both **UI (end-to-end)** tests and **API** tests.

---

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/AcacioSouza/simple
   cd cypress-serverest-tests
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

---

## ▶️ Running the tests

### 1. Open Cypress in interactive mode (UI)
```bash
npx cypress open
```
- Select **E2E Testing**  
- Choose the browser  
- Pick the test to run  

### 2. Run tests in headless mode
```bash
npx cypress run --headless
```

### 3. Run only **UI (feature) tests**
```bash
npx cypress run --headless --spec "cypress/projects/serverest/e2e/web/features/**/*.feature"
```

### 4. Run only **API tests**
```bash
npx cypress run --headless --spec "cypress/projects/serverest/e2e/api/**/*.cy.js"
```

### 5. Run UI tests filtered by tags (Cucumber)
```bash
npx cypress run --headless   --spec "cypress/projects/serverest/e2e/web/features/**/*.feature"   --env tags='@valid'
```

---

## 📂 Project structure

```
cypress/
 ├─ projects/
 │   └─ serverest/
 │      ├─ e2e/
 │      │   ├─ api/              # API test specs
 │      │   └─ web/
 │      │      ├─ features/      # Gherkin .feature files
 │      │      ├─ pages/         # Page Objects
 │      │      ├─ steps/         # Step Definitions
 │      │      └─ mappings/      # Page locators (selectors)
 │      └─ resources/            # Fixtures (loginData, static_text, etc.)
 └─ support/                     # Custom commands (e.g., apiCommands.js)
cypress.config.js                # Cypress configuration
package.json                     # Dependencies and scripts
```

---

## 🧰 Tech stack

- [Cypress](https://www.cypress.io/)  
- [Cucumber Preprocessor](https://github.com/badeball/cypress-cucumber-preprocessor)  
- [Faker.js](https://fakerjs.dev/) for random test data  
- Page Objects pattern  
