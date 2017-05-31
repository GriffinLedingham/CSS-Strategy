/**
* API Express Routes
**/
var express = require('express')

module.exports = function () {
  var routes = express.Router()
  
  routes.get('/api/:value',(req,res) => {
    var result = false
    var value = req.params.value
    var data = {
      value: value
    }

    res.send(data)
    res.end()
  })

  
  return routes
}
