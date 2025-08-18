const config = require("./config");
const { crawlPage } = require("./crawl");
const { log, saveLog } = require("./logger");
const { printReport } = require("./report");
const argv = process.argv;

async function main() {
  argv.splice(0, 2);

  handleArgv();

  const baseURL = argv[0];

  try {
    const baseURLObj = new URL(baseURL);
    config.protocol = baseURLObj.protocol;
  } catch (err) {
    log(`
Invalid URL. Check if the link you provided is formatted correctly as a valid URL.
You may have forgotten to include the protocol of the URL.
      `);
    saveLog();
    process.exit(1);
  }

  log(`Preparing to crawl ${baseURL} ...`);

  await crawlPage(baseURL, baseURL);
  printReport();

  saveLog();
}

function handleArgv() {
  if (argv.length === 0) {
    console.log("No arguments were given. Exitting with code 1.");
    saveLog();
    process.exit(1);
  }

  if (argv.includes("h") || argv.includes("help")) {
    showHelp();
    process.exit(0);
  }

  if (argv.includes("v")) {
    config.verboseMode = true;
    argv.splice(argv.indexOf("v"), 1);
  }
  if (argv.includes("verbose")) {
    config.verboseMode = true;
    argv.splice(argv.indexOf("verbose"), 1);
  }

  if (argv.includes("s")) {
    config.saveLogMode = true;
    argv.splice(argv.indexOf("s"), 1);
  }
  if (argv.includes("save-log")) {
    config.saveLogMode = true;
    argv.splice(argv.indexOf("save-log"), 1);
  }

  if (argv.length === 0) {
    console.log("No URL was given. Exitting with code 1.");
    saveLog();
    process.exit(1);
  }
}

function showHelp() {
  console.log(`
Usage: npm start [target-url] [options]

Options:
    h  OR  help           Shows this section. Explains different options.
    v  OR  verbose        Logs more messages to the console, including the
                          reason for skipping or failing to crawl a webpage.
    l  OR  save-log       Logs will be saved after the execution of program.
    `);
}

try {
  main();
} catch (err) {
  console.error("Error catched in main.js on calling main(). More info:");
  console.log(err);
}
