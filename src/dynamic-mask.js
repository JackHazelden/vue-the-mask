export default function dynamicMask (maskit, masks, tokens) {
  masks = masks.slice().sort((a, b) => a.length - b.length)
  return function (value, mask, masked = true) {
    var i = 0
    while (i < masks.length) {
      var currentMask = masks[i]
      i++
      var nextMask = masks[i]
      var nextMaskMatches = nextMask && maskit(value, nextMask, true, tokens).length===value.length
      if (! (nextMaskMatches && nextMask.length >= currentMask.length)) {
        return maskit(value, currentMask, masked, tokens)
      }
    }
    return '' // empty masks
  }
}
