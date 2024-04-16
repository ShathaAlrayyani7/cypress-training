import cryptocurrencyPage from "../pages/cryptocurrencyPage";
import mockData from "../fixtures/mockData.json";

const params = {
  limit: "100",
  pageNum: "1",
  sortBy: "marketCap",
  direction: "desc",
  query: "",
  category: "ft",
};

describe("template spec", () => {
  beforeEach(() => {
    const url = `https://fda.forbes.com/v2/tradedAssets?*`;
    cy.fixture("mockData").then((json) => {
      cy.intercept("GET", url, json).as("getAllData");
    });
    cy.visit(
      "https://www.forbes.com/digital-assets/crypto-prices/?sh=6ed409832478",
      { timeout: 300_000 }
    );
  });

  it("passes", () => {
    cryptocurrencyPage.elements.priceHeader().should("have.text", "Price");
    cryptocurrencyPage.elements.hourHeader().should("have.text", "1H");
    cryptocurrencyPage.elements.dayHeader().should("have.text", "24H");
    cryptocurrencyPage.elements.weekHeader().should("have.text", "7D");
  });

  it("should change color based on value", () => {
    cy.wait("@getAllData", { timeout: 300_000 }).then((res) => {
      cy.log("🚀 ~ .then ~ res:", res);

      const rowCell1H = cryptocurrencyPage.elements.rowCell1H();
      const rowCell1D = cryptocurrencyPage.elements.rowCell1D();
      const rowCell7D = cryptocurrencyPage.elements.rowCell7D();

      rowCell1H
        .eq(0)
        .should("have.css", "color", "rgb(0, 153, 51)")
        .should("have.text", "+0.86%");

      rowCell1D
        .eq(1)
        .should("have.css", "color", "rgb(220, 0, 0)")
        .should("have.text", "-7.10%");

      rowCell7D
        .eq(2)
        .should("have.css", "color", "rgb(220, 0, 0)")
        .should("have.text", "0.00%");
    });
  });
});
