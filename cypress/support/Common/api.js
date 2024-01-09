//************************************************************
//                            API
// Created Date: 27/12/2023
// Author: HuyTB
// Description:
//************************************************************

/**
 * <b>Custom keyword name:</b>	: makeApiRequest()<br></br>
 *
 * <b>General description:</b>	: Custom command to make an API request</br></br>
 *
 * @return						  : The Cypress request object for the API call
 */
Cypress.Commands.add("makeApiRequest", () => {
  return cy.request(Cypress.env("apiUrl"));
});

/**
 * <b>Custom keyword name:</b>	: assertApiResponseCode(response)<br></br>
 *
 * <b>General description:</b>	: Custom command to assert the status code of an API response</br></br>
 *
 * @param response			  : The API response object to assert
 */
Cypress.Commands.add("assertApiResponseCode", (response) => {
  expect(response.status, "Expected status code to be 200").to.equal(200);
  // Add more assertions based on your API response structure
});
/**
 * <b>Custom keyword name:</b>	: assertApiPageDetails(response)<br></br>
 *
 * <b>General description:</b>	: Custom command to assert specific details of an API response related to pagination</br></br>
 *
 * @param response			  : The API response object to assert
 */
Cypress.Commands.add("assertApiPageDetails", (response) => {
  expect(response.body.page, "Expected page to be 1").to.equal(1);
  expect(response.body.per_page, "Expected per_page to be 6").to.equal(6);
  expect(response.body.total, "Expected total to be 12").to.equal(12);
  expect(response.body.total_pages, "Expected total_pages to be 2").to.equal(2);
});
/**
 * <b>Custom keyword name:</b>	: assertUserData(userData)<br></br>
 *
 * <b>General description:</b>	: Custom command to assert details of user data obtained from an API response</br></br>
 *
 * @param userData				: The user data object to assert
 */
Cypress.Commands.add("assertUserData", (userData) => {
  expect(userData.id, `Expected id to be ${userData.id}`).to.be.a("number");
  expect(userData.email, `Expected email to be ${userData.email}`).to.be.a(
    "string"
  );
  expect(
    userData.first_name,
    `Expected first_name to be ${userData.first_name}`
  ).to.be.a("string");
  expect(
    userData.last_name,
    `Expected last_name to be ${userData.last_name}`
  ).to.be.a("string");
  expect(userData.avatar, `Expected avatar URL to match`).to.match(
    /^https:\/\/reqres\.in\/img\/faces\/\d+-image\.jpg$/
  );
});
/**
 * <b>Custom keyword name:</b>	: assertSupportSection(response)<br></br>
 *
 * <b>General description:</b>	: Custom command to assert details of the support section obtained from an API response</br></br>
 *
 * @param response			  : The API response object to assert
 */
Cypress.Commands.add("assertSupportSection", (response) => {
  expect(response.body.support.url, "Expected support URL to match").to.equal(
    "https://reqres.in/#support-heading"
  );
  expect(response.body.support.text, "Expected support text to match").to.equal(
    "To keep ReqRes free, contributions towards server costs are appreciated!"
  );
});
