let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","blue","green"];
let highScore = 0;

let started = false;
let level =0;
let h2 = document.querySelector("h2");


document.addEventListener("keypress",function(){
    if(started==false){
        console.log("Game is started");
        started = true;
        levelUp();
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },500);
}

function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");
    },400);
}

function levelUp(){
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;
    //random button choose
    let randIdx = Math.floor(Math.random()*4);
    let randColor  = btns[randIdx];
    let randbtn =document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randbtn);
}

function checkAns(idx){
    if(userSeq[idx] === gameSeq[idx]){
       if(userSeq.length == gameSeq.length){
           setTimeout(levelUp, 1000); 
       }
    } else {
        if (level > highScore) {
            highScore = level;
        }
        document.querySelector("#high-score").innerText = `Highest Score: ${highScore}`;

        h2.innerHTML = `Game Over! <br> Your Score was <b>${level}</b><br> Press any key to start`;


        document.querySelector("body").style.backgroundColor = 'red';
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
        }, 150);
        reset();
    }
}


function btnPress(){
    let btn = this;
    userFlash(btn);
    userColor = btn.getAttribute("id");
    console.log(userColor);
    userSeq.push(userColor);
    checkAns(userSeq.length-1);
}

let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}
function reset(){
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
}