// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./Common/commands";
require("cypress-xpath");
// Alternatively you can use CommonJS syntax:

Cypress.on("uncaught:exception", (err, runnable) => {
  // returning false here prevents Cypress from
  // failing the test
  if (
    err.message.includes("Cannot set properties of null (setting 'className')")
  ) {
    return false;
  }
  if (err.message.includes("document.querySelector(...) is null")) {
    return false;
  }
});