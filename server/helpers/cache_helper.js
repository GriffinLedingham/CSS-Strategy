module.exports = function () {
  var cache_Helper = {}

  cache_Helper.setCacheScripts = function($) {
    // var cache_object = require('../../www/scripts/grunt-cache-bust.json')
    // $('link[href="/styles/styles.css"]').attr('href', cache_object['www/styles/styles.css'].replace('www',''))
    // $('script[src="/scripts/game.js"]').attr('src', cache_object['www/scripts/game.js'].replace('www',''))
    // $('script[src="/scripts/libs.js"]').attr('src', cache_object['www/scripts/libs.js'].replace('www',''))
  }

  return cache_Helper
}