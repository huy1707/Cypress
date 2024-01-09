//************************************************************
//                      WEB
// Created Date: 27/12/2023
// Author: HuyTB
// Description: commands for web UI
//************************************************************

/**
 * <b>Custom keyword name:</b>	: waitLoadingDone()<br></br>
 *
 * <b>General description:</b>	: Custom keyword wait for pageload </br></br>
 *
 */
Cypress.Commands.add("waitLoadingDone", () => {
  Cypress.log({ displayName: `WAIT`, message: `Wait for process to finish` });
  cy.xpath(`.loader`, { log: false }).should(`not.be.exist`);
});

/**
 * <b>Custom keyword name:</b>	: verifyClickable(objPath, expected, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom keyword verify whether element visible </br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param bExpected				: The boolean value to determine if the object is expected to be visible or not
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "verifyVisible",
  (objPath, bExpected, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut }).should(bExpected ? "be.visible" : "not.be.visible");
  }
);

/**
 * <b>Custom keyword name:</b>	: verifyPresent(objPath, expected, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom keyword verify whether element present </br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param bExpected				: The boolean value to determine if the object is expected to be present or not
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "verifyPresent",
  (objPath, bExpected, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut }).should(bExpected ? "exist" : "not.exist");
  }
);

/**
 * <b>Custom keyword name:</b>	: verifyClickable(objPath, expected, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom keyword verify whether a given object on the DOM is clickable </br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param bExpected				: The boolean value to determine if the object is expected to be clickable or not
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "verifyClickable",
  (objPath, bExpected, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut })
      .should(bExpected ? "be.visible" : "not.be.visible")
      .should(bExpected ? "be.enabled" : "not.be.enabled");
  }
);

/**
 * <b>Custom keyword name:</b>	: verifyObjectHasAttribute(objPath, sAttribute, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom keyword verify  whether a given object on the DOM has a specific attribute</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param sAttribute		  : The name of the attribute from that element
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "verifyObjectHasAttribute",
  (objPath, sAttribute, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut }).should("have.attr", sAttribute);
  }
);

/**
 * <b>Custom keyword name:</b>	: verifyObjectAttributeValueIsNotNull(objPath, sAttribute, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom command to verify if a given object on a web page has the attribute with the specified name and value that does not return null</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param sAttribute		  : The name of the attribute from that element
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "verifyObjectAttributeValueIsNotNull",
  (objPath, sAttribute, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut })
      .invoke("attr", sAttribute)
      .should("not.be.null");
  }
);


/**
 * <b>Custom keyword name:</b>	: confirmMatchContext(objPath, sMessage,bExpected , timeout)<br></br>
 *
 * <b>General description:</b>	:Custom command to confirm if the actual message matches the expected message</br></br>
 *
 * @param objPath			: The object in the Object Repository
 * @param sExpectedMessage	: The string of the expected text to compare with the toast message.
 * @param bPresent			: The boolean value to determine if the object is required to be presented or not
 * @param sAttribute		: The string of attribute to get text (Default value: 'textContent')
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "confirmMatchContext",
  (
    objPath,
    sMessage,
    bExpected,
    sAttribute = "textContent",
    iTimeOut = Cypress.config("defaultCommandTimeout")
  ) => {
    cy.xpath(objPath, { timeout: iTimeOut })
      .invoke("attr", sAttribute)
      .then((sActualMessage) => {
        if (
          (bExpected && sActualMessage === sMessage) ||
          (!bExpected && sActualMessage !== sMessage)
        ) {
          cy.log(
            `Verification successful! Object return ${
              bExpected ? "" : "not "
            } equal ${sMessage}`
          );
        } else {
          cy.log(
            `Verification failed! Object return ${
              bExpected ? "not " : ""
            } equal ${sMessage}`
          );
        }
      });
  }
);

/**
 * <b>Custom keyword name:</b>	: setTextToObject(objPath, oText, iTimeOut)<br></br>
 *
 * <b>General description:</b>	: Custom command to set a text string for the test object on a web page</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param oText					  : The text to set into the specified object
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "setTextToObject",
  (objPath, oText, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut }).clear().type(oText.toString());
  }
);

/**
 * <b>Custom keyword name:</b>	: setEncryptedTextToObject(objPath, sEncryptedText, iTimeOut)<br></br>
 *
 * <b>General description:</b>	: Custom command to set the encrypted text for the test object on a web page</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param sEncryptedText	: The encrypted text to set into the specified object
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "setEncryptedTextToObject",
  (
    objPath,
    sEncryptedText,
    iTimeOut = Cypress.config("defaultCommandTimeout")
  ) => {
    // Assuming there is a custom Cypress command for encrypted text input
    cy.setEncryptedText(objPath, sEncryptedText);
  }
);

/**
 * <b>Custom keyword name:</b>	: clickToButton(objPath, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom command to click a button on a web page</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "clickToButton",
  (objPath, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.verifyClickable(objPath, true, iTimeOut);
    cy.xpath(objPath, { timeout: iTimeOut }).click();
  }
);

/**
 * <b>Custom keyword name:</b>	: hoverMouseOverElement(objPath, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom command to hover the mouse over an element on a web page</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 */
