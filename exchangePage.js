let dropdown, button, coin1_box, coin2_box;
dropdown = document.querySelectorAll(".dropdown");
button = document.getElementById("btn");
coin1_box = document.getElementById("coin1_box");
coin2_box = document.getElementById("coin2_box");

let url =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=marketCap_desc&per_page=100&page=1&sparkline=false&priceChange_percentage=24h";

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    symbolList(data);
    loadCoinLogo(data);
  });

function symbolList(data) {
  for (let i = 0; i < dropdown.length; i++) {
    let index = 0;
    for (let coin of data) {
      let symbol = coin.symbol.toUpperCase();

      let selected;
      if (i == 0) selected = symbol == "BTC" ? "selected" : "";
      else if (i == 1) selected = symbol == "USDT" ? "selected" : "";

      let optionTag = `<option id="${index}" value="${coin.id}" ${selected}>${symbol}</option>`;
      dropdown[i].innerHTML += optionTag;

      index++;
    }
  }
}

function loadCoinLogo(data) {
  for (let i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("change", (e) => {
      let select = e.target;
      let index = select.options[select.selectedIndex].id;
      let imgTag = select.previousElementSibling;
      imgTag.src = `${data[index].image}`;
    });
  }
}

button.addEventListener("click", () => {
  let coin1, coin2, amount;
  coin1 = dropdown[0].value;
  coin2 = dropdown[1].value;
  amount = coin1_box.value;

  console.log(coin1, coin2);
  if (amount == "" ) {
    coin1_box.value = "1";
    amount = 1;
  }

  if (coin1 != coin2) convert(coin1, coin2, amount);
  else alert("Please select different coins");
});

function convert(coin1, coin2, amount) {
  fetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${coin1}%2C${coin2}&vs_currencies=usd`
  )
    .then((response) => response.json())
    .then((data) => {
      let price1 = data[`${coin1}`].usd;
      let price2 = data[`${coin2}`].usd;

      coin2_box.value = (price1 / price2) * amount;
    });
}
