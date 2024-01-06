const API_KEY = 'MNSVOUUW9TV3QE9O';
let monthlyClosePrices = [];
let months = [];
async function init() {
  await loadPrice();
  await loadMonthlyPrice();
  renderChart();
}

async function loadPrice() {
  let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=ETH&to_currency=EUR&apikey=${API_KEY}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  let fetchedCurrentPrice =
    Math.ceil(
      responseAsJSON['Realtime Currency Exchange Rate']['5. Exchange Rate'] *
        100
    ) / 100;

  let currentPrice = document.getElementById('current-price');

  currentPrice.innerHTML = /*html*/ `
    <span>current price:&nbsp; &nbsp;</span><b> ${fetchedCurrentPrice}€</b>
  `;
}

async function loadMonthlyPrice() {
  url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=ETH&market=EUR&apikey=${API_KEY}`;
  let response = await fetch(url);
  let responseAsJSON = await response.json();
  const FIRST_LAYER = 'Time Series (Digital Currency Monthly)';
  const THIRD_LAYER = '4a. close (EUR)';

  const timeSeriesData = responseAsJSON[FIRST_LAYER];

  let dates = Object.keys(timeSeriesData).slice(0, 24);
  months = [...dates];
  months.reverse();

  for (let i = 0; i < dates.length; i++) {
    let datesElement = dates[i];
    let closingPrice = timeSeriesData[datesElement][THIRD_LAYER];
    monthlyClosePrices.push(closingPrice);
    monthlyClosePrices.reverse();
  }

  console.log(monthlyClosePrices);
  console.log(months);
}
