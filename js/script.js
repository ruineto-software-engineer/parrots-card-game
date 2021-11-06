let counter = 1;
let attempt1 = 0;
let attempt2 = 0;
let attempt1f = 0;
let attempt2f = 0;

//Game Requests
let number_of_cards = parseInt(prompt("Com quantas cartas você deseja começar?"));
let even_number = number_of_cards % 2;
const row_cards = document.querySelector(".row-cards");

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
    number_of_cards = parseInt(prompt("Com quantas cartas você deseja começar?"));
    even_number = number_of_cards % 2;
}

let array_gifs_even = array_gifs.slice(0, number_of_cards/2); //corta o array até onde o usuário disse
    array_gifs_even = array_gifs_even.concat(array_gifs_even); //e eu copio o valor de cima, para que exista de forma forçada os pares

array_gifs_even.sort(comparator); // Após esta linha, a minhaArray estará embaralhada

//Input of Game Cards
for(let i = 0; i < number_of_cards; i++){
    row_cards.innerHTML = row_cards.innerHTML + `
        <div class="card" data-identifier="card" onclick="game_card_select(this)">
            <div class="game-card front-face face">
                <img class="game-card-img" src="./assets/img/front.png">
            </div><!--front-face-->
            <div class="game-card back-face face">
                <img class="game-card-gif" src="./assets/gif/${array_gifs_even[i]}">
            </div><!--back-face-->
        </div><!--game-card-->
    `;
}

// Esta função pode ficar separada do código acima, onde você preferir
function comparator() { 
	return Math.random() - 0.5; 
}

function game_card_select(card_game) {
    const turn_down = card_game.querySelector(".back-face");
    const turn_down2 = card_game.querySelector(".front-face");

    turn_down.classList.add("card-selected-back");
    turn_down2.classList.add("card-selected-front");

    if(counter === 1){
        attempt1 = card_game.querySelector(".back-face");
        attempt1f = card_game.querySelector(".front-face");
        counter++;
    }else if(counter === 2){
        attempt2 = card_game.querySelector(".back-face");
        attempt2f = card_game.querySelector(".front-face");

        if(attempt1.innerHTML === attempt2.innerHTML){
            attempt1.classList.add("card-selected-back");
            attempt1f.classList.add("card-selected-front");

            attempt2.classList.add("card-selected-back");
            attempt2f.classList.add("card-selected-front");
            //counter_move++
        }else{
            setTimeout(turn_up, 500);
            //counter_move++
        }

        setTimeout(reset_counter, 500);
    }

    //document.querySelector(".card-selected")
}

function turn_up() {
    attempt1.classList.remove("card-selected-back");
    attempt1f.classList.remove("card-selected-front");

    attempt2.classList.remove("card-selected-back");
    attempt2f.classList.remove("card-selected-front");
}

function reset_counter() {
    counter = 1;
    attempt1 = 0;
    attempt2 = 0;
    attempt1f = 0;
    attempt2f = 0;
}