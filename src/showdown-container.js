(function (extension) {
  'use strict'

  if (typeof showdown === 'object') {
    // global (browser or nodejs global)
    showdown.extension('container', extension())
  } else if (typeof define === 'function' && define.amd) {
    // AMD
    define('container', extension())
  } else if (typeof exports === 'object') {
    // Node, CommonJS-like
    module.exports = extension()
  } else {
    // showdown was not found so we throw
    throw Error('Could not find showdown library')
  }

}(function() {
  return [
    {
      type: 'lang',
      filter: function(text, converter) {
        // if our last tag isn't closed then close it at the end of our input text
        var count = (text.match(/:::/g) || []).length
        if (count % 2) {
          text += "\n:::\n"
        }

        text = text.replace(/:::(.*?)[\r\n]([\s\S]*?):::/mgi, function (match, args, body) {
          var props = ''
          if (args) {
            props = ' class="' + args.trim().split(/\s+/).map(function(a) { return encodeURIComponent(a) }).join(" ") + '"'
          }
          return "<div"+ props  + ">\n" + converter.makeHtml(body) + "\n</div>\n"
        })
        return text
      }
    }
  ]
}))
