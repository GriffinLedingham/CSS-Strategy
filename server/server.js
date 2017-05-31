var express       = require('express')
var bodyParser    = require("body-parser")
var app           = express()
var http          = require('http').Server(app)
var _             = require('lodash')
var compression   = require('compression')
var Game          = require('./classes/game')
var Player        = require('./classes/player')

app.use(compression({
  filter: function (req, res) {
    return true;
  }
}))
app.use(express.static('www'))
app.use( bodyParser.json() )
app.use(bodyParser.urlencoded({
  extended: true
}))
http.listen(process.env.PORT || 3000)

var language = require('./language')()
var helpers  = require('./helpers')()
var routes   = require('./routes')(app)

global.AppConfig = require('./config/app_config')

global.io       = require('socket.io')(http);

var game = new Game(require('./data/maps/0'))

var count = 0

io.on('connection', (socket) => {
  console.log('Client connected.')

  socket.on('auth', (username) => {
    socket.player = new Player(username,0,count)
    count++

    var gamePlayer = game.getPlayer(username)
    if(gamePlayer != false) {
      socket.player.loadData(gamePlayer)
    } else {
      game.joinPlayer(socket.player)
    }

    socket.emit('load_map', game.renderMap())
  })

  socket.on('move_character_request', (username,x,y)=>{
    if(typeof socket.player == 'undefined') return
    if(username == socket.player.username) {
      if(game.canMove(username,x,y)) {
        game.movePlayer(socket.player,x,y)
        game.savePlayer(socket.player)
        io.sockets.emit('move_character_response',username,x,y)
      } else {
        socket.emit('move_character_response_fail', `You can't move there!`)
      }
    } else {
      socket.emit('move_character_response_fail')
    }
    // socket.player.move(x,y)
    // io.sockets.emit('move_response', );
  })

  socket.on('spawn_character_request', () => {
    io.sockets.emit('add_characters', game.getPlayerCoords())
  })

  socket.on('disconnect', ()=>{
    if(typeof socket.player == 'undefined') return
    if(typeof socket != 'undefined' && typeof socket.player != 'undefined') {
      game.removePlayer(socket.player.username)
      io.sockets.emit('delete_character', socket.player.username)
    }
  })
})

general_Helper.serverStarted()