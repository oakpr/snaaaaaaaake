<<<<<<< HEAD
const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
/*
    body[i][0] = X pos of ith segment
    body[i][1] = Y pos of ith segment
*/
var body = [];
const CANVAS_SIZE = canvas.height;
const GRID_SIZE = CANVAS_SIZE / 10;
const SNAKE_SIZE = GRID_SIZE - 1;
var fruit = [];
let speed = 10;
for(i = 0; i < 0; i++)
{
    body.push([i * GRID_SIZE, 0]); 
}

draw();

function draw()
{
    ctx.clearRect(GRID_SIZE, GRID_SIZE, CANVAS_SIZE - GRID_SIZE, CANVAS_SIZE - GRID_SIZE);
    
    // if (canvas.getContext)
    // {
    //     draw
        
    // }

    drawSnake();
    if (countFruit() == 0)
    {
        placeFruit();
    }
    
    setInterval(draw, 1000 / speed)
}

function drawSnake()
{
    snake = body;
    ctx.fillStyle = "green";
    let cursX = snake.x;
    let cursY = snake.y;
    
    for(i = 0; i < snake.length; i++)
    {
        ctx.fillRect(snake[i][0] * 10, snake[i][1] * 10, SNAKE_SIZE, SNAKE_SIZE);
    }

    
}

function countFruit()
{
    return 0;   
}

function placeFruit()
{
    // size = 100
    // grid_size = 10
    // body[0][0] = 10, 20, 30, etc.
    ctx.fillStyle = "red";
    let randomX = parseInt(Math.random() * (CANVAS_SIZE - 2 * GRID_SIZE)) + GRID_SIZE;
    randomX = randomX - randomX % GRID_SIZE;
    let randomY = parseInt(Math.random() * (CANVAS_SIZE - 2 * GRID_SIZE)) + GRID_SIZE;
    randomY = randomY - randomY % GRID_SIZE;
    let shouldPlace = true;
    for(i = 0; i < body.length; i++)
    {
        if(body[i][0] == randomX && body[i][1] == randomY)
        {
            shouldPlace = false;
        }
    }
    
    if(shouldPlace)
    {
        ctx.fillRect(randomX,randomY,10,10);
    }

    /*
    body[i][0] = X pos of ith segment
    body[i][1] = Y pos of ith segment
    thank you
*/
    
}

function checkWallCollision()
{

}

function keyDown(event)
{
    switch(event.keycode)
    {
        //up arrow
        case 38:
            
        //down arrow
        case 40:

        //left arrow
        case 37:
        
        //right
        case 39:

    }
    
}

/*
amer typing space
----------------


*/
=======
const canvas = document.getElementById("canvas");
const ctx = document.getContext("2d");

var grd = ctx.createLinearGradient(0,0,200,0);

ctx.fillStyle = "red";
ctx.fillStyle = grd;
ctx.fillRect(10, 10, 150, 100);


>>>>>>> 47446b2a68630b2bdba486fbb4bd4aa2c18ade7e
