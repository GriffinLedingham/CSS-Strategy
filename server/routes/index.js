/**
* Routes present in route_config.js will be loaded here,
* and bound in express.
**/
var config = require('../config/route_config')


module.exports = function (app) {
  var routes = {}
  for(index in config.routeFiles) {
    app.use('/'+config.routeFiles[index], require("./"+config.routeFiles[index])())
  }

  app.use('/', require("./"+'root')())

  var catchErrors = function(err, req, res, next) {
    console.error("Error in " + req.method + " " + req.url + ":", err)
    res.status(400).send(err.message)
    return next(err)
  }

  app.use(catchErrors)

  return routes
}
