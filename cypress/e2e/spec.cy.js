import cryptocurrencyPage from "../pages/cryptocurrencyPage";
import mockData from "../fixtures/mockData.json";


describe("Testing Forbes's Cryptocurrency Prices Today table", () => {
  context("with mock data", () => {
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
        const rowCell1H = cryptocurrencyPage.elements.rowCell1H();
        const rowCell1D = cryptocurrencyPage.elements.rowCell1D();
        const rowCell7D = cryptocurrencyPage.elements.rowCell7D();

        rowCell1H
          .eq(0)
          .should("have.text", "+0.86%")
          .should("have.css", "color", "rgb(0, 153, 51)");

        rowCell1D
          .eq(1)
          .should("have.text", "-7.10%")
          .should("have.css", "color", "rgb(220, 0, 0)");

        rowCell7D
          .eq(2)
          .should("have.text", "0.00%")
          .should("have.css", "color", "rgb(51, 51, 51)");
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

    it(
      "should sort the data based on prices in desc order",
      { scrollBehavior: false },
      () => {
        const arrow = cryptocurrencyPage.elements.priceArrow();
        const priceHeader = cryptocurrencyPage.elements.priceHeader();
        const url = `https://fda.forbes.com/v2/tradedAssets?*`;

        cy.scrollTo(0, 300);
        // make sure the arrow in not visible yet before the click.
        arrow.should("not.be.visible");
        priceHeader.wait(2000).click({ scrollBehavior: false, force: true });
        arrow.should("be.visible");

        cy.intercept(url).as("getAllData");
        cy.wait("@getAllData", { timeout: 300_000 }).then((data) => {
          const query = data.request.query;
          const sortedData = data.response.body.assets;

          expect(query.direction).to.equal("desc");
          expect(query.sortBy).to.equal("price");

          cryptocurrencyPage
            .isSorted(sortedData?.slice(0, 20), "price")
            .should("eq", "Descending");

          // make sure that sorted data is being displayed in the table
          const rowCellPrice = cryptocurrencyPage.elements.rowCellPrice();
          for (let i = 0; i < 5; i++) {
            const cell = rowCellPrice.eq(i).text();
            expect(sortedData[i].price).to.equal(
              cryptocurrencyPage.extractNumberFromString(cell)
            );
          }
        });
      }
    );

    it(
      "should sort the data based on prices in asc order",
      { scrollBehavior: false },
      () => {
        const arrow = cryptocurrencyPage.elements.priceArrow();
        const priceHeader = cryptocurrencyPage.elements.priceHeader();
        const url = `https://fda.forbes.com/v2/tradedAssets?*`;

        cy.scrollTo(0, 300);
        // make sure the arrow in not visible yet before the click.
        arrow.should("not.be.visible");
        priceHeader.wait(2000).dblclick({ scrollBehavior: false, force: true });
        arrow.should("be.visible");

        cy.intercept(url).as("getAllData");
        cy.wait("@getAllData", { timeout: 300_000 }).then((data) => {
          const query = data?.request?.query;
          const sortedData = data?.response?.body?.assets;

          expect(query.direction).to.equal("asc");
          expect(query.sortBy).to.equal("price");

          cryptocurrencyPage
            .isSorted(sortedData, "price")
            .should("eq", "Ascending");

          // make sure that sorted data is being displayed in the table
          const rowCellPrice = cryptocurrencyPage.elements.rowCellPrice();
          for (let i = 0; i < 5; i++) {
            const cell = rowCellPrice.eq(i).text();
            expect(sortedData[i].price).to.equal(
              cryptocurrencyPage.extractNumberFromString(cell)
            );
          }
        });
      }
    );
  });
});
