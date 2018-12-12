export function formatTestResult (results = []) {
  console.log(results)
  const succeeded = results.every(({ ok }) => ok)
  const firstLine = 'Test result is ' + (succeeded ? '<span style="color: blue">SUCCEEDED!</span>' : '<span style="color: red">FAILED!</span>')

  const messages = results.map(({ ok, name }) => `${ok ? 'OK:' : 'ERROR:'} ${name}`)

  return firstLine + '\n\n' + messages.join('\n')
}
