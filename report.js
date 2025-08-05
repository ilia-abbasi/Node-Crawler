const { log } = require("./logger");

function printReport(pages) {
  log("--------------");
  log("|   REPORT   |");
  log("--------------");
  log("|");
  const sortedPages = sortPages(pages);
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0];
    const hits = sortedPage[1];
    log(`|- Found ${hits} links to ${url}`);
  }
  log("|");
  log("--------------");
  log("| END REPORT |");
  log("--------------");
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  sortPages,
  printReport,
};
