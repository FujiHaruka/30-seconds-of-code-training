import { injectTestGlobals, resetTestGlobals } from './injectTestFuncs'

export default async function doTest (code) {
  injectTestGlobals()
  let results
  try {
    // eslint-disable-next-line no-eval
    results = await eval(code)
  } catch (error) {
    // Syntax error はコンパイルで補足されるはずなのでここに来ることはない
    console.error(`[NEVER HERE]`, error)
  } finally {
    resetTestGlobals()
  }
  return results
}
