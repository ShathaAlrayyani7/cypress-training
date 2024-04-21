import CryptocurrencyPage from "../pages/cryptocurrencyPage";
import mockData from "../fixtures/mockData.json";

describe("Testing Forbes's Cryptocurrency Prices Today table", () => {
  context("with mock data", () => {
    beforeEach(() => {
      cy.fixture("mockData").then((json) => {
        cy.intercept("GET", CryptocurrencyPage.tableDataUrl, json).as(
          "getAllData"
        );
      });

      cy.visit("/digital-assets/crypto-prices/?sh=6ed409832478");
    });

    it("should change color based on value", () => {
      cy.wait("@getAllData").then((res) => {
        CryptocurrencyPage.elements.rowCell1H().as("rowCell1H");
        CryptocurrencyPage.elements.rowCell1D().as("rowCell1D");
        CryptocurrencyPage.elements.rowCell7D().as("rowCell7D");

        CryptocurrencyPage.getAssertionsForTextColor(
          CryptocurrencyPage.dataForColorAssertions
        );
      });
    });
  });

  context("without mock data", () => {
    beforeEach(() => {
      cy.visit("/digital-assets/crypto-prices/?sh=6ed409832478");
    });

    it(
      "should sort the data based on prices in desc order",
      { scrollBehavior: false },
      () => {
        CryptocurrencyPage.elements.priceArrow().as("arrow");
        CryptocurrencyPage.elements.priceHeader().as("priceHeader");

        cy.scrollTo(0, 300);
        // make sure the arrow in not visible yet before the click.
        cy.get("@arrow").should("not.be.visible");
        cy.get("@priceHeader")
          .wait(2000)
          .click({ scrollBehavior: false, force: true });
        cy.get("@arrow").should("be.visible");

        cy.intercept(CryptocurrencyPage.tableDataUrl).as("getAllData");
        cy.wait("@getAllData").then((data) => {
          const query = data.request.query;
          const sortedData = data.response.body.assets;

          expect(query.direction).to.equal("desc");
          expect(query.sortBy).to.equal("price");

          CryptocurrencyPage.isSorted(sortedData?.slice(0, 20), "price").should(
            "eq",
            "Descending"
          );

          // make sure that sorted data is being displayed in the table
          CryptocurrencyPage.elements.rowCellPrice().as('rowCellPrice');
          for (let i = 0; i < 5; i++) {
            const cell = cy.get('@rowCellPrice').eq(i).text();
            expect(sortedData[i].price).to.equal(
              CryptocurrencyPage.extractNumberFromString(cell)
            );
          }
        });
      }
    );

    it(
      "should sort the data based on prices in asc order",
      { scrollBehavior: false },
      () => {
        CryptocurrencyPage.elements.priceArrow().as("arrow");
        CryptocurrencyPage.elements.priceHeader().as("priceHeader");

        cy.scrollTo(0, 300);
        // make sure the arrow in not visible yet before the click.
        cy.get("@arrow").should("not.be.visible");
        cy.get("@priceHeader")
          .wait(2000)
          .dblclick({ scrollBehavior: false, force: true });
        cy.get("@arrow").should("be.visible");

        cy.intercept(CryptocurrencyPage.tableDataUrl).as("getAllData");
        cy.wait("@getAllData").then((data) => {
          const query = data?.request?.query;
          const sortedData = data?.response?.body?.assets;

          expect(query.direction).to.equal("asc");
          expect(query.sortBy).to.equal("price");

          CryptocurrencyPage.isSorted(sortedData, "price").should(
            "eq",
            "Ascending"
          );

          // make sure that sorted data is being displayed in the table
          const rowCellPrice = CryptocurrencyPage.elements.rowCellPrice();
          for (let i = 0; i < 5; i++) {
            const cell = rowCellPrice.eq(i).text();
            expect(sortedData[i].price).to.equal(
              CryptocurrencyPage.extractNumberFromString(cell)
            );
          }
        });
      }
    );
  });
});
