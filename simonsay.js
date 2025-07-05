let gameSeq=[];
let userSeq=[];
let btns=["yellow","red","purple","green"];
let highScore = localStorage.getItem("highScore") || 0;



let started=false;
let level=0;

let h2=document.querySelector("h2");
document.addEventListener("keypress" ,function(){
   if(started==false){
    console.log("game is started");
    started =true;
    levelup();
   }
});
function gameFlash(btn){
    btn.classList.add("gameflash");
    setTimeout(function(){
        btn.classList.remove("gameflash")
    },250)
};
function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash")
    },250)
};

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`Level ${level}`;
   let ranIdx=Math.floor(Math.random()*3);
   let randColor=btns[ranIdx];
   gameSeq.push(randColor);
   console.log(gameSeq);
   let randBtn=document.querySelector(`.${randColor}`)
    gameFlash(randBtn);

};

function checkAns(idx){
//    console.log("current level:",level);
     
     if(userSeq[idx]===gameSeq[idx]){
       if(userSeq.length==gameSeq.length){
        setTimeout(levelup,1000);
       }
     }
     else{
         if (level > highScore) {
        highScore = level;
         localStorage.setItem("highScore", highScore);
        
    }
        h2.innerHTML=`Game Over!!!!!!!!!!!!!!</b> <br>Press Any Key To restart the Game!!!! <br>
          your score: ${level} | High Score: ${highScore}`
    
        document.querySelector("body").style.backgroundColor="red";
        setTimeout(function(){
           document.querySelector("body").style.backgroundColor="white" 
        },150);
       reset();
     }
}
function btnPress(){
  
    let btn=this;
    userFlash(btn);

   let userColor=btn.getAttribute("id");
   userSeq.push(userColor);
   console.log(userSeq);
   checkAns(userSeq.length-1);


};

let allBtns=document.querySelectorAll(".btn");
 
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
};

function reset(){
    started=false;
    gameSeq=[];
    userSeq=[];
    level=0;
}