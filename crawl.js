const { JSDOM } = require("jsdom");
const { log } = require("./logger");
const config = require("./config");

function normalizeURL(urlString) {
  urlString = appendProtocol(urlString);

  const urlObj = new URL(urlString);
  let result = `${urlObj.hostname}${urlObj.pathname}`;

  if (result.length >= 1 && result.slice(-1) === "/") {
    result = result.slice(0, -1);
  }

  return result;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const linkElements = dom.window.document.querySelectorAll("a");

  for (const linkElement of linkElements) {
    let url = linkElement.href;

    if (url.charAt(0) === "/") {
      url = `${baseURL}${url}`;
    }
    if (!isValidURL(url)) {
      continue;
    }

    urls.push(normalizeURL(url));
  }

  return urls;
}

async function crawlPage(baseURL, currentURL, pages) {
  log(`Actively crawling ${currentURL}`);
  log("Checking URL's validity ...", true);

  if (!isValidURL(currentURL)) {
    log("Invalid URl. Stopping crawl on this page.");
    log("Failed");
    return pages;
  }

  currentURL = appendProtocol(currentURL);

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    log("URL is not on the same host as the base URL. Moving on.", true);
    log("Skipped");
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    log("URL has been already crawled. Moving on.", true);
    log("Skipped");
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  log(`Sending GET request to ${currentURL} ...`, true);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      log(
        `Error: Status code ${resp.status} was recieved while fetching ${currentURL}`,
        true
      );
      log("Failed");
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      log(
        `Error: Response was ${contentType} instead of HTML while fetching ${currentURL}`,
        true
      );
      log("Failed");
      return pages;
    }

    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, currentURL);

    log(`Crawling successful for ${currentURL}`, true);
    log("Success");

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    log(`Something went wrong while fetching ${currentURL} :`, true);
    log(err, true);
    log("Failed");
  }

  return pages;
}

function isValidURL(string) {
  if (!string.includes(".")) {
    return false;
  }
  string = appendProtocol(string);
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function appendProtocol(string) {
  if (!string.startsWith("http")) {
    string = `${config.protocol}//${string}`;
  }
  return string;
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  isValidURL,
  crawlPage,
};
