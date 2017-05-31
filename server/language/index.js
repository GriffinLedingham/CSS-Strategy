/**
* Language files present in language_config.js will be bound
* globally, accessable like so: "general_Lang.serverStarted"
**/
var config = require('../config/language_config')

module.exports = function () {
  for(index in config.langFiles) {
    global[config.langFiles[index]+'_Lang'] = require("./"+config.langFiles[index])
  }
}