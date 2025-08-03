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
};
