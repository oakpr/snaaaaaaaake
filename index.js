// Snake game
// Amer, Graham, Waleed

const canvas = document.querySelector('#game');
const ctx = canvas.getContext('2d');
document.onkeydown = keyDown;

// body[0] = (X, Y) of "head" segment
// body[i][0] = X pos of ith segment
// body[i][1] = Y pos of ith segment
// body[body.length] = (X, Y) of the "tail" segment
var body = [];

const CANVAS_SIZE = canvas.height;

// Grid is a 20x20 grid on the canvas
// the game is played in the 18x18 grid centered on this grid
// the outer border is used for the... outer border
const GRID_COUNT = 20;
const GRID_SIZE = CANVAS_SIZE / GRID_COUNT;

// Size of each body part of the snake
// slightly smaller than the grid size to leave a cute outline
const SNAKE_SIZE = GRID_SIZE - 1;

// north/south is -/+ y
// east/west is +/- x
const directions = {
    NORTH: 'north',
    EAST: 'east',
    SOUTH: 'south',
    WEST: 'west'
}

let snakeDir = directions.NORTH;
let moveBuffer = snakeDir;

class Fruit
{
    constructor(x, y, color)
    {
        this.fruitX = x;
        this.fruitY = y;
        this.color = color;
    }
    setPosition(newX, newY)
    {
        this.fruitX = newX;
        this.fruitY = newY;
    }
    drawFruit()
    {
        if(this.fruitX == 0)
        {
            this.placeFruit();
        }
        ctx.fillStyle = this.color;
        ctx.fillRect(this.fruitX * GRID_SIZE, this.fruitY * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    }
    placeFruit()
    {
        let shouldPlace = true;
        let randomX;
        let randomY;
        do
        {
            // X and Y are now grid coordinates, not pixel coordinates
            randomX = parseInt(Math.random() * (GRID_COUNT - 2)) + 1;
            randomY = parseInt(Math.random() * (GRID_COUNT - 2)) + 1;
            shouldPlace = true;
            fruitBasket.forEach(fruit => {
                if(fruit.fruitX == randomX && fruit.fruitY == randomY)
                {
                    shouldPlace = false;
                }
            });
            portalBasket.forEach(portal => {
                if(portal.fruitX == randomX && portal.fruitY == randomY)
                {
                    shouldPlace = false;
                }
            });
            body.forEach(part => {
                if(part[0] == randomX && part[1] == randomY)
                {
                    shouldPlace = false;
                }
            });
        } while(!shouldPlace);
        this.setPosition(randomX, randomY);
        // removed painting from placeFruit() method
        // added paintFruit() method to do this
        // ctx.fillRect(randomX,randomY,10,10);
    }
    // method to check for fruit collision
    eatFruit()
    {
        if(body[0][0] == this.fruitX && body[0][1] == this.fruitY)
        {
            this.setPosition(0, 0);
            return true;
        }
        return false;
    }
}

let juicyApple = new Fruit(0, 0, 'red');
let sourOrange = new Fruit(0, 0, 'orange');
// let unripeMango = new Fruit(0, 0, 'limegreen');
// let rat = new Fruit(0, 0, "brown");
let fruitBasket = [juicyApple, sourOrange];

let portal0 = new Fruit(0, 0, 'limegreen');
let portal1 = new Fruit(0, 0, 'limegreen');
let portalBasket = [portal0, portal1]

fruitBasket.forEach(fruit => fruit.placeFruit());
portalBasket.forEach(portal => portal.placeFruit());

const speed = 5.0;
const time_interval = 60 / speed;
let time = 0;

let score = 0;
const heading = document.querySelector('#h1');

// build the starting snake
body.push([3, GRID_COUNT - 3]);
body.push([3, GRID_COUNT - 2]);

gameLoop();

function gameLoop()
{
    window.requestAnimationFrame(gameLoop);
    score = score > body.length ? score : body.length;
    let header_txt = 'Sn';
    for(i = 0; i < score; i++)
    {
        header_txt += 'a';
    }
    header_txt += 'ke';
    heading.innerHTML = header_txt;
    time += 1;
    drawBackground();
    // Movement loop:
    if(time >= time_interval) {
        time = 0;
        body = moveSnake(body);
    }
    if(checkCollision(body))
    {
        // restart the game
        snakeDir = directions.NORTH;
        moveBuffer = snakeDir;
        body = Array();
        body.push([3, GRID_COUNT - 3]);
        body.push([3, GRID_COUNT - 2]);
    }
    portalBasket.forEach(fruit => fruit.drawFruit());
    drawSnake(body);
    fruitBasket.forEach(fruit => fruit.drawFruit());
}

function drawBackground()
{
    ctx.fillStyle = 'purple';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = 'black';
    ctx.fillRect(GRID_SIZE, GRID_SIZE, CANVAS_SIZE - 2 * GRID_SIZE, CANVAS_SIZE - 2 * GRID_SIZE);
}

function drawSnake(snake)
{
    ctx.fillStyle = 'green';
    snake.forEach(part => ctx.fillRect(part[0] * GRID_SIZE, part[1] * GRID_SIZE, SNAKE_SIZE, SNAKE_SIZE));
}

// collision check happens immidietly after movement step
// so the only collision can happen from the head of the snake
// so check that the head of the snake is not inside any of the walls
// or any of the other snake parts
// returns true if there is a collision
function checkCollision(snake)
{
    // wall collision
    // left or right walls
    if(snake[0][0] == 0 || snake[0][0] == GRID_COUNT - 1)
    {
        return true;
    }
    // top or bottom walls
    if(snake[0][1] == 0 || snake[0][1] == GRID_COUNT - 1)
    {
        return true;
    }
    // snake collision
    let collision = false;
    snake.slice(1, snake.length).forEach(part => {
        if(snake[0][0] == part[0] && snake[0][1] == part[1])
        {
            collision = true;
        }
    });
    return collision;
}

function keyDown(e)
{
    // Support for Internet Explorer:
    e = e || window.event;
    switch(e.key)
    {
        case 'ArrowUp':
            if(snakeDir != directions.SOUTH)
            {
                moveBuffer = directions.NORTH;
            }
            break;
        case 'ArrowDown':
            if(snakeDir != directions.NORTH)
            {
                moveBuffer = directions.SOUTH;
            }
            break;
        case 'ArrowLeft':
            if(snakeDir != directions.EAST)
            {
                moveBuffer = directions.WEST;
            }
            break;
        case 'ArrowRight':
            if(snakeDir != directions.WEST)
            {
                moveBuffer = directions.EAST;
            }
            break;
    }    
}

// Method to move the snake
// deletes the last element in the list, then adds a new body piece at the front
function moveSnake(snake)
{
    snakeDir = moveBuffer;
    var dir = [0, 0];
    switch(snakeDir)
    {
        case 'north':
            dir = [0, -1];
            break;
        case 'east':
            dir = [1, 0];
            break;
        case 'south':
            dir = [0, +1];
            break;
        case 'west':
            dir = [-1, 0];
            break;
    }
    let port = 0;
    portalBasket.forEach(portal => port += portal.eatFruit(snake));
    if(port == 0)
    {
        snake.unshift([snake[0][0] + dir[0], snake[0][1] + dir[1]]);
    }
    else if(portal0.fruitX == 0)
    {
        snake.unshift([portal1.fruitX, portal1.fruitY]);
        portal1.setPosition(0, 0);
    }
    else if(portal1.fruitX == 0)
    {
        snake.unshift([portal0.fruitX, portal0.fruitY]);
        portal0.setPosition(0, 0);
    }
    let fed = 0;
    fruitBasket.forEach(fruit => fed += fruit.eatFruit(snake));
    if(fed == 0 && port == 0)
    {
        snake.pop();
    }
    return snake;
}

/*
amer typing space
----------------


*/
