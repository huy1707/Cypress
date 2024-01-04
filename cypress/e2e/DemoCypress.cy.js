import { homePage } from "../support/pageSelectors/Common/homePageSelector.js";
import { constantsTitle, errMessage} from "../support/pageSelectors/Common/constants.js";
import { healthPlanSelector } from "../support/pageSelectors/HealthPlan/loginSelector.js";
import { loginPage } from "../support/pageSelectors/Common/loginSelector.js";

describe("Check page sagaftraplans", function () {
  it("Verify title", function () {
    //access page
    // cy.visit(Cypress.env("products_url"));

    // // Wait for the page title to contain the expected text
    // cy.title().should("include", constantsTitle.Homepage);

    // // Add more assertions if needed
    // // For example, check for the presence of a specific element on the page
    // cy.xpath(homePage.txvHealthPlan).should("exist");

    // cy.verifyPresent(homePage.txvHealthPlan,true)
    // //Click to textview Health Plan
    // cy.xpath(homePage.txvHealthPlan).click();

    // //Verify loading success
    // cy.xpath(healthPlanSelector.btnLogin).should("exist");

    // //Click to button Login
    // cy.xpath(healthPlanSelector.btnLogin).click();

    // //Verify loading success
    // cy.xpath(loginPage.iptUsername).should("exist");

    // //input username
    // cy.xpath(loginPage.iptUsername).type("Huytb");

    // //input password
    // cy.xpath(loginPage.iptPassword).type("123");

    // //Click to button submit
    // cy.xpath(loginPage.btnSubmit).click();

    // //verify error message
    // cy.xpath(loginPage.txtLoginFailed).should("have.text",errMessage.loginFailed);

    // Call the custom command to make the API request
    cy.makeApiRequest().then((response) => {
      // Call the custom command to assert the API response
      cy.assertApiResponseCode(response);
      // Additional assertions or actions based on the response can be added here
      cy.assertApiPageDetails(response);
      // Iterate through user data and call the custom command to assert user details
      response.body.data.forEach((userData) => {
        cy.assertUserData(userData);
      });
     
    });



    // const dbName = 'stagingA'
    // const query = 'SELECT category_id, category_name FROM testing.category WHERE category_id IN (2);'
    // cy.log(`Running the following query: ${query}`);
    // // cy.runDatabaseQuery(dbName,query)
    // cy.task('queryDatabase', { dbName, query }).then((result) => {
    //   // Use the result as needed
    //   cy.log(`Received result in the test: ${JSON.stringify(result)}`);
    //   // Add assertions or other test logic here
    // });
  });
});
