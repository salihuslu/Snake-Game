var size = 25;
var row =20;
var col = 20;
var board, context;
var snakex = size * 5;
var snakey = size * 5;

var speedx = 0;
var speedy = 0;

var snakeBody = [];

var foodx, foody;
var gameover = false;

window.onload = function(){
    board = document.getElementById("board");
    board.height = row * size;
    board.width = col * size;
    context = board.getContext("2d");

    placefood();
    document.addEventListener("keyup", changeDirection);

    setInterval(update,1000/5);
}

function update (){
    if(gameover){
        return;
    }
    context.fillStyle = "blue";
    context.fillRect(0,0,board.width,board.height);

    // color for food and position
    context.fillStyle = "lightgreen";
    context.fillRect(foodx,foody,size,size);

    if(snakex == foodx && snakey == foody){
        snakeBody.push([foodx,foody]);
        placefood();
    }

    for(var i = snakeBody.length - 1; i>0; i--){
        snakeBody[i] = snakeBody[i-1];
    }
    if(snakeBody.length){
        snakeBody[0] = [snakex, snakey];
    }
    context.fillStyle = "red";
    snakex += speedx * size;
    snakey += speedy * size;

    context.fillRect(snakex, snakey, size, size);
    for(var i = 0; i<snakeBody.length; i++){
        context.fillRect(snakeBody[i][0], snakeBody[i][1], size, size);

    }
    if(snakex < 0 || snakex > col * size || snakey < 0 || snakey > row * size){
        gameover = true;
        alert("Game Over");
    }
    for(var i = 0; i < snakeBody.length; i++){
        if(snakex == snakeBody[i][0] && snakey == snakeBody[i][1]){
            gameover = true;
        }
    }
}
function changeDirection(e){
    if(e.code == "ArrowUp" && speedy != 1){
        speedx = 0;
        speedy = -1;
    }
    else if(e.code ==  "ArrowDown" && speedy != -1){
        speedx = 0;
        speedy = 1;
    }
    else if(e.code ==  "ArrowLeft" && speedx != 1){
        speedx = -1;
        speedy = 0;
    }
    else if(e.code ==  "ArrowRight" && speedx != -1){
        speedx = 1;
        speedy = 0;
    }
}
function placefood(){
    foodx = Math.floor(Math.random() * col) * size;
    foody = Math.floor(Math.random() * row) * size;
}