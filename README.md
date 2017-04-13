# Scroll Syncer
Synchronize scoll position among several elements

## Usage
```js
import ScrollSyncer from 'scroll-syncer'

var ss = new ScrollSyncer(
  true,/* vertical scroll position */
  true/* horizontal scroll position */
)

// enable sync on el1, el2, el3
ss.on(el1, el2, el3)
// disable sync on el3
ss.off(el3)
```
