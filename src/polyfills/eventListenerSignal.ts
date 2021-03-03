let signalSupported = false
// eslint-disable-next-line @typescript-eslint/no-empty-function
function noop() {}
try {
  const options = Object.create(
    {},
    {
      signal: {
        get: function() {
          signalSupported = true
        }
      }
    }
  )
  window.addEventListener('test', noop, options)
  window.removeEventListener('test', noop, options)
} catch (e) {
  /* */
}
function featureSupported(): boolean {
  return signalSupported
}

function monkeyPatch() {
  const originalAddEventListener = EventTarget.prototype.addEventListener
  EventTarget.prototype.addEventListener = function(name, originalCallback, optionsOrCapture) {
    if (
      typeof optionsOrCapture === 'object' &&
      'signal' in optionsOrCapture &&
      // @ts-expect-error until `signal` is added to the AddEventListenerOptions interface
      optionsOrCapture.signal instanceof AbortSignal
    ) {
      // @ts-expect-error until `signal` is added to the AddEventListenerOptions interface
      originalAddEventListener.call(optionsOrCapture.signal, 'abort', () => {
        this.removeEventListener(name, originalCallback, optionsOrCapture)
      })
    }
    return originalAddEventListener.call(this, name, originalCallback, optionsOrCapture)
  }
}

export function polyfill(): void {
  if (!featureSupported()) {
    monkeyPatch()
    signalSupported = true
  }
}