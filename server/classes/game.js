const jsonfile = require('jsonfile')
const _ = require('lodash')

function Game(map) {
  this.players = {}
  this.map = map
  this.map.stage = new Array(map.width)
  for (var i = 0; i < map.height; i++) {
    this.map.stage[i] = new Array(map.height)
    for(var j = 0; j < map.width; j++) {
      this.map.stage[i][j] = ''
    }
  }
  this.load()
}

Game.prototype.load = function() {
  var result = false

  try {
    var data = require('../../current_game.json');
    result = true

    for(var key in data) {
      this[key] = data[key]
    }

    for(var playerKey in this.players) {
      var player = this.players[playerKey]
      this.map.stage[player.x][player.y] = 'X'
    }
    console.log(_.zip.apply(_, this.map.stage))
  } catch (e) {

  }

  return result
}

Game.prototype.save = function() {
  console.log(_.zip.apply(_, this.map.stage))
  jsonfile.writeFileSync('current_game.json', this, (err)=>{
    console.log(err)
  })
}

Game.prototype.renderMap = function() {
  return map_Helper.renderMap(this.map)
}

Game.prototype.getData = function() {
  return {
    players: this.players
  }
}

Game.prototype.movePlayer = function(player,x,y) {
  this.map.stage[player.x][player.y] = ''
  player.move(x,y)
  this.map.stage[x][y] = 'X'
};

Game.prototype.canMove = function(username,x,y) {
  var result = false
  if(this.map.stage[x][y] == ''
    && this.map.walkableTiles.indexOf(this.map.map[y][x]) != -1) {
    if( Math.abs(this.players[username].x - x) <= 1 //THESE VALUES ARE HARD CODED TO MOVE 1 SPACE
      && Math.abs(this.players[username].y - y) <= 1 ) {
      result = true
    }
  }
  return result
};

Game.prototype.getPlayerCoords = function() {
  var result = []
  for(var key in this.players) {
    result.push({
      username: this.players[key].username,
      x: this.players[key].x,
      y: this.players[key].y
    })
  }
  return result
}

Game.prototype.removePlayer = function(username) {

}

Game.prototype.joinPlayer = function(player) {
  this.players[player.username] = player
  this.save()
  return player
}

Game.prototype.savePlayer = function(data) {
  for(var key in data) {
    this.players[data['username']][key] = data[key]
  }
  this.save()
}

Game.prototype.getPlayer = function(username) {
  var result = false
  if(this.players.hasOwnProperty(username))
    result = this.players[username]
  return result
}

module.exports = Game