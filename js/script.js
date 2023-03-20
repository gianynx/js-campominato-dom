/* 
Consegna
Il computer deve generare 16 numeri casuali nello stesso range della difficoltà prescelta: le bombe.
Attenzione: nella stessa cella può essere posizionata al massimo una bomba, perciò nell’array delle bombe non potranno esserci due numeri uguali.
In seguito l'utente clicca su una cella: se il numero è presente nella lista dei numeri generati - abbiamo calpestato una bomba - la cella si colora di rosso e la partita termina.
Altrimenti la cella cliccata si colora di azzurro e l'utente può continuare a cliccare sulle altre celle.La partita termina quando il giocatore clicca su una bomba o quando raggiunge il numero massimo possibile di numeri consentiti (ovvero quando ha rivelato tutte le celle che non sono bombe).
Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha cliccato su una cella che non era una bomba.
BONUS:
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- difficoltà 1 ⇒ 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- difficoltà 2 ⇒ 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- difficoltà 3 ⇒ 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
Superbonus 1
Quando si clicca su una bomba e finisce la partita, evitare che si possa cliccare su altre celle.
Superbonus 2
Quando si clicca su una bomba e finisce la partita, il software scopre tutte le bombe nascoste.
*/

const form = document.querySelector('form');
form.addEventListener('submit', play);

// creo la function 'drawSquare' per disegnare il singolo quadrato all'interno di #game
// alla function 'drawSquare' servono due argomenti: 'index' (indice di ogni square) e 'numSquares' (numero dei quadratini)
function drawSquare(content, numSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = `calc(100% / ${numSquares})`;
    square.style.border = `1px solid`;
    square.innerHTML = content;
    return square;
}

// creo la function 'createBombs' per generare le 16 bombe
function createBombs(numBombs, max) {
    const bombs = [];
    while (bombs.lenght < numBombs) {
        const bomb = getRndInteger(1, max);
        if (!bombs.includes(bomb)) {
            bombs.push(bomb);
        }
    }
    return bombs;
}

// creo la function 'play' perché deve apparire #game quando l'user clicca sul btn 'play'
function play(event) {
    event.preventDefault();
    const game = document.getElementById('game');

    // svuotiamo #game ogni volta che l'user clicca sul btn 'play'
    game.innerHTML = '';

    const BOMBS = 16;
    const level = document.getElementById('level').value;

    // creo la variable 'squareNumbers' a seconda del grado di difficoltà
    let squareNumbers;

    switch (level) {
        case 'Beginner':
            squareNumbers = 100;
            break;
        case 'Intermediate':
            squareNumbers = 81;
            break;
        case 'Expert':
            squareNumbers = 49;
            break;
    };

    // creo la variabile 'squarePerRow' per il numero di quadratini per riga di ogni grado di difficoltà
    let squarePerRow = Math.sqrt(squareNumbers);

    // chiamo la function 'createBombs' per generare le bombe con l'array
    const bombs = createBombs(BOMBS, squareNumbers);

    // creo un loop for per disegnare i quadratini
    for (let a = 1; a <= squareNumbers; a++) {

        // chiamo la function 'drawSquare' all'interno del loop for
        const square = drawSquare(a, squarePerRow);

        square.addEventListener('click', safe);
        function safe() {
            square.classList.add('safe');
        }

        game.appendChild(square);

        };
    }