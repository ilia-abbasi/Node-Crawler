const { JSDOM } = require("jsdom");

function normalizeURL(urlString) {
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

    if (url.charAt(0) == "/") {
      url = `${baseURL}${url}`;
    }
    if (!isValidURL(url)) {
      continue;
    }

    urls.push(normalizeURL(url));
  }

  return urls;
}

async function crawlPage(url) {
  console.log("Checking URL's validity ...");

  if (!isValidURL(url)) {
    console.error(
      `
Invalid URL. Check if the link you provided is formatted correctly as a valid URL.
You may have forgotten to include the protocol of the URL.
      `
    );
    process.exit(1);
  }

  console.log("Sending GET request to URL ...");

  try {
    const resp = await fetch(url);
    if (resp.status > 399) {
      console.log(
        `Error: Status code ${resp.status} was recieved while fetching ${url}`
      );
      return;
    }

    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(
        `Error: Response was ${contentType} instead of HTML while fetching ${url}`
      );
      return;
    }

    console.log(await resp.text());
  } catch (err) {
    console.log(`Something went wrong while fetching ${url} :`);
    console.log(err);
  }
}

function isValidURL(string) {
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
