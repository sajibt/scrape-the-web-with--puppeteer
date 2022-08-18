const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

let browser;

async function getpageData(url, page) {
  // browser = await puppeteer.launch();
  // browser = await puppeteer.launch({ headless: false });
  // const page = await browser.newPage();
  // await page.goto("https://www.checklyhq.com/learn/headless/basics-selectors/");
  await page.goto(url);

  // scrape title
  const h1 = await page.$eval(".product_main h1", (h1) => h1.textContent);
  const price = await page.$eval(".price_color", (price) => price.textContent);
  const isstock = await page.$eval(".instock.availability", (isstock) => isstock.innerText); //innerTEXT remove extra spacing .

  //if 2  class is on same line use . and diferent line  use  only space

  return {
    title: h1,
    price: price,
    isstock: isstock,
  };

  // await browser.close();
} // (asyn' function )(return something ) a function will return something at the end . create a anonymus function with synchronus function .

async function getLink() {
  browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto("https://books.toscrape.com/index.html");

  const links = await page.$$eval(".product_pod .image_container a", (atag) => atag.map((grabatag) => grabatag.href));
  return links;
  // const aoalinks = links.map((l) => [l]);
  // await browser.close();
}

async function main() {
  const allLinks = await getLink();
  // console.log(allLinks);
  browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  const scrapeData = [];

  for (let link of allLinks) {
    const data = await getpageData(link, page);
    // const secTomin = (Math.floor(Math.random() * 4) + 1) * 1000;
    // await page.waitFor(secTomin);
    // await page.waitFor(3000);
    scrapeData.push(data);
  }

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(scrapeData);
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, "books.XLSX");

  console.log(scrapeData);
  await browser.close();
}

main();
