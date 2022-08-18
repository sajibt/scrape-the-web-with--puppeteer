const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

let browser;

(async () => {
  // browser = await puppeteer.launch();
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  const page2 = await browser.newPage();

  try {
    await page.goto("https://books.toscrfkjsdklape.comfdksjklh/catalogue/sharp-objects_997/index.html", { timeout: 5000 });
  } catch (err) {
    console.log("this page can not be loaded! ");
  }

  try {
    await page2.goto("https://books.toscrape.com/index.html");
  } catch (err) {
    console.log("something went wrong!");
  }
  //if you  don't use try catch 2nd program could never run it stopped bcz first one has a errror .
  await browser.close();
})();
