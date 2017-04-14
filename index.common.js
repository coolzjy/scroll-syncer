// detect if user-agent support passive event binding
var supportPassive = false
if (window && window.addEventListener && Object.defineProperty) {
  var options = Object.defineProperty({}, 'passive', {
    get: function () { supportPassive = true }
  })
  window.addEventListener('_detectpassive', null, options)
}

var bindOptions = supportPassive && { passive: true }

function ScrollSyncer (vertical, horizontal) {
  this._els = []

  this._scrollHandler = (function (e) {
    this._els.forEach(function (el) {
      if (vertical) el.scrollTop = e.target.scrollTop
      if (horizontal) el.scrollLeft = e.target.scrollLeft
    })
  }).bind(this)
}

ScrollSyncer.prototype._on = function (el) {
  if (!el || !el.addEventListener) return
  el.addEventListener('scroll', this._scrollHandler, bindOptions)
  this._els.push(el)
}

ScrollSyncer.prototype.on = function () {
  [].forEach.call(arguments, this._on, this)
}

ScrollSyncer.prototype._off = function (el) {
  if (!el || !el.removeEventListener) return
  var index = this._els.indexOf(el)
  if (index < 0) return
  el.removeEventListener('scroll', this._scrollHandler)
  this._els.splice(index, 1)
}

ScrollSyncer.prototype.off = function () {
  [].forEach.call(arguments, this._off, this)
}

module.exports = ScrollSyncer
