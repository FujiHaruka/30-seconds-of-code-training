import { transformSync } from '@babel/core'
import presetEnv from '@babel/preset-env'

export default function createTest (code, testCode) {
  return transformSync(code + '\n' + testCode, {
    presets: [presetEnv],
  }).code
}
