function App() {
  this.selectedCharacter = false
  this.socket    = io()
}

App.prototype.init = function(){
  Framework.init()
  this.setupBindings()
  this.setupSocket()
  this.startGame()

  this.socket.emit('auth',getParameterByName('name'))
}

App.prototype.setupBindings = function() {
  $(document).on('click', '.game-tile', (e) => {
    var tile = $(e.currentTarget)
    var x =  tile.data('x')
    var y =  tile.data('y')

    if(this.selectedCharacter == false){
      this.selectCharacter(x,y)
    } else {
      this.characterAction(x,y)
    }
  })
}

App.prototype.characterAction = function(x,y) {
  var target = this.findAtCoords(x,y)
  if(target.hasClass('game-tile')) {
    this.moveCharacter(x,y)
  }
}

App.prototype.findAtCoords = function(x,y) {
  var result = false
  var query = $(`[data-x=${x}][data-y=${y}]`)
  if(query.length == 1){
    result = query
  } else if(query.length > 1) {
    result = $(`[data-x=${x}][data-y=${y}]:not(.game-tile)`)
  }
  return result
}

App.prototype.selectCharacter = function(x,y) {
  var queryResults = $(`.character[data-x=${x}][data-y=${y}]`)
  if(queryResults.length > 0){
    this.selectedCharacter = queryResults
    this.selectedCharacter.css('background','blue')
    this.highlightMoveableSpaces()
  }
}

App.prototype.moveCharacter = function(x,y) {
  this.socket.emit('move_character_request', this.selectedCharacter.data('username'), x, y)
}

App.prototype.moveCharacterResponse = function(username,x,y) {
  var moveCharacter = $(`[data-username=${username}]`)
  moveCharacter.css('left',((x*104)+(104/2)-moveCharacter.width()/2) + 'px')
  moveCharacter.css('top',((y*104)+(104/2)-moveCharacter.height()/2) + 'px')
  moveCharacter.attr('data-y',y)
  moveCharacter.attr('data-x',x)
  moveCharacter.data('y',y)
  moveCharacter.data('x',x)
  moveCharacter.css('background','red')
  this.selectedCharacter = false
  $('.game-tile').css('opacity', 1)
}

App.prototype.setupSocket = function() {
  this.socket.on('load_map', (map)=>{
    $('.game-canvas').html(Framework.loadTemplate('mapTemplate', {map:map}))

    this.socket.emit('spawn_character_request')
  })

  this.socket.on('add_characters', (characters) => {
    for(var key in characters) {
      var char = characters[key]
      if($(`.characters [data-username="${char.username}"`).length == 0) {
        $('.characters').append(`<div data-x=${char.x} data-y=${char.y} data-username=${char.username} class="character"><span class="name">${char.username}</span><span class="sprite"></span></div>`)
        $(`[data-username="${char.username}"]`).css('left',((char.x*104)+(104/2)-$(`[data-username="${char.username}"]`).width()/2) + 'px')
        $(`[data-username="${char.username}"]`).css('top',((char.y*104)+(104/2)-$(`[data-username="${char.username}"]`).height()/2) + 'px')
      }
    }
  })

  this.socket.on('move_character_response', (username,x,y)=>{
    this.moveCharacterResponse(username,x,y)
  })

  this.socket.on('move_character_response_fail', (msg)=>{
    if(typeof msg != 'undefined')
      alert(msg)
    this.selectedCharacter.css('background','red')
    this.selectedCharacter = false
    $('.game-tile').css('opacity', 1)
  })

  this.socket.on('delete_character', (username) => {
    $(`.characters [data-username=${username}]`).remove()
  })
}

App.prototype.highlightMoveableSpaces = function() {
  //HACKY MOVEABLE SPACES LOGIC FOR FUNS
  $('.game-tile').css('opacity', 0.5)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')+1}][data-y=${this.selectedCharacter.data('y')}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')-1}][data-y=${this.selectedCharacter.data('y')}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')}][data-y=${this.selectedCharacter.data('y')+1}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')}][data-y=${this.selectedCharacter.data('y')-1}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')}][data-y=${this.selectedCharacter.data('y')}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')+1}][data-y=${this.selectedCharacter.data('y')+1}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')+1}][data-y=${this.selectedCharacter.data('y')-1}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')-1}][data-y=${this.selectedCharacter.data('y')-1}]`).css('opacity', 1)
  $(`.game-tile[data-x=${this.selectedCharacter.data('x')-1}][data-y=${this.selectedCharacter.data('y')+1}]`).css('opacity', 1)
}

App.prototype.startGame = function() {

}

global.App = module.exports = App

function getParameterByName(name) {
  var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}