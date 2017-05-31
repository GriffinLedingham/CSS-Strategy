module.exports = function () {
  var general_Helper = {}

  general_Helper.sampleFunction = function(){
    console.log('This is a sample helper function.')
  }

  general_Helper.serverStarted = function(){
    console.log(general_Lang.serverStarted)
  }

  return general_Helper
}