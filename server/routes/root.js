/**
* Root Express Route
* This is where the app will hit at its root
**/
var express = require('express')
var fs = require('fs')
var path = require('path');
var whacko = require('whacko')
var _             = require('lodash')

module.exports = function () {
  var routes = express.Router()

  routes.get('/',(req,res) => {
    fs.readFile('server/views/index.html', 'utf8',(err, fileData)=>{
      var $ = whacko.load(fileData)

      cache_Helper.setCacheScripts($)

      fs.readFile('www/templates/template.html', 'utf8',(err, temps)=>{
        $('#templates').html(temps)

        $('#app').html(template_Helper.loadTemplate('gameTemplate'))

        res.send($.html())
        res.end()
        $ = null
      })
    })
  })

  return routes
}