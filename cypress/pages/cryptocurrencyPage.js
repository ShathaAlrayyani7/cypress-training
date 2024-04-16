class cryptocurrencyPage {
  elements = {
    priceHeader: () => cy.get("[data-test=Price]"),
    hourHeader: () => cy.get("[data-test=1H]"),
    dayHeader: () => cy.get("[data-test=24H]"),
    weekHeader: () => cy.get("[data-test=7D]"),
  };

  mockData = {
    assets: [
      {
        symbol: "dana",
        displaySymbol: "btc",
        name: "Dana",
        slug: "bitcoin-btc",
        logo: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1696501400",
        temporaryDataDelay: false,
        price: 65994,
        percentage: 0.03068921894766434,
        percentage_1h: -0.008635448893160725,
        percentage_7d: -0.07021894108033475,
        changeValue: 1965,
        marketCap: 1301387129877,
        volume: 39307734743,
        FullCount: null,
        rank: 1,
        Status: "active",
        market_cap_percent_change_1d: 0.032646915031370016,
      },
      {
        symbol: "ethereum",
        displaySymbol: "eth",
        name: "Ethereum",
        slug: "ethereum-eth",
        logo: "https://assets.coingecko.com/coins/images/279/large/ethereum.png?1696501628",
        temporaryDataDelay: false,
        price: 3235,
        percentage: 0.07095091171524298,
        percentage_1h: -0.008539890074559417,
        percentage_7d: -0.07261416735945882,
        changeValue: 214.32000000000016,
        marketCap: 389271574683,
        volume: 21126000601,
        FullCount: null,
        rank: 2,
        Status: "active",
        market_cap_percent_change_1d: 0.07087278109706516,
      },
      {
        symbol: "tether",
        displaySymbol: "usdt",
        name: "Tether",
        slug: "tether-usdt",
        logo: "https://assets.coingecko.com/coins/images/325/large/Tether.png?1696501661",
        temporaryDataDelay: false,
        price: 1,
        percentage: 0,
        percentage_1h: 0,
        percentage_7d: -0.000999000999000889,
        changeValue: 0,
        marketCap: 107850172378,
        volume: 41878742326,
        FullCount: null,
        rank: 3,
        Status: "active",
        market_cap_percent_change_1d: 0.0012126352700238968,
      },
      {
        symbol: "binancecoin",
        displaySymbol: "bnb",
        name: "BNB",
        slug: "bnb-bnb",
        logo: "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png?1696501970",
        temporaryDataDelay: false,
        price: 580.25,
        percentage: 0.053333817416087274,
        percentage_1h: -0.00888135941270095,
        percentage_7d: -0.01735817104149026,
        changeValue: 29.379999999999995,
        marketCap: 89467450973,
        volume: 2237109556,
        FullCount: null,
        rank: 4,
        Status: "active",
        market_cap_percent_change_1d: 0.05456825380812138,
      },
      {
        symbol: "solana",
        displaySymbol: "sol",
        name: "Solana",
        slug: "solana-sol",
        logo: "https://assets.coingecko.com/coins/images/4128/large/solana.png?1696504756",
        temporaryDataDelay: false,
        price: 151.6,
        percentage: 0.09088292437216662,
        percentage_1h: -0.01684662417067779,
        percentage_7d: -0.1592724046140195,
        changeValue: 12.629999999999995,
        marketCap: 67748164162,
        volume: 6864208767,
        FullCount: null,
        rank: 5,
        Status: "active",
        market_cap_percent_change_1d: 0.09326702004901194,
      },
      {
        symbol: "usd-coin",
        displaySymbol: "usdc",
        name: "USDC",
        slug: "usdc-usdc",
        logo: "https://assets.coingecko.com/coins/images/6319/large/usdc.png?1696506694",
        temporaryDataDelay: false,
        price: 0.998915,
        percentage: -0.00035125782324225003,
        percentage_1h: -0.00023402316829372857,
        percentage_7d: -0.0040727816550347904,
        changeValue: -0.0003509999999999902,
        marketCap: 32281944587,
        volume: 9493005142,
        FullCount: null,
        rank: 6,
        Status: "active",
        market_cap_percent_change_1d: -0.0018692177388284963,
      },
      {
        symbol: "staked-ether",
        displaySymbol: "steth",
        name: "Lido Staked Ether",
        slug: "lido-staked-ether-steth",
        logo: "https://assets.coingecko.com/coins/images/13442/large/steth_logo.png?1696513206",
        temporaryDataDelay: false,
        price: 3227.54,
        percentage: 0.07276782301461467,
        percentage_1h: -0.008581291923634504,
        percentage_7d: -0.07268454139036697,
        changeValue: 218.92999999999984,
        marketCap: 30444279353,
        volume: 171197142,
        FullCount: null,
        rank: 7,
        Status: "active",
        market_cap_percent_change_1d: 0.07088415160074828,
      },
    ],
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

  filterData(criteria, order) {
    let filteredData;
    if (order == "de") {
      filteredData = this.mockData.assets.sort((element) => {});
    }
    else{
      filteredData = this.mockData.assets.sort((element) => {});
    }

    return filteredData;
  }
}

module.exports = new cryptocurrencyPage();
