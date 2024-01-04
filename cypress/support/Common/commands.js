// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//************************************************************
//                      WEB
// Created Date: 27/12/2023
// Author: HuyTB
// Description: waiting loading done
//************************************************************
Cypress.Commands.add("waitLoadingDone", () => {
  Cypress.log({ displayName: `WAIT`, message: `Wait for process to finish` });
  cy.xpath(`.loader`, { log: false }).should(`not.be.exist`);
});

// //Custom command to wait element until it present
// Cypress.Commands.add('waitUntilPresent', (selector, expected, timeout = Cypress.config('defaultCommandTimeout')) => {
//   cy.xpath(selector, { timeout: timeout }).should(expected ? 'exist' : 'not.exist');
// });

// //Custom command to wait element until it visible
// Cypress.Commands.add('waitUntilVisible', (selector, expected, timeout = Cypress.config('defaultCommandTimeout')) => {
//   cy.xpath(selector, { timeout: timeout }).should(expected ? 'be.visible' : 'not.be.visible');
// });

// //Custom command to wait element until it clickable
// Cypress.Commands.add('waitUntilClickable', (selector, expected, timeout = Cypress.config('defaultCommandTimeout')) => {
//   cy.xpath(selector, { timeout: timeout }).should(expected ? 'be.enabled' : 'not.be.enabled');
// });

//Custom command to verify element until it visible
Cypress.Commands.add('verifyVisible', (selector, expected, timeout = Cypress.config('defaultCommandTimeout')) => {
  // cy.waitUntilVisible(selector, expected, timeout);
  cy.xpath(selector, { timeout: timeout }).should(expected ? 'be.visible' : 'not.be.visible');
});

//Custom command to verify element until it present
Cypress.Commands.add('verifyPresent', (selector, expected, timeout = Cypress.config('defaultCommandTimeout')) => {
  // cy.waitUntilPresent(selector, expected, timeout);
  cy.xpath(selector, { timeout: timeout }).should(expected ? 'exist' : 'not.exist');
});

// Custom command to verify whether a given object on the DOM is clickable
Cypress.Commands.add('verifyClickable', (objPath, bExpected, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut })
    .should(bExpected ? 'be.visible' : 'not.be.visible')
    .should(bExpected ? 'be.enabled' : 'not.be.enabled');
});

// Custom command to verify whether a given object on the DOM has a specific attribute
Cypress.Commands.add('verifyObjectHasAttribute', (objPath, sAttribute, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut }).should('have.attr', sAttribute);
});

// Custom command to verify if a given object on a web page has the attribute with the specified name and value that does not return null
Cypress.Commands.add('verifyObjectAttributeValueIsNotNull', (objPath, sAttribute, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut }).invoke('attr', sAttribute).should('not.be.null');
});

// Custom command to confirm if the actual message matches the expected message
Cypress.Commands.add('confirmMatchContext', (objPath, sMessage, bExpected, sAttribute = 'textContent', iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut }).invoke('attr', sAttribute).then((sActualMessage) => {
    if ((bExpected && sActualMessage === sMessage) || (!bExpected && sActualMessage !== sMessage)) {
      cy.log(`Verification successful! Object return ${bExpected ? '' : 'not '} equal ${sMessage}`);
    } else {
      cy.log(`Verification failed! Object return ${bExpected ? 'not ' : ''} equal ${sMessage}`);
    }
  });
});

// Custom command to set a text string for the test object on a web page
Cypress.Commands.add('setTextToObject', (objPath, oText, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut }).clear().type(oText.toString());
});

// Custom command to set the encrypted text for the test object on a web page
Cypress.Commands.add('setEncryptedTextToObject', (objPath, sEncryptedText, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  // Assuming there is a custom Cypress command for encrypted text input
  cy.setEncryptedText(objPath, sEncryptedText);
});

// Custom command to click a button on a web page
Cypress.Commands.add('clickToButton', (objPath, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.verifyClickable(objPath, true, iTimeOut);
  cy.xpath(objPath, { timeout: iTimeOut }).click();
});

// Custom command to hover the mouse over an element on a web page
Cypress.Commands.add('hoverMouseOverElement', (objPath, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut }).should('be.visible').trigger('mouseover');
});

// Custom command to get the name of a test object
Cypress.Commands.add('getObjectId', (objPath) => {
  return objPath.split('/').pop();
});

// Custom command to get a text string from a given object on a web page
Cypress.Commands.add('getTextFromObject', (objPath, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.xpath(objPath, { timeout: iTimeOut }).should('be.visible').invoke('text');
});

// Custom command to get a text string from a given object on a web page through its attribute
Cypress.Commands.add('getTextFromObjectThroughAttribute', (objPath, sAttribute, iTimeOut = Cypress.config('defaultCommandTimeout')) => {
  cy.verifyObjectHasAttribute(objPath, sAttribute, iTimeOut);
  cy.xpath(objPath, { timeout: iTimeOut }).should('be.visible').invoke('attr', sAttribute);
});

