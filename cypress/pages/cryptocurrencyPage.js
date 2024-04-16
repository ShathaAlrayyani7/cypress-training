class cryptocurrencyPage {
  elements = {
    priceHeader: () => cy.get('[data-test=Price]'),
    hourHeader: () => cy.get("[data-test=1H]"),
    dayHeader: () => cy.get("[data-test=24H]"),
    weekHeader: () => cy.get("[data-test=7D]"),
    rowCell1H: () => cy.get("[data-test=row-cell-1H] span"),
    rowCell1D: () => cy.get("[data-test=row-cell-24H] span"),
    rowCell7D: () => cy.get("[data-test=row-cell-7D] span"),
  };

  clickOnPrice() {
    this.elements.priceHeader().click();
  }

  getQueryString(params) {
    const query = Object.entries(params)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
    return query;
  }

}

module.exports = new cryptocurrencyPage();
