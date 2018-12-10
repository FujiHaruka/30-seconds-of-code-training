import { transformSync } from '@babel/core'
import presetEnv from '@babel/preset-env'

export default function compileTest (code, testCode) {
  return transformSync(code + '\n' + testCode, {
    presets: [presetEnv],
  }).code
}
