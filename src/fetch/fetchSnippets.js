import BASE_URL from './BASE_URL'

export default async function fetchSnippets () {
  const resp = await window.fetch(BASE_URL + '/snippets.json')
  let snippets = await resp.json()
  snippets = snippets.data.filter(({ type, meta }) => type === 'snippet' && !meta.archived)
  return snippets
}
