/**
 * Detect bots based on user agent string
 * - Started with https://github.com/gjohnson/is-bot
 * - Also consulted https://github.com/piwik/device-detector/blob/master/regexes/bots.yml
 * - Consider using IP address https://myip.ms/info/bots/Google_Bing_Yahoo_Facebook_etc_Bot_IP_Addresses.html
 */

var isBotString = 'bot' +
// common in bot names
'|spider|crawl|slurp|scan|scrap|archiver|transcoder' +

// common cmd line programs
// curl appears in libcurl in some native app clients, thus ^curl
'|^curl|wget' +

// common languages and libraries
'|^ruby|^python|^java|perl|php|httpclient|http-client|wordpress' +

// sites which scrape or check urls
'|facebook|yahoo|^pinterest|HWCDN' +

// google app engine used by several bots, e.g. feedly
'|appengine' +

// ignore requests from the CDN
'|hwcdn' +

// end
'';

var isBotRegEx = new RegExp(isBotString, 'i');

exports.isBot = (userAgentString) => {
  return isBotRegEx.test(userAgentString);
}
