function Player(id,x,y) {
  this.username = id
  this.x = x
  this.y = y
}

Player.prototype.move = function(x,y) {
  this.x = x
  this.y = y
}

Player.prototype.loadData = function(data) {
  for(var key in data) {
    this[key] = data[key]
  }
}

module.exports = Player