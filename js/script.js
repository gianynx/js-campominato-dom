/* 
Consegna
L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
Ogni cella ha un numero progressivo, da 1 a 100.
Ci saranno quindi 10 caselle per ognuna delle 10 righe.
Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto un messaggio in console con il numero della cella cliccata.
Bonus
Aggiungere una select accanto al bottone di generazione, che fornisca una scelta tra tre diversi livelli di difficoltà:
- con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, divise in 10 caselle per 10 righe;
- con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, divise in 9 caselle per 9 righe;
- con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, divise in 7 caselle per 7 righe;
*/

const form = document.querySelector('form');
form.addEventListener('submit', play);

// creo la function 'drawSquare' per disegnare il singolo quadrato all'interno di #game
// alla function 'drawSquare' servono due argomenti: 'index' (indice di ogni square) e 'numSquares' (numero dei quadratini)
function drawSquare(index, numSquares) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.style.width = `calc(100% / ${numSquares})`;
    square.style.height = `calc(100% / ${numSquares})`;
    square.style.border = `1px solid`;
    square.innerHTML = index;
    return square;
}

// creo la function 'play' perché deve apparire #game quando l'user clicca sul btn 'play'
function play(event) {
    event.preventDefault();
    const game = document.getElementById('game');

    // svuotiamo #game ogni volta che l'user clicca sul btn 'play'
    game.innerHTML = '';

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