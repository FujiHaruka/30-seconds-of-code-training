export function formatTestResult (results = []) {
  const succeeded = results.every(({ ok }) => ok)
  const firstLine = 'Test is ' + (succeeded ? '<span style="color: blue">SUCCEEDED!</span>' : '<span style="color: red">FAILED!</span>')

  const messages = results.map(({ ok, name }) => `${ok ? 'OK:' : 'ERROR:'} ${name}`)

  return firstLine + '\n\n' + messages.join('\n')
}
