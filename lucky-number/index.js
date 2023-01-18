const getLuckyNumber = (list) => {
  const counterObj = {}

  list.forEach((number) => {
    const counter = list.filter(element => element === number).length
    counterObj[number] = counter
  })
  delete counterObj[1]
  return Object.entries(counterObj).find((element) => Number(element[0]) === element[1])[1]
}

const testsArray = {
  1: {
    list: [1,2,2,3,6],
    lucky: 2,
  },
  2: {
    list: [7,4,2,4,8,10,4,4],
    lucky: 4,
  },
  3: {
    list: [1,2,3,3,3,9,8,2],
    lucky: 2,
  },
  4: {
    list: [1,2,2,3,3,3,9,9,9,8,2],
    lucky: 3,
  },
}

Object.keys(testsArray).map(key => testsArray[key]).forEach((test) => {
  if (getLuckyNumber(test.list) === test.lucky) 
    console.log(`CORRECT! lucky number is: ${getLuckyNumber(test.list)}`)
  else console.log(`${getLuckyNumber(test.list)} is the incorrect number. `)
})
