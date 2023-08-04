const { remote } = require('webdriverio');

module.exports =
async function getChampion(expectedRole) {
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





