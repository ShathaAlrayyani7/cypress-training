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
  context("with a mock data", () => {
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

    it("passes the four headers", () => {
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
          .should("have.css", "color", "rgb(51, 51, 51)")
          .should("have.text", "0.00%");
      });
    });
  });

  context("without mock data", () => {
    beforeEach(() => {
      cy.visit(
        "https://www.forbes.com/digital-assets/crypto-prices/?sh=6ed409832478",
        { timeout: 300_000 }
      );
    });

    it("should sort the prices dec", () => {
      const queryString = cryptocurrencyPage.getQueryString(params);
      // sortBy: "marketCap"

      // cy.wait("@getAllData", { timeout: 300_000 })
      //   .its("request.query")
      //   .then((query) => {
      //     expect(query.direction).to.equal("desc");
      //     expect(query.sortBy).to.equal("marketCap");
      //   });

      // const dayHeader = cryptocurrencyPage.elements.dayHeader();
      // dayHeader.scrollIntoView().should('be.visible')
      // dayHeader.wait(2000).click();
      // dayHeader.wait(2000).click();

      // cy.intercept(url, sortedMockData).as("getAllDataByPrice");
    });
  });
});
