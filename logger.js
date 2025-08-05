const { verboseMode, logString } = require("./config");

function log(text, isTextVerbose = false) {
  if (isTextVerbose && !verboseMode) {
    return;
  }
  logString = `${logString}\n${text}`;
  console.log(text);
}

module.exports = {
  log,
};
