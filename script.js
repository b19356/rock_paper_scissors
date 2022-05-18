const user = document.querySelectorAll("nav > button");

const computer = ["rock", "paper", "scissors"];

const div_display = document.querySelector("div");

const play_again = document.querySelector("div > button");

const p_1 = document.querySelector("output > p:nth-of-type(1)");

const p_2 = document.querySelector("output > p:nth-of-type(2)");

const p_3 = document.querySelector("output > p:nth-of-type(3)");

const p_4 = document.querySelector("output > p:nth-of-type(4)");

const final = document.querySelector("div > p");

//sub objects in data object correspond to computer selection - then names are user selection - values are who wins
const data = {

    rock: {
        rock: "tie",
        paper: "user",
        scissors: "computer",
    },

    paper: {
        rock: "computer",
        paper: "tie",
        scissors: "user",
    },

    scissors: {
        rock: "user",
        paper: "computer",
        scissors: "tie",
    }

}

let gameCounter = 0;

let computerWins = 0;

let ties = 0;

let userWins = 0;

function computerPick() {

    let random_num = Math.floor(Math.random()*3);

    return random_num;
}

function playGame(e) {

// Only proceed if buttons are not grayed out - game in progress
    if (!e.target.classList.contains("game_over")) {

    gameCounter += 1;

    let random_num = computerPick();

 // index computer array to find word choice
    let computer_choice = computer[random_num];

    if (gameCounter <= 5) {

        let user_choice = e.target.textContent.toLowerCase();
//conduct lookup to find winner
        if (data[computer_choice][user_choice] == "user") {

            userWins += 1;
            
        } 
        else if (data[computer_choice][user_choice] == "computer") {

            computerWins += 1;
        }

        else  {

            ties += 1;
        }

        p_1.textContent = `Game ${gameCounter}`

        p_2.textContent = `User: ${user_choice} / Computer: ${computer_choice}.`;  

        p_3.textContent = "Score";
        
        p_4.textContent = `Computer: ${computerWins}, User: ${userWins}, Ties: ${ties}`;
    }
// stop game playing if more than 5 games - find overall winner
    else  {

        if (userWins == computerWins) {

            overall_winner = "Tie";
        }

        else if (userWins > computerWins) {

            overall_winner = "You";
        }

        else {

            overall_winner = "Computer";
        }

        final.textContent = `Overall Winner: ${overall_winner}`;

        // switch states to game over - gray out buttons

        user.forEach(function(el){
            el.classList.add("game_over");
        })

        div_display.classList.add("see_me");

// refresh scores
        gameCounter = 0;
        computerWins = 0;
        userWins = 0;
        ties = 0;
    }
}

}

function startOver() {

    div_display.classList.remove("see_me");

    p_1.textContent = "";

    p_2.textContent = "";

    p_3.textContent = "";
    
    p_4.textContent = "";

    final.textContent = "";

    user.forEach(function (el) {
        el.classList.remove("game_over");
    })

}

user.forEach(function(el) {

    el.addEventListener("click", playGame)
})

play_again.addEventListener("click", startOver)