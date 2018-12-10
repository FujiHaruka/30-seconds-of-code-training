import { injectTestGlobals, resetTestGlobals } from './injectTestFuncs'

export default async function doTest (code) {
  injectTestGlobals()
  let results
  try {
    // eslint-disable-next-line no-eval
    results = await eval(code)
  } catch (error) {
    return {
      code: 'SYNTAX_ERROR',
      error,
    }
  } finally {
    resetTestGlobals()
  }
  return results
}
