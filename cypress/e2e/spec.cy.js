import cryptocurrencyPage from "../pages/cryptocurrencyPage";

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
    cy.visit(
      "https://www.forbes.com/digital-assets/crypto-prices/?sh=6ed409832478"
    );
  });

  it("passes", () => {
    cryptocurrencyPage.elements.priceHeader().should("have.text", "Price");
    cryptocurrencyPage.elements.hourHeader().should("have.text", "1H");
    cryptocurrencyPage.elements.dayHeader().should("have.text", "24H");
    cryptocurrencyPage.elements.weekHeader().should("have.text", "7D");
  });

  // {
  //   url:       "https://fda.forbes.com/v2/tradedAssets?limit=100&pageNum=1&sortBy=marketCap&direction=desc&query=&category=ft*",
  //   query: { q: 'expected terms' },
  it("should sort the prices dec", () => {
    const queryString = cryptocurrencyPage.getQueryString(params);

    const url = `https://fda.forbes.com/v2/tradedAssets?*`;
    cy.intercept(url, cryptocurrencyPage.mockData).as("getAllData");
    // cy.wait("@getAllData", { timeout: 20000 })
    //   .its("response.statusCode")
    //   .should("eq", 200);
    cryptocurrencyPage.clickOnPrice();

    cy.wait("@getAllData", { timeout: 20000 })
    // cryptocurrencyPage.elements
    //   .priceHeader()
    //   .children()
    //   .last()
    //   .then((lastChild) => {
    //     lastChild.children().should();
    //   });

  });
});
