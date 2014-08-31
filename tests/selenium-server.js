// Init selenium-webdriver
var SeleniumServer = require('selenium-webdriver/remote').SeleniumServer;

var server = new SeleniumServer('/Users/nmedda/Downloads/selenium-server-standalone-2.42.2.jar', {
  port: 4444
});

module.exports = server;
