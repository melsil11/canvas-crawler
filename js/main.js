// console.log('js is linked and working')

// make a simple crawler game using HTML5's canvas tag and the associated properties of that tag, that we can manipulate with javascript.

// we need two entities, a hero and an ogre
// the hero should be moveable with the WASD or arrow keys
// the ogre should be stationary
// the hero and ogre should be able to collide to make something happen
// when the hero and ogre collide, the ogre is removed from the canvas, and the game stops, and sends a message to our user that they have won.

// first we need to grab our elements so we can make them do stuff
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')

// we need to set the game's context to be 2d
// we also SAVE that context to the ctx variable
// this tells our code, to do whatever we want it to do in the context of the canvas area.
const ctx = game.getContext('2d')

// console.log('movement', movement)
// console.log('message', message)
// console.log('game', game)

// message.innerText = 'full from lunch'

// one thing we need to do, is get the computed size of our canvas
// this is because the canvas could have different sizes on different screens
// and we need to be able to access the exact size of the canvas, in order to make this function like a game should.
// we do that, with the following lines of code:
// we need to set the attributes width and height according to how the canvas displays
game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

console.log('this is the game element', game)

// fillStyle is built in and sets a color to fill whatever shape you're drawing
// ctx.fillStyle = 'green'
// the fillRect takes 4 arguments in this order
// (xCoord, yCoord, width, height)
// these units are in pixels
// ctx.fillRect(10, 10, 100, 100)

// here is an example of the hero object
// notice this, the method uses function expression syntax
// using the keyword function -> NOT an arrow function
// this is because one of the primary diffs between a named function with the keyword and an arrow function is the context that 'this' refers to.
// const hero = {
//     x: 10,
//     y: 10,
//     color: 'hotpink',
//     width: 20,
//     height: 20,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// here's an example of how to make your hero show up on the canvas
// hero.render()

// Here's an example of an ogre object
// const ogre = {
//     x: 200,
//     y: 100,
//     color: "#bada55",
//     width: 60,
//     height: 120,
//     alive: true,
//     render: function () {
//         ctx.fillStyle = this.color
//         ctx.fillRect(this.x, this.y, this.width, this.height)
//     }
// }
// example of how to render the ogre
// ogre.render()

// Because our two crawlers(those are the guys that move around) are built of the same K:v pairs, we can use a javascript class to build them.
class Crawler {
    // we need a constructor function in order to make differences between instances of this class.
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        // we can hard set values inside the constructor as well
        this.alive = true,
        // we can even set methods inside the constructor
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

const player = new Crawler(10, 10, 'lightsteelblue', 16, 16)
let ogre = new Crawler(200, 50, '#bada55', 32, 48)

// now we're going to set up our movement handler function
// this will tell our code how our player moves around, and what keys to use to move them.
// this function has to be tied to an event handler.
const movementHandler = (e) => {
    // this move handler will be associated with a keydown event
    // we're going to use keycodes to tell it to do different movements for different keys
    // here are some keyCodes:
    // w = 87, a = 65, s = 83, d = 68
    // up = 38, left = 37, down = 40, right = 39
    // we COULD use if statements for this, but there is another syntax that's a little bit shorter called a switch case
    switch (e.keyCode) {
        // we can use multiple cases here for multiple keys to trigger the same event
        // move up
        case (87):
        case (38):
            // this will move the character up 10px every press
            player.y -= 10
            // we also need to break our cases like this
            break
        // move left
        case (65):
        case (37):
            // this moves the player left
            player.x -= 10
            break
        // move down
        case (83):
        case (40):
            // this moves player down
            player.y += 10
            break
        // move right
        case (68):
        case (39):
            // this will move the player to the right
            player.x += 10
            break
    }
}

// Here's the function we'll use to detect collision between entities
// to accurately detect a hit, we need to account for the entire space taken up by each object.
// we need to use the hero's x, y, w, and h, 
// as well as shrek's x, y, w, h
const detectHit = () => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(player.x < ogre.x + ogre.width 
        && player.x + player.width > ogre.x
        && player.y < ogre.y + ogre.height
        && player.y + player.height > ogre.y) {
            // console.log('WE HAVE A HIT!')
            // if we have a hit, shrek dies
            ogre.alive = false
            // the game winner is announced
            message.textContent = 'You win!'
        }
}

// we're going to set up a gameLoop function
// this will be attached to an interval
// this is how we will create animation in our canvas

const gameLoop = () => {
    // make sure you don't have any console.logs in here
    // console.log('frame running')

    if (ogre.alive) {
        detectHit()
    }
    // here we'll use another built in canvas method
    // this is called clearRect, and it clears rectangles
    // just like fillRect fills rectangles
    // here, we want to clear out the ENTIRE canvas every single frame
    ctx.clearRect(0, 0, game.width, game.height)

    movement.textContent = player.x + ", " + player.y
    player.render()

    if (ogre.alive) {
        ogre.render()
    }
}

// now, we're going to attach our movement handler to the keydown event, and we're going to run the gameLoop, and we want to make sure to only do this once all of the DOM content has loaded
document.addEventListener('DOMContentLoaded', function () {
    // once the DOM content loads, we can set up our movement event listener
    document.addEventListener('keydown', movementHandler)
    // we can also set up our gameloop interval
    setInterval(gameLoop, 60)
})

// ///////////the modified code to make it fancy //////////////////
// this is an extension and adjustment of the monsterMash branch of this repo. There are more comments on the monsterMash branch, explaining some of the lines in this branch.
// this incorporates smoother movement, and a more open ended collision detection function, as well as a second enemy.

