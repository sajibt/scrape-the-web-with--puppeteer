const puppeteer = require("puppeteer");

let browser;

(async () => {
  browser = await puppeteer.launch();
  // browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  // await page.goto("https://www.checklyhq.com/learn/headless/basics-selectors/");
  await page.goto("https://www.w3docs.com/learn-html/html-ul-tag.html");
  // await page.screenshot({ path: "zatayat.png" });
  // const words = await page.evaluate(() => {
  //   const wordtag = document.querySelector(".markdown p");

  //   return wordtag.innerHTML; //innerText for just for text element
  // });
  // console.log(words);
  const wordsui = await page.evaluate(() => {
    const wordlist = document.querySelectorAll(".how-style ul li");
    // use query sellector all for grab all content from a webpage .
    let arraylist = [];
    wordlist.forEach((tag) => {
      arraylist.push(tag.innerText);
    });
    return arraylist;
  });
  console.log(wordsui);

  await browser.close();
})(); // (asyn' function )(return something ) a function will return something at the end . create a anonymus function with synchronus function .
