module.exports = function () {
  var map_Helper = {}

  map_Helper.renderMap = function(mapData){
    var result = []
    var map = mapData.map

    for(var mapIndex in map) {
      result.push({row:[]})
      for(var rowIndex in map[mapIndex]) {
        var resultData = {}
        switch(map[mapIndex][rowIndex]) {
          case 1:
            resultData.isGrass = true
            break;
          case 2:
            resultData.isWater = true
            break;
          case 3:
            resultData.isDirt = true
            break;
        }
        resultData.x = rowIndex
        resultData.y = mapIndex
        result[mapIndex]['row'].push( ( resultData ) )
      }
    }
    return result
  }

  return map_Helper
}