const { Then } = require('@badeball/cypress-cucumber-preprocessor');
const HomePage = require('../pages/HomePage');

Then('the home page for my {string} is loaded', (role) => {
  HomePage.assertRole(role);
});
