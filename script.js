////////////////const////////////////////
let grid = document.querySelector('#grid')
const playAgain = document.querySelector('#playAgain')
const endGameDiv = document.querySelector('#endGame')
const scoreDisplay = document.querySelector('#scoreDisplay')
const boardSize = 20
const snake = new Array(boardSize)
  .fill('')
  .map(() => new Array(boardSize).fill(''))

///////////////Variables/////////////////
let gameStarted = false
let pointsCounter = 0
let headDirection = 'up'
let turn = ''
let headPosition = [boardSize / 2, boardSize / 2]
let snakeBody = []
let bitePosition = []
let biteTimeCounter = 0
let touchstartX = 0
let touchendX = 0

///////////////Listeners//////////////////
document.addEventListener('keydown', function (event) {
  userInput(event.key)
})

function checkDirection() {
  if (touchendX < touchstartX) {
    userInput('ArrowLeft')
  }
  if (touchendX > touchstartX) {
    userInput('ArrowRight')
  }
}

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

playAgain.addEventListener("click", (event) => {
  init();
  gameStarted = false
  pointsCounter = 0
  document.body.style = "background:gainsboro;color:black;"
  endGameDiv.style.display = 'none'
  playAgain.style.display = 'none'
});
//////////////Functions////////////////////
const init = () => {
  createBoard()
}

const userInput = (input) => {
  if (input == 'ArrowLeft' || input == 'ArrowRight') {
    if (gameStarted == false) {
      setStartValues()
      intervalId = window.setInterval(function () {
        snakeMoving()
        showBites()
      }, 130)
    } else {
      snakeDirection(input)
    }
  }
}
const createBoard = () => {
  grid.innerHTML = ''
  for (let w = 0; w < boardSize; w++) {
    let div = document.createElement('div')
    div.setAttribute('id', `w${w}`)
    div.classList.add('mainBlock')
    grid.appendChild(div)
    let mainBlock = document.querySelector(`#w${w}`)
    for (let h = 0; h < boardSize; h++) {
      let div = document.createElement('div')
      div.setAttribute('id', `w${w}h${h}`)
      div.classList.add('block')
      mainBlock.appendChild(div)
    }
  }
}

const setStartValues = () => {
  headDirection = 'up'
  headPosition = [boardSize / 2, boardSize / 2]
  snakeBody = [[headPosition[0], headPosition[1] + 1]]
  bitePosition[0] = Math.floor(Math.random() * boardSize)
  bitePosition[1] = Math.floor(Math.random() * boardSize)
  gameStarted = true
}

const snakeDirection = (direction = '') => {
  switch (headDirection) {
    case 'up':
      if (direction == 'ArrowLeft') {
        headDirection = 'left'
        turn = 'turnUpLeft'
      } else {
        headDirection = 'right'
        turn = 'turnUpRight'
      }

      break
    case 'down':
      if (direction == 'ArrowLeft') {
        headDirection = 'right'
        turn = 'turnDownRight'
      } else {
        headDirection = 'left'
        turn = 'turnDownLeft'
      }

      break
    case 'left':
      if (direction == 'ArrowLeft') {
        headDirection = 'down'
        turn = 'turnLeftDown'
      } else {
        headDirection = 'up'
        turn = 'turnLeftUp'
      }

      break
    case 'right':
      if (direction == 'ArrowLeft') {
        headDirection = 'up'
        turn = 'turnRightUp'
      } else {
        headDirection = 'down'
        turn = 'turnRightDown'
      }
      break
  }
}

