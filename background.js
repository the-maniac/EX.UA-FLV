/**
 * Clicked button or not
 * @type {boolean}
 */
var executed = false;

//adding button click event
chrome.browserAction.onClicked.addListener(function(tab) {
	if (!executed) {
		chrome.tabs.executeScript(null, {file: "jquery-1.11.1.js"}, function () {
			chrome.tabs.executeScript(null, {file: "content.js"});
		});
		executed = true;
	}
});