var whacko = require('whacko')
var fs = require('fs')
var Handlebars = require('handlebars')

module.exports = function () {
  var template_Helper = {}

  template_Helper.loadTemplate = function(key, vars){
    var $ = whacko.load(fs.readFileSync('www/templates/template.html', 'utf8'))
    if(typeof vars == 'undefined') { vars = {} }
    var temp = Handlebars.compile($('#'+key).html())
    $ = null
    var out = temp(vars)
    temp = null
    return out
  }

  return template_Helper
}