const snakeMoving = () => {
  let previousW = headPosition[0]
  let previousH = headPosition[1]
  let previousSpot = document.querySelector(`#w${previousW}h${previousH}`)
  let prevBodyW = 0
  let prevBodyH = 0
  switch (headDirection) {
    case 'up':
      headPosition[1] = headPosition[1] - 1
      checkBite()
      if (crashChecker()) {
        break
      }

      previousSpot.className = 'block'
      document.querySelector(`#w${headPosition[0]}h${headPosition[1]}`).classList.add('snakeHeadUp')

      snakeBody.forEach((value, key) => {
        bodyCrashChecker(snakeBody[key][0], snakeBody[key][1])
        if (key === 0) {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'

          previousSpot.classList.add('snakeBodyV')

          prevBodyW = snakeBody[key][0]
          prevBodyH = snakeBody[key][1]
          snakeBody[key][0] = previousW
          snakeBody[key][1] = previousH
        }
        else {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          document.querySelector(`#w${prevBodyW}h${prevBodyH}`).classList.add('snakeBodyV')
          let tempW = snakeBody[key][0]
          let tempH = snakeBody[key][1]
          snakeBody[key][0] = prevBodyW
          snakeBody[key][1] = prevBodyH
          prevBodyW = tempW
          prevBodyH = tempH
        }
      })

      break
    case 'down':
      headPosition[1] = headPosition[1] + 1
      checkBite()
      if (crashChecker()) {
        break
      }

      previousSpot.className = 'block'
      document.querySelector(`#w${headPosition[0]}h${headPosition[1]}`).classList.add('snakeHeadDown')
      snakeBody.forEach((value, key) => {
        bodyCrashChecker(snakeBody[key][0], snakeBody[key][1])
        if (key === 0) {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          previousSpot.classList.add('snakeBodyV')
          prevBodyW = snakeBody[key][0]
          prevBodyH = snakeBody[key][1]
          snakeBody[key][0] = previousW
          snakeBody[key][1] = previousH
        }
        else {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          document.querySelector(`#w${prevBodyW}h${prevBodyH}`).classList.add('snakeBodyV')
          let tempW = snakeBody[key][0]
          let tempH = snakeBody[key][1]
          snakeBody[key][0] = prevBodyW
          snakeBody[key][1] = prevBodyH
          prevBodyW = tempW
          prevBodyH = tempH
        }
      })

      break
    case 'left':
      headPosition[0] = headPosition[0] - 1
      checkBite()
      if (crashChecker()) {
        break
      }

      previousSpot.className = 'block'
      document.querySelector(`#w${headPosition[0]}h${headPosition[1]}`).classList.add('snakeHeadLeft')
      snakeBody.forEach((value, key) => {
        bodyCrashChecker(snakeBody[key][0], snakeBody[key][1])
        if (key === 0) {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          previousSpot.classList.add('snakeBody')
          prevBodyW = snakeBody[key][0]
          prevBodyH = snakeBody[key][1]
          snakeBody[key][0] = previousW
          snakeBody[key][1] = previousH
        }
        else {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          document.querySelector(`#w${prevBodyW}h${prevBodyH}`).classList.add('snakeBody')
          let tempW = snakeBody[key][0]
          let tempH = snakeBody[key][1]
          snakeBody[key][0] = prevBodyW
          snakeBody[key][1] = prevBodyH
          prevBodyW = tempW
          prevBodyH = tempH
        }
      })

      break
    case 'right':

      headPosition[0] = headPosition[0] + 1
      checkBite()
      if (crashChecker()) {
        break
      }

      previousSpot.className = 'block'
      document.querySelector(`#w${headPosition[0]}h${headPosition[1]}`).classList.add('snakeHeadRight')
      snakeBody.forEach((value, key) => {
        bodyCrashChecker(snakeBody[key][0], snakeBody[key][1])
        if (key === 0) {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          previousSpot.classList.add('snakeBody')
          prevBodyW = snakeBody[key][0]
          prevBodyH = snakeBody[key][1]
          snakeBody[key][0] = previousW
          snakeBody[key][1] = previousH
        } else {
          document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
          document.querySelector(`#w${prevBodyW}h${prevBodyH}`).classList.add('snakeBody')
          let tempW = snakeBody[key][0]
          let tempH = snakeBody[key][1]
          snakeBody[key][0] = prevBodyW
          snakeBody[key][1] = prevBodyH
          prevBodyW = tempW
          prevBodyH = tempH
        }
      })

      break
  }
}

const crashChecker = () => {
  if (
    headPosition[0] < 0 ||
    headPosition[0] > boardSize - 1 ||
    headPosition[1] < 0 ||
    headPosition[1] > boardSize - 1 ||
    headPosition[1] == undefined ||
    headPosition[0] == undefined
  ) {
    endGame()
    return true
  }
  return false
}

const bodyCrashChecker = (bodyW, bodyH) => {
  if (
    headPosition[0] == bodyW &&
    headPosition[1] == bodyH
  ) {
    endGame()
  }
}

const endGame = () => {
  endGameDiv.style.display = 'block'
  playAgain.style.display = ' inline-block'
  document.body.style = "background:black;color:wheat;"
  clearInterval(intervalId)
}

const showBites = () => {

  if (biteTimeCounter > 35) {
    document.querySelector(`#w${bitePosition[0]}h${bitePosition[1]}`).className = 'block'
    bitePosition[0] = Math.floor(Math.random() * boardSize)
    bitePosition[1] = Math.floor(Math.random() * boardSize)
    let flag = false
    while (!flag) {
      let innerCount = 0
      for (key in snakeBody) {

        if (snakeBody[key][0] == bitePosition[0] && snakeBody[key][1] == bitePosition[1]) {
          bitePosition[0] = Math.floor(Math.random() * boardSize)
          bitePosition[1] = Math.floor(Math.random() * boardSize)
          break
        } else {
          innerCount++
        }
      }
      if (snakeBody.length == innerCount) {
        flag = true
      }
    }
    biteTimeCounter = 0
  }

  document.querySelector(`#w${bitePosition[0]}h${bitePosition[1]}`).classList.add('bite')
}

const checkBite = () => {
  if (
    bitePosition[0] == headPosition[0] &&
    bitePosition[1] == headPosition[1]
  ) {
    document.querySelector(`#w${bitePosition[0]}h${bitePosition[1]}`).className = 'block snakeBody'
    pointsCounter++
    addSnakeBody()

    bitePosition[0] = Math.floor(Math.random() * boardSize)
    bitePosition[1] = Math.floor(Math.random() * boardSize)

    let flag = false
    while (!flag) {
      let innerCount = 0
      for (key in snakeBody) {

        if (snakeBody[key][0] == bitePosition[0] && snakeBody[key][1] == bitePosition[1]) {
          bitePosition[0] = Math.floor(Math.random() * boardSize)
          bitePosition[1] = Math.floor(Math.random() * boardSize)
          break
        } else {
          innerCount++
        }
      }
      if (snakeBody.length == innerCount) {
        flag = true
      }
    }
    scoreDisplay.innerHTML = `Your score is ${pointsCounter}`
    biteTimeCounter = 0
  } else {
    biteTimeCounter++
  }
}

const addSnakeBody = () => {
  snakeBody[snakeBody.length] = [snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1]]
}

//////////////////main////////////////
init()
