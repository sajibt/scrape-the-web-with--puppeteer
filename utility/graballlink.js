const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

let browser;

(async () => {
  browser = await puppeteer.launch();
  // browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto("https://www.checklyhq.com/learn/headless/basics-selectors/");
  await page.goto("https://books.toscrape.com/index.html");

  const links = await page.$$eval(".product_pod .image_container a", (atag) => atag.map((grabatag) => grabatag.href));
  console.log(links);
  const aoalinks = links.map((l) => [l]);

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(aoalinks);
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, "links.XLSX");

  await browser.close();
})(); // (asyn' function )(return something ) a function will return something at the end . create a anonymus function with synchronus function .
