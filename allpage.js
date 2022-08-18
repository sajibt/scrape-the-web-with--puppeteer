const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

let browser;

(async () => {
  // browser = await puppeteer.launch();
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://books.toscrape.com/index.html");

  //if this is not null(true) it will return something $ sign ensure it otherwise it will give null .

  while (await page.$(".pager .next a")) {
    // code block to executed
    num = await page.click(".pager .next a");
    await page.waitForTimeout(5000);
  }

  // await browser.close();
})();
