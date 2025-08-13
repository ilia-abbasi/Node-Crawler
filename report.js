const { log } = require("./logger");

function printReport() {
  log("--------------");
  log("|   REPORT   |");
  log("--------------");
  log("|");
  const sortedPages = sortPagesObj(config.pages);
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

function sortPagesObj(pagesObj) {
  const pagesArr = Object.entries(pagesObj);
  pagesArr.sort((a, b) => {
    aHits = a[1];
    bHits = b[1];
    return b[1] - a[1];
  });
  return pagesArr;
}

module.exports = {
  sortPagesObj,
  printReport,
};
