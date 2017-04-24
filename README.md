# Scroll Syncer
Synchronize scoll position from one element to several elements

## Usage
```js
import ScrollSyncer from 'scroll-syncer'

var ss = new ScrollSyncer(
  true, /* vertical scroll position */
  true, /* horizontal scroll position */
  true  /* use passive event binding */
)

// Synchronize from el1
ss.from(el1)
// Synchronize to el2
ss.to(el2)

// Stop synchronize from el1, but el2 will be kept as synchronize target.
ss.off(el1)
// Stop synchronize to el2, but el1 will be kept as synchronize origin.
ss.off(el2)
// Tear down the synchronizer.
ss.off()
```
