const puppeteer = require("puppeteer");

let browser;

(async () => {
  browser = await puppeteer.launch();
  // browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto("https://www.checklyhq.com/learn/headless/basics-selectors/");
  await page.goto("https://quotes.toscrape.com/");

  const scrapeQuotes = await page.evaluate(() => {
    const quotes = document.querySelectorAll(".quote");
    const quoteslist = [];
    quotes.forEach((qlist) => {
      const quotesAll = qlist.querySelectorAll("span");
      const mainquotee = quotesAll[0];
      const spanquotes = quotesAll[1];

      const authorname = spanquotes.querySelector("small");

      quoteslist.push({
        quote: mainquotee.innerText,
        author: authorname.innerText,
      });
    });
    return quoteslist;
  });
  console.log(scrapeQuotes);

  await browser.close();
})(); // (asyn' function )(return something ) a function will return something at the end . create a anonymus function with synchronus function .
