



import { Builder, By, Key, until } from "selenium-webdriver";


(async function example() {
    let driver = await new Builder().forBrowser('chrome').build();
    try {
      await driver.get('https://nextplayinternshipclient.onrender.com');
      let title = await driver.getTitle();
      console.log('Page title is:', title);
      await driver.sleep(7000); // waits 3 seconds
      
    } finally {
      await driver.quit();
    }
  })();