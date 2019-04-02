/**
 * webdriver downloads
 *   chrome: http://chromedriver.storage.googleapis.com/index.html
 *   firefox: https://github.com/mozilla/geckodriver/releases/latest
 */

// Selenium
const selenium = require("selenium-webdriver");

// Chrome options
const chrome = require("selenium-webdriver/chrome");
let chromeOptions = new chrome.Options();
chromeOptions.addArguments([
	"--no-sandbox",
	"--disable-dev-shm-usage"
]);

// Firefox options
const firefox = require("selenium-webdriver/firefox");
let firefoxOptions = new firefox.Options();
firefoxOptions.addArguments("--headless");

let browser = process.env.SELENIUM_BROWSER || "firefox";
console.log(browser);

const Driver = function() {
	return new selenium.Builder()
		.forBrowser(browser)
		.setChromeOptions(chromeOptions)
		.setFirefoxOptions(firefoxOptions)
		.build();
};

// Assertion engine
const chai = require("chai");

module.exports = {
	selenium,
	chai,
	Driver
};
