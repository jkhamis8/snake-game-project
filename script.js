////////////////const////////////////////
let grid = document.querySelector('#grid')
const playAgain = document.querySelector('#playAgain')
const endGameDiv = document.querySelector('#endGame')
const scoreDisplay = document.querySelector('#scoreDisplay')
const slideContainer = document.querySelector('.slidecontainer')
const info = document.querySelector('#info')
const boardSize = 20
const slider = document.getElementById("myRange");

///////////////Variables/////////////////
let gameStarted = false
let pointsCounter = 0
let headDirection = 'up'
let headPosition = [boardSize / 2, boardSize / 2]
let snakeBody = []
let bitePosition = []
let biteTimeCounter = 0
let touchstartX = 0
let touchendX = 0
let difficulty = 130
let biteChangeCount = 37
///////////////Listeners//////////////////
document.addEventListener('keydown', function (event) {
  userInput(event.key)
})

document.addEventListener('touchstart', e => {
  touchstartX = e.changedTouches[0].screenX
})

document.addEventListener('touchend', e => {
  touchendX = e.changedTouches[0].screenX
  checkDirection()
})

playAgain.addEventListener("click", () => {
  init();
  gameStarted = false
  pointsCounter = 0
  document.body.style = "background:gainsboro;color:black;"
  endGameDiv.style.display = 'none'
  playAgain.style.display = 'none'
  info.style.display = 'block'
  scoreDisplay.style.display = 'none'
  slideContainer.style.display = "none"
});

slider.oninput = function () {
  if (this.value == 1) {
    difficulty = 180
    biteChangeCount = 42
  } else if (this.value == 2) {
    difficulty = 140
    biteChangeCount = 37
  } else if (this.value == 3) {
    difficulty = 100
    biteChangeCount = 34
  }
}
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
      }, difficulty)
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

const checkDirection = () => {

  if (touchendX < touchstartX) {
    userInput('ArrowLeft')
  }
  if (touchendX > touchstartX) {
    userInput('ArrowRight')
  }
}

const snakeDirection = (direction = '') => {
  switch (headDirection) {
    case 'up':
      if (direction == 'ArrowLeft') {
        headDirection = 'left'
      } else {
        headDirection = 'right'
      }
      break
    case 'down':
      if (direction == 'ArrowLeft') {
        headDirection = 'right'
      } else {
        headDirection = 'left'
      }
      break
    case 'left':
      if (direction == 'ArrowLeft') {
        headDirection = 'down'
      } else {
        headDirection = 'up'
      }
      break
    case 'right':
      if (direction == 'ArrowLeft') {
        headDirection = 'up'
      } else {
        headDirection = 'down'
      }
      break
  }
}

const snakeMoving = () => {
  let previousW = headPosition[0]
  let previousH = headPosition[1]
  let snakeHeadClass = ''
  let snakeBodyClass = 'snakeBody'
  document.querySelector(`#w${previousW}h${previousH}`).className = 'block'

  switch (headDirection) {
    case 'up':
      headPosition[1] = headPosition[1] - 1
      checkBite()
      if (crashChecker()) {
        break
      }

      snakeHeadClass = 'snakeHeadUp'
      snakeBodyClass = 'snakeBodyV'
      break
    case 'down':
      headPosition[1] = headPosition[1] + 1
      checkBite()
      if (crashChecker()) {
        break
      }

      snakeHeadClass = 'snakeHeadDown'
      snakeBodyClass = 'snakeBodyV'
      break
    case 'left':
      headPosition[0] = headPosition[0] - 1
      checkBite()
      if (crashChecker()) {
        break
      }

      snakeHeadClass = 'snakeHeadLeft'
      break
    case 'right':
      headPosition[0] = headPosition[0] + 1
      checkBite()
      if (crashChecker()) {
        break
      }

      snakeHeadClass = 'snakeHeadRight'
      break
  }
  document.querySelector(`#w${headPosition[0]}h${headPosition[1]}`).classList.add(snakeHeadClass)
  snakeBodyMove(previousW, previousH, snakeBodyClass)
}

const snakeBodyMove = (previousW, previousH, snakeBodyClass) => {

  let prevBodyW = 0
  let prevBodyH = 0
  snakeBody.forEach((value, key) => {
    bodyCrashChecker(snakeBody[key][0], snakeBody[key][1])
    if (key === 0) {
      document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
      document.querySelector(`#w${previousW}h${previousH}`).classList.add(snakeBodyClass)
      prevBodyW = snakeBody[key][0]
      prevBodyH = snakeBody[key][1]
      snakeBody[key][0] = previousW
      snakeBody[key][1] = previousH
    } else {
      document.querySelector(`#w${snakeBody[key][0]}h${snakeBody[key][1]}`).className = 'block'
      document.querySelector(`#w${prevBodyW}h${prevBodyH}`).classList.add(snakeBodyClass)
      let tempW = snakeBody[key][0]
      let tempH = snakeBody[key][1]
      snakeBody[key][0] = prevBodyW
      snakeBody[key][1] = prevBodyH
      prevBodyW = tempW
      prevBodyH = tempH
    }
  })
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
  info.style.display = 'none'
  slideContainer.style.display = 'block'
  clearInterval(intervalId)
}

const showBites = () => {

  if (biteTimeCounter > biteChangeCount) {
    document.querySelector(`#w${bitePosition[0]}h${bitePosition[1]}`).className = 'block'
    biteOverLapChecker()
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
    addSnakeBody()
    biteOverLapChecker()
    pointsCounter++
    scoreDisplay.innerHTML = `Your score is ${pointsCounter}`
    biteTimeCounter = 0
  } else {
    biteTimeCounter++
  }
}

const addSnakeBody = () => {
  snakeBody[snakeBody.length] = [snakeBody[snakeBody.length - 1][0], snakeBody[snakeBody.length - 1][1]]
}

const biteOverLapChecker = () => {
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
}

//////////////////main////////////////
init()
