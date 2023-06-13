//const fs = require('fs');
//const path = require("path");
const { remote } = require('webdriverio');
//import {Builder, By} from 'selenium-webdriver';
//import chrome from 'selenium-webdriver/chrome';                                   //doesnt work idk why
//Button, Key, until, WebElement


/*module.exports = async function getChampion(expectedRole) {
    const driver = new Builder().forBrowser('chrome')
        .setChromeOptions(new chrome.Options().windowSize({height:1680,width:1024}),
            new chrome.Options().headless())
        .build();   //строим драйвера  а мы плотники
    //.usingServer('http://192.168.2.34:4444')
    let roleName;
    let championName;
    let pageScreen;
    let currentURL;
    const url = 'https://www.ultimate-bravery.net/Classic?s=';
    //let driver = await new Builder().forBrowser('chrome').build();
    try {
        while (true){
            await driver.get(url);
            roleName = await driver.findElement(
                By.xpath('/html/body/div/div/div/div[1]/div[1]/div/div[1]/div[2]/h1/div/img'))
                .getAttribute('title');
            if(expectedRole === roleName || expectedRole === 'Random'){

                championName = await driver.findElement(
                    By.className("champion-name"))
                    .getText();

                    currentURL = await driver.getCurrentUrl();

                pageScreen = await driver.findElement(
                    By.xpath('/html/body/div/div/div/div[1]/div[1]/div'))
                    .takeScreenshot();
                break;
            }
        }
    }finally {
        base64ToPNG(pageScreen,championName);
        driver.close();
    }
    return {url:currentURL, name: championName};
}

function base64ToPNG(data,championName) {
    data = data.replace(/^data:image\/png;base64,/, '');

    fs.writeFile(path.resolve(__dirname, `../discordbot/lolimages/image${championName}.png`), data, 'base64', function(err) {
        if (err) throw err;
    });
}
*/
module.exports =
async function getChampion(expectedRole,side) {
    const browser = await remote({
        capabilities: {
            browserName: 'chrome'
        }
    })
    await browser.url('https://www.ultimate-bravery.net/');
    for(let i = 1;i<6;i++){
        await browser.$(`//*[@id="roles"]/div[${i}]/img`).click();
    }
    let i = 0;
    console.log(expectedRole);
    switch (expectedRole){
        case 'Top':
            i = 1;
            break;
        case 'Jungle':
            i = 2;
            break;
        case 'Mid':
            i = 3;
            break;
        case 'Bot':
            i = 4;
            break;
        case 'Support':
            i = 5;
            break;
    }
    await browser.$(`//*[@id="roles"]/div[${i}]/img`).click();
    const letsgo = await browser.$('//*[@id="braveryBtn"]');
    await letsgo.click();
    await browser.pause(500);

    const screenShot = await browser.$('/html/body/div[1]/div/div/div[1]/div[1]')
    await screenShot.saveScreenshot('./lolimages/screenshot.png')
    await browser.deleteSession();
}





