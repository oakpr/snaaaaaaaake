// Snake game
// Amer, Graham, Waleed

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
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

class Fruit
{
    constructor(x, y)
    {
        this.fruitX = x;
        this.fruitY = y;
    }
    setPosition(newX, newY)
    {
        this.fruitX = newX;
        this.fruitY = newY;
    }
}

var juicyApple = new Fruit(0, 0);
placeFruit(juicyApple);
let speed = 5.0;

const time_interval = 60 / speed
let time = 0

// build the starting snake
let snakeDir = directions.NORTH;
let moveBuffer = snakeDir
body.push([3, GRID_COUNT - 3]);
body.push([3, GRID_COUNT - 2]);

gameLoop();

function gameLoop()
{
    window.requestAnimationFrame(gameLoop);
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
    drawSnake(body);
    drawFruit(juicyApple);
}

function drawBackground()
{
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "black";
    ctx.fillRect(GRID_SIZE, GRID_SIZE, CANVAS_SIZE - 2 * GRID_SIZE, CANVAS_SIZE - 2 * GRID_SIZE);
}

function drawSnake(snake)
{
    ctx.fillStyle = "green";
    for(i = 0; i < snake.length; i++)
    {
        ctx.fillRect(snake[i][0] * GRID_SIZE, snake[i][1] * GRID_SIZE, SNAKE_SIZE, SNAKE_SIZE);
    }
}

function drawFruit(fruitToDraw)
{
    if(fruitToDraw.fruitX == 0)
    {
        placeFruit(fruitToDraw);
    }
    ctx.fillStyle = "red";
    ctx.fillRect(fruitToDraw.fruitX * GRID_SIZE, fruitToDraw.fruitY * GRID_SIZE, GRID_SIZE, GRID_SIZE);
}

function placeFruit(fruitToPlace)
{
    let shouldPlace = true;
    var randomX, randomY
    do
    {
        // X and Y are now grid coordinates, not pixel coordinates
        randomX = parseInt(Math.random() * (GRID_SIZE - 2)) + 1;
        randomY = parseInt(Math.random() * (GRID_SIZE - 2)) + 1;
        shouldPlace = true;
        for(part in body)
        {
            if(part[0] == randomX && part[1] == randomY)
            {
                shouldPlace = false;
            }
        }
    } while(!shouldPlace);

    fruitToPlace.setPosition(randomX, randomY)

    // removed painting from placeFruit() method
    // added paintFruit() method to do this
    // ctx.fillRect(randomX,randomY,10,10);
}

// method to check for fruit collision
function eatFruit(snake, fruitToEat)
{
    if(snake[0][0] == fruitToEat.fruitX && snake[0][1] == fruitToEat.fruitY)
    {
        fruitToEat.setPosition(0, 0);
        return true;
    }
    return false;
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
    if(snake[0][0] == 0 || snake[0][0] == parseInt(CANVAS_SIZE / GRID_COUNT - 1))
    {
        return true;
    }
    // top or bottom walls
    if(snake[0][1] == 0 || snake[0][1] == parseInt(CANVAS_SIZE / GRID_COUNT - 1))
    {
        return true;
    }
    // snake collision
    for(snakeidx = 1; snakeidx < snake.length; snakeidx++)
    {
        if(snake[0][0] == snake[snakeidx][0] && snake[0][1] == snake[snakeidx][1])
        {
            return true;
        }
    }
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
    // Found a way to implement my janky offset code anyway - gb
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
    snake.unshift([snake[0][0] + dir[0], snake[0][1] + dir[1]]);
    if(!eatFruit(snake, juicyApple))
    {
        // alert(juicyApple.fruitX, juicyApple.fruitY);
        snake.pop();
    }
    return snake;
}

/*
amer typing space
----------------


*/
