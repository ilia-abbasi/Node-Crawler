function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  let result = `${urlObj.hostname}${urlObj.pathname}`;

  //result = result.toLowerCase();

  if (result.length >= 1 && result.slice(-1) === "/") {
    result = result.slice(0, -1);
  }

  return result;
}

module.exports = {
  normalizeURL,
};
