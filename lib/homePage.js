let Page = require('./basePage');
const locator = require('../utils/locator');
const fake = require('../utils/fakeData');

const searchInputSelectorClassName = locator.searchInputSelectorClassName;
// const searchInputSelectorId = locator.searchInputSelectorId;
const searchButtonSelectorName = locator.searchButtonSelectorName;
const resultConfirmationSelectorId = locator.resultConfirmationId;

const fakeNameKeyword = fake.nameKeyword;

let searchInput, searchButton, resultStat;

Page.prototype.findInputAndButton = async function () {
    // searchInput = await this.findByCSS(".gLFyf.gsfi");
    // searchInput = await this.findByName("q");
    // searchInput = await this.findByClassName("gsfi");
    searchInput = await this.findByClassName(searchInputSelectorClassName);
    // console.log("search input is...", searchInputSelectorClassName);
    // searchInput = await this.findById(searchInputSelectorId);
    searchButton = await this.findByName(searchButtonSelectorName);
    // console.log("search button is...", searchButton);

    const result = await this.driver.wait(async function () {
        const searchButtonText = await searchButton.getAttribute('value');
        const searchInputEnableFlag = await searchInput.isEnabled();

        return {
            inputEnabled: searchInputEnableFlag,
            buttonText: searchButtonText
        }
    }, 5000);
    return result;
};

Page.prototype.submitKeywordAndGetResult = async function() {
    await this.findInputAndButton();
    const temp = await this.write(searchInput, fakeNameKeyword);
    // console.log("result is...", temp);
    await searchButton.click();
    // this.driver.sleep(5000);
    console.log("resultConfirmationSelectorId", resultConfirmationSelectorId);

    resultStat = await this.findById(resultConfirmationSelectorId);
    console.log("resultStat is...", resultStat);
    return await this.driver.wait(async function () {
        return await resultStat.getText();
    }, 5000);
};

module.exports = Page;