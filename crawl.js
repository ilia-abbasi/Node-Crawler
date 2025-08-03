const { JSDOM } = require("jsdom");

function normalizeURL(urlString) {
  if (!urlString.startsWith("http")) {
    urlString = `http://${urlString}`;
  }

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
  console.log(`Actively crawling ${currentURL}`);
  console.log("Checking URL's validity ...");

  if (!isValidURL(currentURL)) {
    console.error(
      `
Invalid URL. Check if the link you provided is formatted correctly as a valid URL.
You may have forgotten to include the protocol of the URL.
      `
    );
    return pages;
  }

  if (!currentURL.startsWith("http")) {
    currentURL = `http://${currentURL}`;
  }

  const baseURLObj = new URL(baseURL);
  const currentURLObj = new URL(currentURL);
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    console.log(
      "URL is not on the same host as the base URL. Stopping crawl on this page."
    );
    return pages;
  }

  const normalizedCurrentURL = normalizeURL(currentURL);
  if (pages[normalizedCurrentURL] > 0) {
    console.log("URL has been already crawled. Moving on.");
    pages[normalizedCurrentURL]++;
    return pages;
  }

  pages[normalizedCurrentURL] = 1;

  console.log(`Sending GET request to ${currentURL} ...`);

  try {
    const resp = await fetch(currentURL);
    if (resp.status > 399) {
      console.log(
        `Error: Status code ${resp.status} was recieved while fetching ${currentURL}`
      );
      return pages;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Error: Response was ${contentType} instead of HTML while fetching ${currentURL}`
      );
      return pages;
    }

    const htmlBody = await resp.text();
    const nextURLs = getURLsFromHTML(htmlBody, currentURL);

    console.log(`Crawling successful for ${currentURL}`);

    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages);
    }
  } catch (err) {
    console.log(`Something went wrong while fetching ${currentURL} :`);
    console.log(err);
  }

  return pages;
}

function isValidURL(string) {
  if (!string.includes(".")) {
    return false;
  }
  if (!string.startsWith("http")) {
    string = `http://${string}`;
  }
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  isValidURL,
  crawlPage,
};
