let btnRef = document.querySelectorAll(".button-option");
let popRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// winning pattern array

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],

];

//Player X plays first

let xTurn = true;
let count = 0;

//Display all buttons

const disableButtons = () => {
    btnRef.forEach((element) => (element.disabled = true))

    //enable popup
    popRef.classList.remove("hide")
}



//enable all buttons (for new game and restart)

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";
        element.disabled = false
    })

    popRef.classList.add("hide")
}

//This function executes when a player wins
const winFunction = (letter) => {
    disableButtons()

    if (letter == "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins "
    }
    else {
        msgRef.innerHTML = "&#x1F389; <br> 'O' Wins "

    }

}

//This function executes when a draw
const drawFunction = () => {
    disableButtons()
    msgRef.innerHTML = "&#x1F60E; <br> It's a Draw"
}

//new game btn

newgameBtn.addEventListener("click", () => {
    count = 0;
    enableButtons()
})

//restart btn
restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons()
})

//win logic
const winChecker = () => {

    //Loop through winning pattern
    for (let i of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[i[0]].innerText,
            btnRef[i[1]].innerText,
            btnRef[i[2]].innerText,
        ];

        if (element1 != "" && element2 !== "" && element3 !== "") {
            if (element1 == element2 && element2 == element3) {
                //If all 3 buttons have same values then pass the value to the winFunction
                winFunction(element1)
            }
        }
    }
}

//Display X/O
btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (xTurn) {
            xTurn = false;
            //Display X
            element.innerText = "X";
            element.disabled = true;
        }
        else {
            xTurn = true;

            //Display O
            element.innerText = "O"
            element.disabled = true
        }

        count += 1;

        if (count == 9) {
            //It's a draw possiblity of Nine box filled
            drawFunction()
        }

        //Check win on every check
        winChecker()
    })

})

//Enable Buttons and Disable popup on page load
window.onload = enableButtons;