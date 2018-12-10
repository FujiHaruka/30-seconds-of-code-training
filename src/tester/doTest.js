export default async function doTest (code) {
  try {
    // eslint-disable-next-line no-eval
    return await eval(code)
  } catch (error) {
    return { ok: false, error }
  }
}
