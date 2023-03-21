let name_list = {
  BTC: "Bitcoin",
  ETH: "Ethereum",
  USDT: "Tether",
  XRP: "Ripple",
  SOL: "Solana",
  AVAX: "Avalanche",
  MATIC: "Polygon",
  ALGO: "Algorand",
  VET: "Vechain",
  KDA: "Kadena",
};

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    
  });


