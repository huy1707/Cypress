//************************************************************
//                            EXCEL
// Created Date: 27/12/2023
// Author: HuyTB
// Description:
//************************************************************

const xlsxPopulate = require("xlsx-populate");

Cypress.Commands.add("setExcelFile", (filePath, fileName, sheetName) => {
  cy.readFile(`${filePath}/${fileName}`, "binary")
    .then((fileContent) => {
      return xlsxPopulate.fromDataAsync(fileContent);
    })
    .then((workbook) => {
      const sheet = workbook.sheet(sheetName);
      const columns = {};

      sheet.row(1).forEach((cell, index) => {
        columns[cell.value()] = index;
      });

      cy.wrap({ workbook, sheet, columns });
    });
});

Cypress.Commands.add(
  "getCellData",
  { prevSubject: true },
  (subject, columnName, rowNum) => {
    const cell = subject.sheet
      .row(rowNum + 1)
      .cell(subject.columns[columnName]);
    return cell.value() || "";
  }
);

Cypress.Commands.add("getRowNum", { prevSubject: true }, (subject) => {
  return subject.sheet.usedRange().endCell().rowNumber() - 1;
});

Cypress.Commands.add(
  "updateExcelCell",
  { prevSubject: true },
  (subject, cellAddress, cellValue) => {
    const address = xlsxPopulate.utils.decodeCell(cellAddress);
    subject.sheet.cell(address.row, address.column).value(cellValue);
    return subject.workbook.outputAsync();
  }
);

Cypress.Commands.add(
  "getExcelCellValue",
  { prevSubject: true },
  (subject, cellAddress) => {
    const address = xlsxPopulate.utils.decodeCell(cellAddress);
    return subject.sheet.cell(address.row, address.column).value();
  }
);

// commands.js
Cypress.Commands.add("getMySQLData", () => {
  return cy.request("/api/data");
});

Cypress.Commands.add("runDatabaseQuery", (dbName, query) => {
  cy.log(`Running the following query: ${query}`);

  return cy.task("queryDatabase", { dbName, query }).then((result) => {
    // Log or handle the result as needed
    cy.log(`Query result: ${JSON.stringify(result)}`);
    return result;
  });
});