Cypress.Commands.add(
  "hoverMouseOverElement",
  (objPath, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut })
      .should("be.visible")
      .trigger("mouseover");
  }
);

/**
 * <b>Custom keyword name:</b>	: getObjectId(objPath)<br></br>
 *
 * <b>General description:</b>	: Custom command to get the name of a test object</br></br>
 *
 * @param objPath					: A object of selector by xpath
 *
 * @return						  : The name of the object extracted from the provided xpath
 */
Cypress.Commands.add("getObjectId", (objPath) => {
  return objPath.split("/").pop();
});

/**
 * <b>Custom keyword name:</b>	: getTextFromObject(objPath, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom command to get a text string from a given object on a web page</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 * @return						  : The text content of the specified object
 */
Cypress.Commands.add(
  "getTextFromObject",
  (objPath, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.xpath(objPath, { timeout: iTimeOut })
      .should("be.visible")
      .invoke("text");
  }
);

/**
 * <b>Custom keyword name:</b>	: getTextFromObjectThroughAttribute(objPath, sAttribute, timeout)<br></br>
 *
 * <b>General description:</b>	: Custom command to get a text string from a given object on a web page through its attribute</br></br>
 *
 * @param objPath					: A object of selector by xpath
 * @param sAttribute			: The name of the attribute from that element
 * @param iTimeOut				: The time waiting for the object to display on the web page (Default value: defaultCommandTimeout)
 *
 * @return						  : The attribute value of the specified object
 */
Cypress.Commands.add(
  "getTextFromObjectThroughAttribute",
  (objPath, sAttribute, iTimeOut = Cypress.config("defaultCommandTimeout")) => {
    cy.verifyObjectHasAttribute(objPath, sAttribute, iTimeOut);
    cy.xpath(objPath, { timeout: iTimeOut })
      .should("be.visible")
      .invoke("attr", sAttribute);
  }
);

/**
 * <b>Custom keyword name:</b>	: getRandomizedNumber(iMaxDigits)<br></br>
 *
 * <b>General description:</b>	: Custom command to generate randomized numbers within a specified range of digits</br></br>
 *
 * @param iMaxDigits			: The maximum number of digits for the generated random number
 *
 * @return						  : A randomly generated number within the specified range
 */
Cypress.Commands.add("getRandomizedNumber", (iMaxDigits) => {
  const randomString = Cypress._.random(
    1,
    Math.pow(10, iMaxDigits) - 1
  ).toString();
  return parseInt(randomString);
});

/**
 * <b>Custom keyword name:</b>	: getCurrentDate()<br></br>
 *
 * <b>General description:</b>	: Custom command to get the current date in the format dd/MM/yyyy</br></br>
 *
 * @return						  : The current date in the format dd/MM/yyyy
 */
Cypress.Commands.add("getCurrentDate", () => {
  const currentDate = new Date();
  const dateFormat = Cypress.moment(currentDate).format("DD/MM/YYYY");
  return dateFormat;
});

/**
 * <b>Custom keyword name:</b>	: getFutureDate(iAmount, sField)<br></br>
 *
 * <b>General description:</b>	: Custom command to get a future date based on the provided amount and field (date/month/year)</br></br>
 *
 * @param iAmount				  : The amount to add to the current date
 * @param sField				  : The field specifying whether to add to date, month, or year
 *
 * @return						  : The future date in the format dd/MM/yyyy
 */
Cypress.Commands.add("getFutureDate", (iAmount, sField) => {
  const currentDate = Cypress.moment();
  const futureDate = currentDate.add(iAmount, sField).format("DD/MM/YYYY");
  return futureDate;
});




