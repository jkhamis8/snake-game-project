# Snake Game

#### To create the snake game A box will be created using `HTML and CSS` as a play ground for the snake to move inside it with small boxes to simulate an array and `init()` function will be the main function to hold all the game functions, for the snake a `snake` const will be created as an array.

#### For the game controls the user will use keyboard left nd right arrows to start the game and to move the snake over the box for controls listener will be created to capture the arrow clicks and will trigger the function `snakeDirection()` which will hold parameter to pass the clicked key

#### `HTML and CSS` will create the snake front-end and `js` will be used to move the snake

#### To track the game if its started or stop after the snake crashed `snakeCrashed` variable must created and will be inside `snakeDirection()` and will update `snake` variable .

#### while the snake moving forward the `DOM` must be updated with snake movement also and this will usd `setTimeOut` to run `snakeMoving()` function and will call `render()` when user click on keyboard arrows the snake direction will be change in the `DOM` using the `snakeDirection()` function

#### Once the game started a bites will be shown randomly in the box with timer to disappear if they not been eaten by the snake and will shown randomly again , when the snake moved to the bite that will trigger the `biteEaten()` function it will disappear and will be counted as collected points in `pointsCounter` and the `snake` array will updated with to add length to the snake then the `render()` function will update the `DOM` after that another bite will be created randomly again, to do this if statement will check for `snakeCrashed` variable if the game start then `showBites()` function will work inside `setTimeOut()` to work while the `snakeCrashed` is true and `bite` variable will hold the bite location in the array

#### Once the snake hit the box edge or hit itself the game will ended and the `snakeCrashed` variable will change to indicate that game ended and the message will be shown to the user with collected points and play again button , when the user click on play again button all variable will be reset and the user will be able to start a new game and `DOM` will be reset also to do that
