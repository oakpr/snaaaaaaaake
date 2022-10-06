const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
/*
    body[i][0] = X pos of ith segment
    body[i][1] = Y pos of ith segment
*/
var body = [];
const CANVAS_SIZE = canvas.height;
// Grid is a 20x20 grid on the canvas
// the game is played in the 18x18 grid centered on this grid
// the outer border is used for the... outer border
const GRID_SIZE = CANVAS_SIZE / 20;
// Size of each body part of the snake
// slightly smaller than the 
const SNAKE_SIZE = GRID_SIZE - 1;

class Fruit
{
    constructor(x, y)
    {
        this.fruitX = x;
        this.fruitY = y;
    }
    setPosition(newX, newY)
    {
        fruitX = newX;
        fruitY = newY;
    }
}

var juicyApple = new Fruit(0, 0);
placeFruit(juicyApple);
let speed = 1;

// build the starting snake
body.push([3, 3]);
body.push([3, 4]);

draw();

function draw()
{
    ctx.fillStyle = "purple";
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    ctx.fillStyle = "black";
    ctx.fillRect(GRID_SIZE, GRID_SIZE, CANVAS_SIZE - 2 * GRID_SIZE, CANVAS_SIZE - 2 * GRID_SIZE);
    
    drawSnake(body);
    drawFruit(juicyApple);
    
    setInterval(draw, 1000 / speed);

    body = moveSnake(body);
}

function drawSnake(snake)
{
    ctx.fillStyle = "green";
    
    for(i = 0; i < snake.length; i++)
    {
        ctx.fillRect(snake[i][0] * GRID_SIZE, snake[i][1] * GRID_SIZE, SNAKE_SIZE, SNAKE_SIZE);
    }

}

// never count fruit, just make a new one as they are eaten
// function countFruit()
// {
//     return 0;   
// }

function drawFruit(fruitToDraw)
{
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

        for(i = 0; i < body.length; i++)
        {
            if(body[i][0] == randomX && body[i][1] == randomY)
            {
                shouldPlace = false;
            }
        }
    } while(!shouldPlace);

    fruitToPlace.fruitX = randomX;
    fruitToPlace.fruitY = randomY;
    // removed painting from placeFruit() method
    // added paintFruit() method to do this
    // ctx.fillRect(randomX,randomY,10,10);
}

// collision check happens immidietly after movement step
// so the only collision can happen from the head of the snake
// so check that the head of the snake is not inside any of the walls
// or any of the other snake parts
// returns true if there is a collision
function checkCollision(snake)
{
    // eating a fruit
    if(snake[0][0] == juicyApple.fruitX && snake[0][1] == juicyApple.fruitY)
    // wall collision
    // left or right walls
    if(snake[0] == 0 || snake[0] == parseInt(CANVAS_SIZE / GRID_SIZE))
    {
        return true;
    }
    // top or bottom walls
    if(snake[1] == 0 || snake[1] == parseInt(CANVAS_SIZE / GRID_SIZE))
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

// Found a way to implement my janky offset code anyway - gb
const directions = {
    NORTH: 'north',
    EAST: 'south',
    SOUTH: 'east',
    WEST: 'west'
}

var snakeDir = directions.NORTH;

function keyDown(event)
{
    switch(event.keycode)
    {
        // up arrow
        case 38:
            snakeDir = directions.NORTH;
        // down arrow
        case 40:
            snakeDir = directions.SOUTH;
        // left arrow
        case 37:
            snakeDir = directions.WEST;
        // right
        case 39:
            snakeDir = directions.EAST;
        // no input
        default:
            snakeDir = getSnakeDirection(body)
    }
    
}

// Method to move the snake
// deletes the last element in the list, then adds a new body piece at the front
function moveSnake(snake)
{

    // Found a way to implement my janky offset code anyway - gb
    var dir = [0, 1];
    switch(snakeDir)
    {
        case 'north':
            dir = [0, 1];
            break;
        case 'east':
            dir = [1, 0];
            break;
        case 'south':
            dir = [0, -1];
            break;
        case 'west':
            dir = [-1, 0];
            break;
    }
    snake.pop();
    snake.unshift([snake[0][1] + dir[0], snake[0][1] + dir[1]]);
    return snake;
}

// Method to get the previous direction of the snake
// used to determine motion when there is no input from user
// finds the head of the snake, then checks which direction the next part is in
// returns the opposite of that direction
function getSnakeDirection(snake)
{
    return directions.NORTH
}

/*
amer typing space
----------------


*/