// Custom command to generate randomized numbers within a specified range of digits
Cypress.Commands.add('getRandomizedNumber', (iMaxDigits) => {
  const randomString = Cypress._.random(1, Math.pow(10, iMaxDigits) - 1).toString();
  return parseInt(randomString);
});

// Custom command to get the current date in the format dd/MM/yyyy
Cypress.Commands.add('getCurrentDate', () => {
  const currentDate = new Date();
  const dateFormat = Cypress.moment(currentDate).format('DD/MM/YYYY');
  return dateFormat;
});

// Custom command to get a future date based on the provided amount and field (date/month/year)
Cypress.Commands.add('getFutureDate', (iAmount, sField) => {
  const currentDate = Cypress.moment();
  const futureDate = currentDate.add(iAmount, sField).format('DD/MM/YYYY');
  return futureDate;
});








//************************************************************
//                            API
// Created Date: 27/12/2023
// Author: HuyTB
// Description:
//************************************************************


Cypress.Commands.add("makeApiRequest", () => {
  return cy.request(Cypress.env("apiUrl"));
});

Cypress.Commands.add("assertApiResponseCode", (response) => {
  expect(response.status, "Expected status code to be 200").to.equal(200);
  // Add more assertions based on your API response structure
});

Cypress.Commands.add('assertApiPageDetails', (response) => {
  expect(response.body.page, 'Expected page to be 1').to.equal(1);
  expect(response.body.per_page, 'Expected per_page to be 6').to.equal(6);
  expect(response.body.total, 'Expected total to be 12').to.equal(12);
  expect(response.body.total_pages, 'Expected total_pages to be 2').to.equal(2);
});

Cypress.Commands.add('assertUserData', (userData) => {
  expect(userData.id, `Expected id to be ${userData.id}`).to.be.a('number');
  expect(userData.email, `Expected email to be ${userData.email}`).to.be.a('string');
  expect(userData.first_name, `Expected first_name to be ${userData.first_name}`).to.be.a('string');
  expect(userData.last_name, `Expected last_name to be ${userData.last_name}`).to.be.a('string');
  expect(userData.avatar, `Expected avatar URL to match`).to.match(/^https:\/\/reqres\.in\/img\/faces\/\d+-image\.jpg$/);
});

Cypress.Commands.add('assertSupportSection', (response) => {
  expect(response.body.support.url, 'Expected support URL to match').to.equal('https://reqres.in/#support-heading');
  expect(response.body.support.text, 'Expected support text to match').to.equal('To keep ReqRes free, contributions towards server costs are appreciated!');
});


//************************************************************
//                            EXCEL
// Created Date: 27/12/2023
// Author: HuyTB
// Description: 
//************************************************************

const xlsxPopulate = require('xlsx-populate');

Cypress.Commands.add('setExcelFile', (filePath, fileName, sheetName) => {
  cy.readFile(`${filePath}/${fileName}`, 'binary').then((fileContent) => {
    return xlsxPopulate.fromDataAsync(fileContent);
  }).then((workbook) => {
    const sheet = workbook.sheet(sheetName);
    const columns = {};

    sheet.row(1).forEach((cell, index) => {
      columns[cell.value()] = index;
    });

    cy.wrap({ workbook, sheet, columns });
  });
});

Cypress.Commands.add('getCellData', { prevSubject: true }, (subject, columnName, rowNum) => {
  const cell = subject.sheet.row(rowNum + 1).cell(subject.columns[columnName]);
  return cell.value() || '';
});

Cypress.Commands.add('getRowNum', { prevSubject: true }, (subject) => {
  return subject.sheet.usedRange().endCell().rowNumber() - 1;
});

Cypress.Commands.add('updateExcelCell', { prevSubject: true }, (subject, cellAddress, cellValue) => {
  const address = xlsxPopulate.utils.decodeCell(cellAddress);
  subject.sheet.cell(address.row, address.column).value(cellValue);
  return subject.workbook.outputAsync();
});

Cypress.Commands.add('getExcelCellValue', { prevSubject: true }, (subject, cellAddress) => {
  const address = xlsxPopulate.utils.decodeCell(cellAddress);
  return subject.sheet.cell(address.row, address.column).value();
});




// commands.js
Cypress.Commands.add('getMySQLData', () => {
  return cy.request('/api/data');
});


Cypress.Commands.add('runDatabaseQuery', (dbName, query) => {
  cy.log(`Running the following query: ${query}`);

  return cy.task('queryDatabase', { dbName, query }).then((result) => {
    // Log or handle the result as needed
    cy.log(`Query result: ${JSON.stringify(result)}`);
    return result;
  });
});