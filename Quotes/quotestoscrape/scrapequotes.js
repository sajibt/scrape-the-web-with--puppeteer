const puppeteer = require("puppeteer");
const XLSX = require("xlsx");

let url = "https://quotes.toscrape.com/";
(async function getDetails() {
  const browser = await puppeteer.launch({ headless: false, args: ["--no-sandbox"] });
  const page = await browser.newPage();
  await page.goto(url);

  let allQuote = await page.$$eval(".quote .text", (text) =>
    text.map((grabtext) => {
      return {
        text: grabtext.innerText,
      };
    })
  );
  console.log(allQuote);
  // const author = await page.$$eval(".quote span .author", (author) => author.map((authorname) => authorname.innerText));
  const author = await page.$$eval(".quote span .author", (author) =>
    author.map((authorname) => {
      return {
        author: authorname.innerText,
      };
    })
  );
  console.log(author);

  // return {
  //   allQuote,
  //   author,
  // };

  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(allQuote, author);
  XLSX.utils.book_append_sheet(wb, ws);
  XLSX.writeFile(wb, "books.XLSX");
  await browser.close();
})();

// async function main() {
//   const quotesData = getDetails();

//   const scrapeData = [];

//   // await page.waitFor(3000);

//   // let data = (await quotesData).author;
//   // let quote = (await quotesData).allQuote;
//   // scrapeData.push(quote, data);
//   // console.log(scrapeData);

//   // const wb = XLSX.utils.book_new();
//   // const ws = XLSX.utils.json_to_sheet(scrapeData);
//   // XLSX.utils.book_append_sheet(wb, ws);
//   // XLSX.writeFile(wb, "books.XLSX");
// }
// main();
