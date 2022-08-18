const puppeteer = require("puppeteer");

let browser;

(async function main() {
  browser = await puppeteer.launch({ headless: false, defaultViewport: null });

  const [pageQuotes] = await browser.pages();
  const pageAbout = await browser.newPage();
  await pageQuotes.bringToFront(); // Otherwise, click on the next page link does not work.

  const pagesToScrape = 3;

  await pageQuotes.goto("https://quotes.toscrape.com/");
  let currentPage = 1;

  const data = { quotes: {}, abouts: {} };
  const visitedAbouts = new Set();

  while (currentPage <= pagesToScrape) {
    await pageQuotes.waitForSelector(".quote");

    const { quotes, aboutURLs } = await pageQuotes.evaluate(() => ({
      quotes: Array.from(document.querySelectorAll(".quote"), (quote) => [quote.querySelector("small.author").innerText, quote.innerText]),
      aboutURLs: Array.from(document.querySelectorAll(".quote small.author + a[href]"), (quote) => quote.href),
    }));

    for (const [author, quote] of quotes) {
      if (data.quotes[author] === undefined) data.quotes[author] = [];
      data.quotes[author].push(quote);
    }

    for (const aboutURL of aboutURLs) {
      if (!visitedAbouts.has(aboutURL)) {
        visitedAbouts.add(aboutURL);

        await pageAbout.goto(aboutURL);
        await pageAbout.waitForSelector("div.author-details");

        const { title, about } = await pageAbout.evaluate(() => ({
          title: document.querySelector("div.author-details h3.author-title").innerText,
          about: document.querySelector("div.author-details").innerText,
        }));

        data.abouts[title] = about;
      }
    }

    if (currentPage < pagesToScrape) {
      const nextLink = await pageQuotes.waitForSelector("li.next > a");

      await Promise.all([nextLink.click(), pageQuotes.waitForNavigation()]);
    }
    currentPage++;
  }

  console.log(JSON.stringify(data, null, "  "));
})()
  .catch(console.error)
  .finally(async () => {
    if (browser) await browser.close();
  });
