const gameinfo = document.querySelector(".current");
const newgamebtn = document.querySelector(".btn");
const boxes = document.querySelectorAll(".box");

let currentPlayer ;
let gamegrid ;

const winninggrid = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [2,5,8],
    [1,4,7],
    [0,4,8],
    [2,4,6]
];

function initgame() {
    currentPlayer = "X";
    gamegrid = ["","","","","","","","",""];
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
    boxes.forEach(( box , index ) => {
        box.innerText = "";
        box.classList.remove("win");
        box.style.pointerEvents = "all";
    })

    newgamebtn.classList.remove("active");
}

initgame();

function swapturn(){
    if( currentPlayer === "X")
        currentPlayer = "0";
    else
        currentPlayer = "X";
    
    gameinfo.innerText = `Current Player - ${currentPlayer}`;
}

function checkgameover(){
    let answer = "" ;

    winninggrid.forEach( (position) => {
        if( ( gamegrid[position[0]] !== "" || gamegrid[position[1]] !== "" || gamegrid[position[2]] !== "" ) &&
           (gamegrid[position[0]] === gamegrid[position[1]] )&&(gamegrid[position[1]] === gamegrid[position[2]])){

                if ( gamegrid[position[0]] === "X")
                    answer = "X";
                else
                    answer = "0";

                boxes.forEach( (box) => {
                    box.style.pointerEvents = "none" ;
                } )
                
                boxes[position[0]].classList.add("win");
                boxes[position[1]].classList.add("win");
                boxes[position[2]].classList.add("win");
            }
    });

    if( answer !== ""){
        gameinfo.innerText = `Winner - ${answer}`;
        newgamebtn.classList.add("active");
        return ;
    }

    let filcount = 0 ; 

    boxes.forEach( (box) => {
        if ( box.innerText !== "" )
            filcount++ ;
    })

    if ( filcount === 9) {
        gameinfo.innerText = "Game Tied";
        newgamebtn.classList.add("active");
        return ;
    }
}



function handletick(index){
    if ( gamegrid[index] === ""){
        boxes[index].innerText = currentPlayer ;
        gamegrid[index] = currentPlayer ;
        boxes[index].style.pointerEvents = "none" ;
        swapturn() ;
        checkgameover() ;
    }
}

boxes.forEach( (box ,index ) => {
    box.addEventListener("click", () => {
        handletick(index);
    })
})

newgamebtn.addEventListener("click",() => {
    initgame();
})
