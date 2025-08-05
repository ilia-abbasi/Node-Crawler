const config = require("./config");

function log(text, isTextVerbose = false) {
  if (isTextVerbose && !config.verboseMode) {
    return;
  }
  config.logString = `${config.logString}\n${text}`;
  console.log(text);
}

module.exports = {
  log,
};