// ////// RULES FOR DEVELOPING THE GAME //////////
// we need two entities, a hero and an ogre
// the hero should be moveable with the WASD or arrow keys
// the ogre should be stationary
// the hero and first ogre should be able to collide to make something happen
// when the hero and ogre1 collide, the ogre is removed from the canvas, and a second ogre appears
// when hero and ogre2 collide, the game stops, and sends a message to our user that they have won.
// ////////////// END RULES ////////////////////////////////


// first we need to grab our elements so we can make them do stuff
const game = document.getElementById('canvas')
const movement = document.getElementById('movement')
const message = document.getElementById('status')

// we need to set the game's context to be 2d
const ctx = game.getContext('2d')

game.setAttribute('width', getComputedStyle(game)['width'])
game.setAttribute('height', getComputedStyle(game)['height'])

// we're now diverging, and making a different class for each type of entity. One for our hero, one for our Ogres+
// class for our ogre
class Ogre {
    constructor(x, y, color, width, height, alive) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = alive,
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}
// class for our hero
class Hero {
    constructor(x, y, color, width, height) {
        this.x = x,
        this.y = y,
        this.color = color,
        this.width = width,
        this.height = height,
        this.alive = true,
        // we need two additional properties in order to make our hero move around a little smoother.
        this.speed = 15,
        // because we're going to rework our movement handler, we need directions, set to be different values that we can update with a keypress
        this.direction = {
            up: false,
            down: false,
            left: false,
            right: false
        },
        // we need two key based functions here that will change our hero's movement direction
        // this time, we'll only use WASD keys(purely for the sake of time)
        // setDirection will be tied to a keyDown event
        this.setDirection = function (key) {
            console.log('this is the key that was pressed', key)
            if (key.toLowerCase() == 'w') { this.direction.up = true }
            if (key.toLowerCase() == 'a') { this.direction.left = true }
            if (key.toLowerCase() == 's') { this.direction.down = true }
            if (key.toLowerCase() == 'd') { this.direction.right = true }
        },
        // unsetDirection will be tied to a keyUp event
        this.unsetDirection = function (key) {
            console.log('this is the key that was released', key)
            if (key.toLowerCase() == 'w') { this.direction.up = false }
            if (key.toLowerCase() == 'a') { this.direction.left = false }
            if (key.toLowerCase() == 's') { this.direction.down = false }
            if (key.toLowerCase() == 'd') { this.direction.right = false }
        },
        // we're also adding a movePlayer function that is tied to our directions
        this.movePlayer = function () {
            // movePlayer, sends our guy flying in whatever direction is true
            if (this.direction.up) {
                this.y -= this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                if (this.y <= 0) {
                    this.y = 0
                }
            }
            if (this.direction.left) {
                this.x -= this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                if (this.x <= 0) {
                    this.x = 0
                }
            }
            if (this.direction.down) {
                this.y += this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.y + this.height >= game.height) {
                    this.y = game.height - this.height
                }
            }
            if (this.direction.right) {
                this.x += this.speed
                // while we're tracking movement, let's stop our hero from exiting the top of the screen
                // for down, and right, we need the entire character for our detection of the wall, as well as the canvas width and height
                if (this.x + this.width >= game.width) {
                    this.x = game.width - this.width
                }
            }
        },
        this.render = function () {
            ctx.fillStyle = this.color
            ctx.fillRect(this.x, this.y, this.width, this.height)
        }
    }
}

// places ogres at random spots in the horizontal direction
const randomPlaceShrekX = (max) => {
    // we can use math random and canvas dimensions for this
    return Math.floor(Math.random() * max)
}

const player = new Hero(10, 10, 'lightsteelblue', 16, 16)
const ogre = new Ogre(200, 50, '#bada55', 32, 48, true)
const ogreTwo = new Ogre(randomPlaceShrekX(game.width), 50, 'red', 64, 96, true)

// function that changes the player's direction
document.addEventListener('keydown', (e) => {
    // when a key is pressed, call the setDirection method
    player.setDirection(e.key)
})
// function that stops player from going in specific direction
document.addEventListener('keyup', (e) => {
    // when a key is pressed, call the setDirection method
    if (['w', 'a', 's', 'd'].includes(e.key)) {
        player.unsetDirection(e.key)
    }
})

// detect when player has hit anything
const detectHit = (thing) => {
    // we're basically using one big if statement to cover all our bases
    // that means judging the player and ogre's x, y, width and height values
    if(player.x < thing.x + thing.width 
        && player.x + player.width > thing.x
        && player.y < thing.y + thing.height
        && player.y + player.height > thing.y) {
            thing.alive = false
        }
}

// we're going to set up a gameLoop function
// this will be attached to an interval
// this is how we will create animation in our canvas

const gameLoop = () => {
    // make sure you don't have any console.logs in here
    // console.log('frame running')
    ctx.clearRect(0, 0, game.width, game.height)

    if (ogre.alive) {
        ogre.render()
        detectHit(ogre)
    } else if (ogreTwo.alive) {
        message.textContent = 'Now kill the other ogre!'
        ogreTwo.render()
        detectHit(ogreTwo)
    } else {
        stopGameLoop()
        message.textContent = 'You win!'
    }
    

    movement.textContent = player.x + ", " + player.y
    player.render()
    player.movePlayer()
}
// used to render the game every 60 ms
const gameInterval = setInterval(gameLoop, 60)
// used to stop the game when the condition to do so is met
const stopGameLoop = () => {clearInterval(gameInterval)}

document.addEventListener('DOMContentLoaded', function () {
    // calls the game loop and runs the interval 
    gameInterval
})