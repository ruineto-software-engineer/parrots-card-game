//Global Variables
let counter = 1;
let attempt1;
let attempt2;
let attempt1f;
let attempt2f;
let counter_move = 0;
let counter_game_time = 0;
let fliped_cards = false;
let break_increment;

//Game Requests
let number_of_cards = parseInt(prompt("Com quantas cartas você deseja começar? (Escolher números entre 4 e 14, que sejam pares)"));
let even_number = number_of_cards % 2;
let row_cards = document.querySelector(".row-cards");

//Defeaut Array
let array_gifs = [
    'gif1.gif',
    'gif2.gif',
    'gif3.gif',
    'gif4.gif',
    'gif5.gif',
    'gif6.gif',
    'gif7.gif'   
]

//Looping Request
while(even_number !== 0 || number_of_cards === null || number_of_cards < 4 || number_of_cards > 14){
    number_of_cards = parseInt(prompt("Com quantas cartas você deseja começar? (Escolher números entre 4 e 14, que sejam pares)"));
    even_number = number_of_cards % 2;
}

//Shuffle Game Cards Array Gif
array_gifs.sort(comparator);

//Array Even Creation
let array_gifs_even = array_gifs.slice(0, number_of_cards/2);
    array_gifs_even = array_gifs_even.concat(array_gifs_even);

//Shuffle Game Cards Array Gif Even
array_gifs_even.sort(comparator);

//Input of Game Cards
for(let i = 0; i < number_of_cards; i++) {
    row_cards.innerHTML = row_cards.innerHTML + `
        <div class="card" data-identifier="card" onclick="game_card_select(this)">
            <div class="game-card front-face face" data-identifier="front-face">
                <img class="game-card-img" src="./assets/img/front.png">
            </div><!--front-face-->
            <div class="game-card back-face face" data-identifier="back-face">
                <img class="game-card-gif" src="./assets/gif/${array_gifs_even[i]}">
            </div><!--back-face-->
        </div><!--game-card-->
    `;
}

//Randomize Array
function comparator() { 
	return Math.random() - 0.5; 
}

//Card Game Select
function game_card_select(card_game) {
    if(fliped_cards === true){
        return;
    }

    const turn_down = card_game.querySelector(".back-face");
    const turn_down2 = card_game.querySelector(".front-face");

    turn_down.classList.add("card-selected-back");
    turn_down2.classList.add("card-selected-front");

    //Break Point Counter
    if(counter_move === 0){
        break_increment = setInterval(game_time_increment, 1000);
        let play_pause_button_visibility = document.querySelector(".play-pause");
        play_pause_button_visibility.classList.add("play-pause-visibility");
    }
    
    counter_move++;

    if(counter === 1){
        attempt1 = card_game.querySelector(".back-face");
        attempt1f = card_game.querySelector(".front-face");

        card_game.classList.add("card-not-selected");

        counter++;
    }else if(counter === 2){
        attempt1.parentNode.classList.remove("card-not-selected");

        attempt2 = card_game.querySelector(".back-face");
        attempt2f = card_game.querySelector(".front-face");

        if(attempt1.innerHTML === attempt2.innerHTML){
            fliped_cards = true;

            attempt1.classList.add("card-selected-back");
            attempt1f.classList.add("card-selected-front");
            attempt1.parentNode.classList.add("card-not-selected");
            
            attempt2.classList.add("card-selected-back");
            attempt2f.classList.add("card-selected-front");
            attempt2.parentNode.classList.add("card-not-selected");
        }else{
            fliped_cards = true;

            setTimeout(turn_up, 1000);
        }

        setTimeout(reset_counter, 1000);
    }

    setTimeout(end_game, 1000);
}

//Turn Up Card Game
function turn_up() {
    attempt1.classList.remove("card-selected-back");
    attempt1f.classList.remove("card-selected-front");

    attempt2.classList.remove("card-selected-back");
    attempt2f.classList.remove("card-selected-front");

    fliped_cards = false;
}

//Reset Counter Game
function reset_counter() {
    counter = 1;

    attempt1 = 0;
    attempt2 = 0;
    attempt1f = 0;
    attempt2f = 0;

    fliped_cards = false;
}

//End Game
function end_game() {
    let cards_down = document.querySelectorAll(".card-selected-back");

    if(cards_down.length === number_of_cards){
        alert(`Você ganhou em ${counter_move} jogadas e em ${counter_game_time - 1} segundos!`);
        
        let question_counter = 0;
        while(question_counter === 0){
            let question = prompt("Parabéns você concluiu o jogo! Deseja jogar novamente? (Sim ou Não)");

            if(question === "Sim"){
                number_of_cards = 0;
                location.reload(true);

                question_counter++;
            }else if(question === "Não"){
                number_of_cards = 0;
                clearInterval(break_increment);
    
                let restart_game_button = document.querySelector(".restart-game");
                restart_game_button.classList.add("restart-game-visible");

                let play_pause_button = document.querySelector(".game-buttons .play-pause");
                play_pause_button.classList.remove("play-pause");
                play_pause_button.innerHTML = "";
                
                question_counter++;
            }else{
                alert("Por favor, responda somente Sim ou Não!");
            }
        }
    }
}

//Play or Pause Game
function play_pause() {
    let play_pause_button = document.querySelector(".play-pause");

    if(play_pause_button.innerText === "Pause"){
        play_pause_button.innerHTML = "";
        play_pause_button.innerHTML = `
            <!--pause-->
            <ion-icon name="play"></ion-icon> Continuar
        `;

        clearInterval(break_increment);
        fliped_cards = true;
    }else{
        play_pause_button.innerHTML = "";
        play_pause_button.innerHTML = `
            <!--pause-->
            <ion-icon class="pause" name="pause"></ion-icon> Pause
        `;

        break_increment = setInterval(game_time_increment, 1000);
        fliped_cards = false;
    }
}

//Restart Game
function restart_game() {
    location.reload(true);
}

//Game Time Increment
function game_time_increment() {
    let initial_time = document.querySelector(".timer .timer-number");
    initial_time.innerHTML = counter_game_time++;
}