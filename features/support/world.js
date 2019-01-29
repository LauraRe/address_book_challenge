const { setWorldConstructor } = require('cucumber')
const { expect } = require('chai')
const  puppeteer  = require('puppeteer')

const HOME_PAGE = 'http://localhost:3000'

class AddressBookWorld {
    constructor() {}

    async openHomePage() {
        this.browser = await puppeteer.launch({headless: false, slowmo: 100})
        this.page = await this.browser.newPage()
        await this.page.goto(HOME_PAGE)
    }
}

setWorldConstructor(AddressBookWorld)