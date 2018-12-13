import { transformSync } from '@babel/core'
import presetEnv from '@babel/preset-env'

export default function compileTest (code, testCode) {
  // code だけでコンパイルが通るかチェック
  transformSync(code, { presets: [presetEnv] })

  return transformSync(code + '\n' + testCode, {
    presets: [presetEnv],
  }).code
}
