const objBrackets = {
  parenthesis: ['(', ')'],
  squares: ['[', ']'],
  keys: ['{', '}'],
}

const checkBrackets = (s) =>  {
  const arrCheck = []
  Object.keys(objBrackets).forEach((bracket) => {
    const isOpen = [...s].some(element => element === objBrackets[bracket][0])
    const isClosed = [...s].some(element => element === objBrackets[bracket][1])
    if ((!isOpen && !isClosed) || (isOpen && isClosed)) arrCheck.push(bracket)
  })
  return arrCheck.length === 3 ? true : false
}

const getInsideBracket = (open, close, string) => {
  const openB = [...string].flatMap((element, index) => element === open ? index : [])
  const closeB = [...string].flatMap((element, index) => element === close ? index : []).reverse()
  const invalidMatrix = openB.some((element, index) => element > closeB[index])

  if (invalidMatrix) return [string[0]]
  if (!openB.length || !closeB.length) return
  if (openB.length !== closeB.length) return [string[0]]
  if ((openB.length === closeB.length) && (openB.length > 1 && closeB.length > 1)) {
    return openB.map((element, index) => string.slice(element + 1, closeB[index]))
  }

  return [string.slice(openB + 1, closeB)]
}

const isValid = (s) => {
  const analysis = []

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
  '()',// valid
  '[]',// valid
  '{}',// valid
  '([',// invalid
  '(]',// invalid
  '{()}[]', // valid
  '{(})[]', // invalid
  '({[()]})', // valid
  '({[(])})', // invalid
  '][]()', // invalid
  '{()}[]', // valid
  '{(})[]', // invalid
  '{()[]}', // valid
  '{})([]', // invalid
]

testsArray.forEach((str) => {
  if (isValid(str)) console.log('valid')
  else console.log('invalid')
})
