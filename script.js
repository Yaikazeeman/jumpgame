var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
window.addEventListener("keydown", jump, false)
window.addEventListener("keyup", setKeyPressFlag, false)
window.addEventListener("touchstart", setTouch, false)
window.addEventListener("touchend", unSetTouch, false)


c.widht = window.innerWidth-30;
c.height = window.innerHeight-200; 

var scl = 25
var lineHeight = c.height/1.2;

//line
ctx.beginPath();
ctx.moveTo(0, lineHeight);
ctx.lineTo(c.width, lineHeight);
ctx.stroke();

var positionX = c.width-scl;
var positionY = lineHeight-scl;
var speed = -4;
var positionPlayerX = c.width/2;
var positionPlayerY = 0;
var speedPlayerUp = 4;
var speedPlayerDown = 2;

var score = 0;

var keyPressFlag = false;
var whichKey = null;
var touch = false;

function jump(e) {
    keyPressFlag = true;
    whichKey = e.keyCode;
    if(positionPlayerY < 0){
        keyPressFlag = false;
    }
}    

function setTouch(e) {
    touch = true;
    
}

function unSetTouch() {
    touch = false;
}

function setKeyPressFlag() {
    keyPressFlag = false;
}

function playerFall() {
    if( keyPressFlag === false || touch === false) {
        if(positionPlayerY < lineHeight-scl){
            positionPlayerY += speedPlayerDown;
        }

    } 
}

function increaseScore() {
    if(positionX === positionPlayerX){
        score += 1
        document.getElementById("score").innerHTML = score;
    }
}


function gameOver() {
    if(positionX === positionPlayerX && positionY === positionPlayerY){
        score = 0;
        document.getElementById("score").innerHTML = score;
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, c.width, c.height);

    //block
    ctx.fillRect(positionX, positionY, scl, scl);
    ctx.stroke();

    positionX += speed

    if(positionX < 0){
        speed = 2
    }
    if(positionX > c.width-scl){
        speed = -2
    }

    //player
    ctx.fillRect(positionPlayerX, positionPlayerY, scl, scl);
    ctx.stroke()
    
    if(keyPressFlag === true || touch === true){
        if(whichKey === 32 || touch === true) {
            positionPlayerY -= speedPlayerUp;
        }
    }

    playerFall();
    increaseScore();
    gameOver();

}

animate();