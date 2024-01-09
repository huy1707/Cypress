export class HealthPage {

  constructor() {
      // You can initialize any variables or do setup here
  }

  open() {
      cy.visit('/health');
      return this;
  }

  verifyTitle() {
      cy.title().should('include', 'Health Plans');
      return this;
  }

  verifyHeader() {
      cy.get('h1').should('contain', 'Health Plans');
      return this;
  }

  verifySubsection(subsectionName) {
      cy.contains('h2', subsectionName).should('exist');
      return this;
  }

  searchProviders(providerName) {
      cy.get('input[name="provider-search"]').type(`${providerName}{enter}`);
      return this;
  }

  selectFilter(filterOption) {
      cy.get('.filter-dropdown').select(filterOption);
      return this;
  }

  verifySearchResults() {
      cy.get('.search-results').should('exist');
      return this;
  }

  clickOnResult(resultIndex) {
      cy.get('.search-results').eq(resultIndex).click();
      return this;
  }

  waitLoadingDone() {
      cy.log({ displayName: `WAIT`, message: `Wait for process to finish` });
      cy.xpath(`.loader`, { log: false }).should(`not.be.exist`);
      return this;
  }
  
}
