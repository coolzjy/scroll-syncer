// detect if user-agent support passive event binding
var supportPassive = false
if (window && window.addEventListener && Object.defineProperty) {
  var options = Object.defineProperty({}, 'passive', {
    get: function () { supportPassive = true }
  })
  window.addEventListener('_detectpassive', null, options)
}

var bindOptions = supportPassive
  ? { passive: true, capture: true }
  : true

function ScrollSyncer (vertical, horizontal) {
	this._vertical = vertical
	this._horizontal = horizontal
	this._from = null
  this._to = []

  this._scrollHandler = this.sync.bind(this)
}

ScrollSyncer.prototype.from = function (target) {
	if (!target || !target.addEventListener) return
	this._from = target
	this._from.addEventListener('scroll', this._scrollHandler, bindOptions)
	this.sync()
}

ScrollSyncer.prototype.to = function (target) {
	if (!target) return
	this._to.push(target)
	this.sync()
}

ScrollSyncer.prototype.sync = function () {
	if (this._from) {
		this._to.forEach(function (el) {
			if (this._vertical) el.scrollTop = this._from.scrollTop
			if (this._horizontal) el.scrollLeft = this._from.scrollLeft
		}, this)
	}
}

ScrollSyncer.prototype.off = function (target) {
  if (target === undefined || target === this._from) {
    // remove event listener and release element reference
    if (this._from.removeEventListener) {
      this._from.removeEventListener('scroll', this._scrollHandler)
    }
    this._from = null
  }

  if (target === undefined) {
    this._to = []
  } else {
    var index = this._to.indexOf(target)
    if (index >= 0) {
      this._to.splice(index, 1)
    }
  }
}

module.exports = ScrollSyncer
