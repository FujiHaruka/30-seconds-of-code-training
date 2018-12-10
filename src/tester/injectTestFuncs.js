import expect from 'expect'

async function test (desc, func) {
  try {
    await func()
  } catch (error) {
    return {
      ok: false,
      error,
    }
  }
  return { ok: true }
}

export default function injectTestFuncs () {
  window.expect = expect
  window.test = test
}
