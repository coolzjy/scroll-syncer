function ScrollSyncer (vertical, horizontal, usePassive) {
  this._from = null
  this._to = []
  this._bindOptions = usePassive
    ? { passive: true }
    : undefined

  this._sync = (function (e) {
    var target = e.target
    this._to.forEach(function (el) {
      if (vertical) el.scrollTop = target.scrollTop
      if (horizontal) el.scrollLeft = target.scrollLeft
    }, this)
  }).bind(this)
}

ScrollSyncer.prototype.from = function (target) {
  if (!target || !target.addEventListener) return
  this._from = target
  this._from.addEventListener('scroll', this._sync, this._bindOptions)
}

ScrollSyncer.prototype.to = function (target) {
  if (!target) return
  this._to.push(target)
}

ScrollSyncer.prototype.sync = function () {
  if (this._from) {
    this._sync({ target: this._from })
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
