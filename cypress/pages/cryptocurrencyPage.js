class cryptocurrencyPage {
  elements = {
    priceHeader: () => cy.get("[data-test=Price]"),
    priceArrow: () => cy.get("[data-test=Price] span:nth-child(2)"),
    hourHeader: () => cy.get("[data-test=1H]"),
    dayHeader: () => cy.get("[data-test=24H]"),
    weekHeader: () => cy.get("[data-test=7D]"),
    rowCell1H: () => cy.get("[data-test=row-cell-1H] span"),
    rowCell1D: () => cy.get("[data-test=row-cell-24H] span"),
    rowCell7D: () => cy.get("[data-test=row-cell-7D] span"),
    rowCellPrice: () => cy.get("[data-test=row-cell-Price] span"),
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

  isSorted(arr, key) {
    let ascSorted = true;
    let descSorted = true;

    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i][key] > arr[i + 1][key]) {
        ascSorted = false; // If current element is greater than next, not ascending sorted
      } else if (arr[i][key] < arr[i + 1][key]) {
        descSorted = false; // If current element is less than next, not descending sorted
      }
    }

    if (ascSorted && descSorted) {
      // If both flags are still true, the array is neither sorted in ascending nor descending order
      return "Unsorted";
    } else if (ascSorted) {
      return "Ascending";
    } else if (descSorted) {
      return "Descending";
    } else {
      return "Unsorted";
    }
  }

  extractNumberFromString(string) {
    // Remove "$" sign and abbreviations (B, M, K) from the string
    const stringWithoutSymbols = string.replace(/\$|[BMK]/g, "");

    // Determine the multiplier based on the abbreviation
    let multiplier = 1;
    if (string.includes("B")) {
      multiplier = 1e9; // Billion
    } else if (string.includes("M")) {
      multiplier = 1e6; // Million
    } else if (string.includes("K")) {
      multiplier = 1e3; // Thousand
    } else if (string.includes("T")) {
      multiplier = 1e12; // Trillion
    }

    // Convert the string to a number
    const number = parseFloat(stringWithoutSymbols) * multiplier;

    return number;
  }
}

module.exports = new cryptocurrencyPage();
