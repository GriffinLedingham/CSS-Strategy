/**
* Language files present in helper_config.js will be bound
* globally, accessable like so: "general_Helper.sampleFunction()"
**/
var config = require('../config/helper_config')

module.exports = function () {
  for(index in config.helperFiles) {
    global[config.helperFiles[index]+'_Helper'] = module.exports = new require("./"+config.helperFiles[index]+"_helper")()
  }
}