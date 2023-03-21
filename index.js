let tableBody = document.querySelector("#myTable");

let url ='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=marketCap_desc&per_page=100&page=1&sparkline=false&priceChange_percentage=24h';

fetch(url)
  .then((response) => response.json())
  .then((data) => {
    show(data);
  });

function show(data) {
  let rank=1;
  for (let coin of data) {
    let name, price, symbol, priceChange, priceDirection, marketCap, volume;
    name=coin.name;
    symbol=coin.symbol.toUpperCase();
    price='$'+coin.current_price;
    priceChange=coin.price_change_percentage_24h.toFixed(2)+'%';
    marketCap='$'+coin.market_cap.toLocaleString("en-US");
    volume='$'+coin.total_volume.toLocaleString("en-US");

    if(priceChange[0]=='-') priceDirection='down';
    else priceDirection='up';
      
    tableBody.innerHTML+= 
    `<tr id="${name}">
      <td>${rank}</td>
      <td><img src="${coin.image}" alt="" /> ${name} <span class="symbol">${symbol}</span></td>
      <td>${price}</td>
      <td class="${priceDirection}">${priceChange}</td>
      <td>${marketCap}</td>
      <td>${volume}</td>
    </tr>`;
    rank++;
  }
}

function search() {
  let searchBox, filter, row, txtValue;
  searchBox = document.getElementById("searchBox");
  filter = searchBox.value.toUpperCase();
  row = document.getElementsByTagName("tr");

  for (i = 1; i < row.length; i++) {
    txtValue = row[i].id;
    
    if (txtValue.toUpperCase().indexOf(filter) > -1) 
      row[i].style.display = "";
    else 
      row[i].style.display = "none";
  }
}
