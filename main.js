const { crawlPage } = require("./crawl.js");
const argv = process.argv;

async function main() {
  argv.splice(0, 2);

  if (argv.length !== 1) {
    console.log(`Exactly 1 argument is expected. You provided ${argv.length}.`);
    process.exit(1);
  }

  const baseURL = argv[0];

  console.log(`Preparing to crawl ${baseURL} ...`);

  const pages = await crawlPage(baseURL, baseURL, {"holder":0});
  for (const page of Object.entries(pages)) {
    console.log(page);
  }
}

try {
  main();
} catch (err) {
  console.error("Error catched in main.js on calling main(). More info:");
  console.log(err);
}
