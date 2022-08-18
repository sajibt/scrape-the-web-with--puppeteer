const browser = await puppeteer.launch();
  const page = await browser.newPage();
  giturl  = ('https://github.com/siddhart1o1');
    await page.goto(giturl , {waitUntil: 'networkidle2'})

    let data =  await page.evaluate(()=>{
        let stars  = document.querySelector('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(3) > span').innerText
        let followers = document.querySelector('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span').innerText
        let following = document.querySelector('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.js-profile-editable-replace > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(2) > span').innerText
        let repos = document.querySelector('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div.UnderlineNav.user-profile-nav.d-block.d-md-none.position-sticky.top-0.pl-3.ml-n3.mr-n3.pr-3.color-bg-primary > nav > a:nth-child(2) > span').innerText
        //this code is giving error
        let li = document.querySelector('div.js-profile-timeline-year-list.color-bg-primary.js-sticky > ul').getElementsByTagName('li')
        array = []
        for (let i = 0; i <= li.length - 1; i++) {
          array.push(li[i]);
        }

        return{
            stars,
            followers,
            following,
            repos,
            array
        }


    })

    console.log(data)
  await browser.close();
})();




const puppeteer = require("puppeteer"); // ^13.5.1

let browser;
(async () => {
  browser = await puppeteer.launch({headless: false});
  const [page] = await browser.pages();
  await page.setRequestInterception(true);
  page.on("request", req => {
    req.resourceType() === "image" ? req.abort() : req.continue();
  });
  const url = "https://en.afew-store.com/products/air-jordan-4-retro-tour-yellow-dark-blue-grey-white";
  await page.goto(url, {waitUntil: "domcontentloaded"});
  const size = "8.5";
  const xp = `//a[contains(@class, "btn-sm") and text()="${size}"]`;
  const sizeButton = await page.waitForXPath(xp);
  await sizeButton.evaluate(btn => {
    btn.closest("li").dispatchEvent(new Event("mousedown"));
    //  ^--- .parentNode is also possible instead of .closest("li")
  });
  await page.waitForTimeout(10000);
})()
  .catch(err => console.error(err))
  .finally(() => browser?.close())
;
