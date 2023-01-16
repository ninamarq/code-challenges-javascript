const checkParenthesis = (s) => {
  const isOpen = [...s].some(element => element === '(')
  const isClosed = [...s].some(element => element === ')')
  if (isOpen && isClosed) return true
  if (!isOpen && !isClosed) return true
  return false
}

const checkSquareBrackets = (s) => {
  const isOpen = [...s].some(element => element === '[')
  const isClosed = [...s].some(element => element === ']')
  if (!isOpen && !isClosed) return true
  if (isOpen && isClosed) return true
  return false
}

const checkKeysBrackets = (s) => {
  const isOpen = [...s].some(element => element === '{')
  const isClosed = [...s].some(element => element === '}')
  if (!isOpen && !isClosed) return true
  if (isOpen && isClosed) return true
  return false
}

const getInsideBracket = (open, close, string) => {
  const openB = [...string].flatMap((element, index) => element === open ? index : [])
  const closeB = [...string].flatMap((element, index) => element === close ? index : []).reverse()
  if (!openB.length || !closeB.length) return
  if (openB.length !== closeB.length) return [string[0]]
  if ((openB.length === closeB.length) && (openB.length > 1 && closeB.length > 1)) {
    return openB.map((element, index) => string.slice(element + 1, closeB[index]))
  }
  return [string.slice(openB + 1, closeB)]
}

const isValid = (s) => {
  const objBrackets = {
    parenthesis: ['(', ')'],
    squares: ['[', ']'],
    keys: ['{', '}'],
  }
  const analysis = []
  const checkBrackets = string => checkKeysBrackets(string)
    && checkParenthesis(string)
    && checkSquareBrackets(string)

  Object.values(objBrackets).forEach((arr) => {
    const inside = getInsideBracket(arr[0], arr[1], s)
    if (inside) {
      inside.forEach((arr) => !checkBrackets(arr) && analysis.push(arr))
    }
    if (!inside) !checkBrackets(s) && analysis.push(s)
  })

  if (analysis.length > 0) return false
  return true
}

const testsArray = [
  '()',//valid
  '[]',//valid
  '{}',//valid
  '([',//invalid
  '(]',//invalid
  '{()}[]', //valid
  '{(})[]', //invalid
  '({[()]})', //valid
  '({[(])})', //invalid
  '][]()', //invalid
]

testsArray.forEach((str) => {
  if (isValid(str)) console.log('valid')
  else console.log('invalid')
})