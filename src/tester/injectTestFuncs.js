import expect from 'expect'

/**
 * test() を実行するたびにそれまでの結果をあわせた結果配列を返す
 */
const Test = () => {
  const results = []
  return async (name, func) => {
    let result = { ok: true, name }
    try {
      await func()
    } catch (error) {
      result = {
        ok: false,
        name,
        error,
      }
    }
    results.push(result)
    return results
  }
}

export function injectTestGlobals () {
  window.expect = expect
  window.test = Test()
}

export function resetTestGlobals () {
  window.expect = undefined
  window.test = undefined
}
