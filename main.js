const config = require("./config");
const { crawlPage } = require("./crawl");
const { log, saveLog } = require("./logger");
const { printReport } = require("./report");
const argv = process.argv;

async function main() {
  argv.splice(0, 2);

  handleArgv();

  const baseURL = argv[0];

  log(`Preparing to crawl ${baseURL} ...`);

  const pages = await crawlPage(baseURL, baseURL, {});
  printReport(pages);

  if (config.saveLogMode) {
    saveLog();
  }
}

function handleArgv() {
  if (argv.length === 0) {
    console.log("No arguments were given. Exitting with code 1.");
    process.exit(1);
  }

  if (argv.includes("v")) {
    config.verboseMode = true;
    argv.splice(argv.indexOf("v"), 1);
  }
  if (argv.includes("verbose")) {
    config.verboseMode = true;
    argv.splice(argv.indexOf("verbose"), 1);
  }

  if (argv.includes("l")) {
    config.saveLogMode = true;
    argv.splice(argv.indexOf("l"), 1);
  }
  if (argv.includes("save-log")) {
    config.saveLogMode = true;
    argv.splice(argv.indexOf("save-log"), 1);
  }

  if (argv.length === 0) {
    console.log("No URL was given. Exitting with code 1.");
    process.exit(1);
  }
}

try {
  main();
} catch (err) {
  console.error("Error catched in main.js on calling main(). More info:");
  console.log(err);
}
