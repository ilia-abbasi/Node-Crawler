const config = require("./config");
const fs = require("fs");
const folderName = "logs";

let filePath = folderName + "/log";

function log(text, isTextVerbose = false) {
  if (isTextVerbose && !config.verboseMode) {
    return;
  }
  config.logString = `${config.logString}${text}\n`;
  console.log(text);
}

function saveLog() {
  // Making logs folder if it does not exist
  try {
    if (!fs.existsSync(folderName)) {
      fs.mkdirSync(folderName);
    }
  } catch (err) {
    console.log(
      `An error occurred while trying to make the ${folderName} folder:`
    );
    console.log(err);
  }
  // Finding an unused name for the log file
  let i = 0;
  while (fs.existsSync(`${filePath}${i}.txt`)) {
    i++;
  }
  filePath = `${filePath}${i}.txt`;
  // Saving logString to file
  try {
    fs.writeFileSync(filePath, config.logString);
    console.log(`Log was saved in ${filePath}`);
  } catch (err) {
    console.log(`An error occurred while trying to save log in ${filePath}:`);
    console.log(err);
  }
}

module.exports = {
  log,
  saveLog,
};
