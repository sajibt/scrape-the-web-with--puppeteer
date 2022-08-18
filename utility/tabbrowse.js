const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

let browser;

(async () => {
  // browser = await puppeteer.launch();
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://books.toscrape.com/catalogue/sharp-objects_997/index.html");

  const page2 = await browser.newPage();
  await page2.goto("https://books.toscrape.com/catalogue/a-light-in-the-attic_1000/index.html");

  const page3 = await browser.newPage();
  await page3.goto("https://books.toscrape.com/catalogue/the-coming-woman-a-novel-based-on-the-life-of-the-infamous-feminist-victoria-woodhull_993/index.html");

  page.bringToFront(); //for bringing page to the front page

  let tabs = await browser.pages();
  // for (let t of tabs) {
  //   let title = await t.title();
  //   console.log(title);
  // }
  // await tabs[0].bringToFront();
  // tabs[0].goto("https://facebook.com");
  await page.bringToFront();
  await page.waitFor(5000);
  var lasttab = tabs[tabs.length - 1];
  await lasttab.bringToFront();

  // await browser.close();
})();
