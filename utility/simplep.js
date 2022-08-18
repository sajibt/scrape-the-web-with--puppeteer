
const puppeteer = require("puppeteer");

let browser;

(async () => {
  browser = await puppeteer.launch();
  // browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://www.checklyhq.com/learn/headless/basics-selectors/");
  // await page.screenshot({ path: "zatayat.png" });
  const words = await page.evaluate(() => {
    const wordtag = document.querySelector(".markdown p");

    // if(document.getElementById("status") != null){
    // var idPost=document.getElementById("status").innerHTML;
    // }
    return wordtag.innerHTML; //innerText for just for text element
  });

  console.log(words);

  await browser.close();
})(); // (asyn' function )(return something ) a function will return something at the end . create a anonymus function with synchronus function .
