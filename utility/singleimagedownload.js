const puppeteer = require("puppeteer");
const XLSX = require("xlsx");
const downloader = require("./module/download");
const path = require("path");

const filepath = path.resolve(__dirname, "images/test");
let browser;

(async () => {
  // browser = await puppeteer.launch();
  browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto("http://books.toscrape.com/catalogue/set-me-free_988/index.html", { timeout: 5000 });
    const imageURL = await page.$eval(".thumbnail .item.active img", (img) => img.src);
    console.log(imageURL);
    downloader.download(imageURL, filepath, function (filename) {
      console.log(`Download complete ${filename}`);
    });
  } catch (err) {
    console.log("something went wrong");
  }

  //if you  don't use try catch 2nd program could never run it stopped bcz first one has a errror .
  await browser.close();
})();
