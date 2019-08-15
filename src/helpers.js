export function formatTestResult (results = []) {
  console.log(results)
  const succeeded = results.every(({ ok }) => ok)
  const firstLine = (succeeded ? '<span style="color: blue">SUCCEEDED!</span>' : '<span style="color: red">FAILED!</span>')

  const messages = results.map(({ ok, name, error }) => {
    if (ok) {
      return `OK: ${name}`
    } else {
      if (error && error.message) {
        const message = error.message.split('\n')
          .filter(Boolean)
          .map(line => '  > ' + line)
          .join('\n')
        return `ERROR: ${name}\n${message}`
      } else {
        return `ERROR: ${name}`
      }
    }
  })

  return firstLine + '\n\n' + messages.join('\n')
}
