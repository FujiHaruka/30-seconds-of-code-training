import BASE_URL from './BASE_URL'

export default async function fetchTest (id) {
  const resp = await window.fetch(BASE_URL + `/test/${id}.test.js`)
  let code = await resp.text()
  // testコードは最初の2行が require()
  code = code.split('\n').slice(2).join('\n').trim()
  return code
}
