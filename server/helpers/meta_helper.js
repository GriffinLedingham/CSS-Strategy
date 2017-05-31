module.exports = function () {
  var meta_Helper = {}

  meta_Helper.setMetaProp = function(key, value, $) {
    $('meta[name='+key+']').attr('content',value)
  }

  meta_Helper.setTitle = function(value, $) {
    $('title').text(value)
  }

  return meta_Helper
}