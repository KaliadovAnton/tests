class InputHandler{
    constructor (snake, pause) {
        document.addEventListener("keydown", (event)=>{
            switch (event.keyCode) {
                case 37:
                    if(snake[0].movement === 'right') break;
                    snake[0].movement = 'left'
                    break;
                case 39:
                    if(snake[0].movement === 'left') break;
                    snake[0].movement = 'right'
                    break
                case 38:
                    if(snake[0].movement === 'down') break;
                    snake[0].movement = 'up'
                    break;
                case 40:
                    if(snake[0].movement === 'up') break;
                    snake[0].movement = 'down'
                    break;
                case 27:
                    pause = true;
                    break;
            }
        })
    }
}


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;
ctx.lineWidth = 1;
ctx.fillStyle = 'black';
let rows = canvas.height/20;
let cellsInRows = canvas.width/20; 
var table = [];
var snake = [{x1: canvas.width/2, y1: canvas.height/2 + 10, movement: "right"}, 
{x1: canvas.width/2, y1: canvas.height/2 - 10, status: "snake", movement: "down"},{x1: canvas.width/2, y1: canvas.height/2 - 30, status: "snakeHead", movement: "down"}]; 
var goal =[];
var pause = false;
new InputHandler(snake, pause);
var score = document.getElementById('score');
score.innerText = snake.length-3;
draw();

function draw() {
    let x = 0;
    let y = 0;
    ctx.fillStyle = 'black';
    for(let i = 0; i< rows; i++) {
        for(let f = 0; f < cellsInRows; f++){
            ctx.strokeRect(x, y, 20, 20);
            table.push({x1: x,y1: y, status: 'common'});
            x+=20;
        }
        x = 0;        
        y+=20;
    }
    for(let i = 0; i<snake.length; i++){
        ctx.fillStyle = 'red';
        ctx.fillRect(snake[i].x1, snake[i].y1, 20, 20)
    }
    if(!table.find((cell) => cell.status == "goal")){    
        goal = newGoal();
    }
    ctx.fillRect(goal[0], goal[1], 20, 20);
    score.innerText = snake.length - 3;
}

function newGoal() {
    let x = Math.floor(Math.random() * canvas.width / 20) * 20;
    let y = Math.floor(Math.random() * canvas.height / 20) * 20;
    table.find((cell) => cell.x1 == x && cell.y1 == y).status = "goal";
    return [x, y];
}

function loop() {
    let timerId = setInterval(() => {
        ctx.clearRect(0, 0, 1600, 900);
        draw();
        snakeUpdate();
        if (goal[0]===snake[0].x1 && goal[1]===snake[0].y1){
            if(snake[0].movement==='left')
            {snake.unshift({x1: goal[0]-20, y1: goal[1], movement: snake[0].movement})};
            if(snake[0].movement==='right'){
                {snake.unshift({x1: goal[0]+20, y1: goal[1], movement: snake[0].movement})};
            }
            if(snake[0].movement==='up'){
                {snake.unshift({x1: goal[0], y1: goal[1]-20, movement: snake[0].movement})};
            }
            if(snake[0].movement==='down'){
                {snake.unshift({x1: goal[0], y1: goal[1]+20, movement: snake[0].movement})};
            }
            console.log(goal);
            table.find((cell) => cell.x1 == goal[0] && cell.y1 == goal[1]).status = "common";
            console.log(snake[0].x1, snake[0].y1, snake[1].x1, snake[1].y1, snake[0].movement, snake[1].movement)
            console.log(snake);
        }
        if (snake[1].x1 < 0 || snake[1].x1 > canvas.width - 20 || snake[1].y1<-20 || snake[1].y1 > canvas.height ){
            alert('game over');
        }
        if (snake.find((element)=> element != snake[1] && element.x1 === snake[1].x1 && element.y1 === snake[1].y1)) {
            alert('game over');
        }
        if (pause){
            console.log(pause);
            return;
        }
    }, 150);
   
}

function snakeUpdate() {
    let direction = snake[0].movement;
    for(let element of snake) {
        switch (element.movement) {
            case 'right': 
                element.x1+=20;
                break;
            case 'left':
                element.x1-=20 ;
                break;
            case 'up':
                element.y1-=20 ;
                break;
            case 'down':
                element.y1+=20 ;
                break;
        }
        let nextDirection = element.movement;
        element.movement = direction;
        direction = nextDirection;
    }
}


loop();

