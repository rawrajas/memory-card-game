/*
 * Create a list that holds all of your cards
 */
const deck = {
    cards:[
        {
            class: 'card',
            icon: 'fa fa-anchor'
        },
        {
            class: 'card',
            icon: 'fa fa-anchor'
        },
        {
            class: 'card',
            icon: 'fa fa-bicycle'
        },
        {
            class: 'card',
            icon: 'fa fa-bicycle'
        },
        {
            class: 'card',
            icon: 'fa fa-bolt'
        },
        {
            class: 'card',
            icon: 'fa fa-bolt'
        },
        {
            class: 'card',
            icon: 'fa fa-bomb'
        },
        {
            class: 'card',
            icon: 'fa fa-bomb'
        },
        {
            class: 'card',
            icon: 'fa fa-cube'
        },
        {
            class: 'card',
            icon: 'fa fa-cube'
        },
        {
            class: 'card',
            icon: 'fa fa-diamond'
        },
        {
            class: 'card',
            icon: 'fa fa-diamond'
        },
        {
            class: 'card',
            icon: 'fa fa-leaf'
        },
        {
            class: 'card',
            icon: 'fa fa-leaf'
        },
        {
            class: 'card',
            icon: 'fa fa-paper-plane-o'
        },
        {
            class: 'card',
            icon: 'fa fa-paper-plane-o'
        }
    ]
}


// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

//Shuffle the cards using the function and log it to the console

shuffle(deck.cards);
console.log(deck.cards);

//Declare an empty array for the seen tiles
let seenTiles =[];

//Declare a counter for the flipped tiles
let tilesFlipped = 0;

//Declare an empty array for tile matches

let tilesMatched = [];

//Declare a counter for amount of moves

let numMoves = 0;

//Declare variable for final moves count
let movesResult = 0;

//Stopwatch from https://codepen.io/_Billy_Brown/pen/dbJeh

class Stopwatch {
    constructor(display, results) {
        this.running = false;
        this.display = display;
        this.results = results;
        this.laps = [];
        this.reset();
        this.print(this.times);
    }

    reset() {
        this.times = [ 0, 0, 0 ];
    }

    start() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
    }

    stop() {
        this.running = false;
        this.time = null;
    }

    restart() {
        if (!this.time) this.time = performance.now();
        if (!this.running) {
            this.running = true;
            requestAnimationFrame(this.step.bind(this));
        }
        this.reset();
    }

    step(timestamp) {
        if (!this.running) return;
        this.calculate(timestamp);
        this.time = timestamp;
        this.print();
        requestAnimationFrame(this.step.bind(this));
    }

    calculate(timestamp) {
        var diff = timestamp - this.time;
        // Hundredths of a second are 100 ms
        this.times[2] += diff / 10;
        // Seconds are 100 hundredths of a second
        if (this.times[2] >= 100) {
            this.times[1] += 1;
            this.times[2] -= 100;
        }
        // Minutes are 60 seconds
        if (this.times[1] >= 60) {
            this.times[0] += 1;
            this.times[1] -= 60;
        }
    }

    print() {
        this.display.innerText = this.format(this.times);
    }

    format(times) {
        return `\
        ${pad0(times[0], 2)}:\
        ${pad0(times[1], 2)}:\
        ${pad0(Math.floor(times[2]), 2)}`;
    }
}

function pad0(value, count) {
    var result = value.toString();
    for (; result.length < count; --count)
        result = '0' + result;
    return result;
}

function clearChildren(node) {
    while (node.lastChild)
        node.removeChild(node.lastChild);
}

let stopwatch = new Stopwatch(
    document.querySelector('.stopwatch'),
    document.querySelector('.results')
);

//Create a function for a new game

newGame = () =>
{
    //Reset the stopwatch and moves
    stopwatch.reset();
    numMoves =0;

    //create an empty string for inserting into index.html
    let htmlString = '';
    //Insert the HTML into htmlString
    for (let i = 0; i < deck.cards.length; i++) {
        htmlString += `<li class="${deck.cards[i].class}" onclick=stopwatch.start();clickFunction(this)><a class="${deck.cards[i].icon}"></a></li>`;
    }
    ;
    //Write htmlString into deck id
    document.getElementById('deck').innerHTML = htmlString;
    document.getElementsByClassName('moves')[0].innerHTML = 0;
    document.getElementById('game-win').setAttribute("class", "container-remove");
};

//Function for when a card is clicked
clickFunction = (element) =>
{
    //If a card is already flipped log message to the console
    if (element.getAttribute("class") === "card open show" || element.getAttribute("class") === "card match") {
        console.log("already opened");
    } else {
        //If there are less than two cards flipped, make the flippedCards equal to 1 , change the CSS attribute and push the element to seenTiles array
        if (tilesFlipped < 2) {
            tilesFlipped += 1;
            element.setAttribute("class", "card open show");
            seenTiles.push(element);
        }

        //Every time two tiles are flipped, add to moves counter and display it on HTML
        if (tilesFlipped == 2){
            numMoves++;
            document.getElementsByClassName('moves')[0].innerHTML = numMoves;

            //Remove a star from both game and win screen at 11 and 16 moves
            if (numMoves > 10){
                document.getElementById("star1").setAttribute("class", "star-remove");
                document.getElementById("finalStar1").setAttribute("class", "star-remove");
            }
            if (numMoves > 15){
                document.getElementById("star2").setAttribute("class", "star-remove");
                document.getElementById("finalStar2").setAttribute("class", "star-remove");
            }
        }

//Card match- If the two cards in the seenTiles array have the same class name
        if (tilesFlipped === 2 && seenTiles[0].children[0].className === seenTiles[1].children[0].className) {
            //Set attribute as a card match to both cards
            seenTiles[0].setAttribute("class", "card match");
            seenTiles[1].setAttribute("class", "card match");

            //Add the cards to the tilesMatched array
            tilesMatched.push(seenTiles[0]);
            tilesMatched.push(seenTiles[1]);

            //Clear the seenTiles array and set the tilesFlipped counter to 0
            seenTiles = [];
            tilesFlipped = 0;

        }
        //If the tilesMatched array is equal to the amount of cards array, win the game
        if (tilesMatched.length == deck.cards.length) {
            console.log('You win!');
            stopwatch.stop();
            //Display the final moves result on the win page
            document.getElementsByClassName('movesResult')[0].innerHTML = numMoves;

            //Display the final time result on the win page
            document.getElementsByClassName('timeResult')[0].innerHTML = document.getElementsByClassName('stopwatch')[0].innerHTML;

            //Hide the game container and show the win screen container
            document.getElementById("container").setAttribute("class", "container-remove");
            document.getElementById("game-win").removeAttribute("class", "container-remove");
        }
        //Card mismatch- If the two cards in the seenTiles array DO NOT have the same class name
        else if (tilesFlipped === 2 && seenTiles[0].children[0].className !== seenTiles[1].children[0].className){
            //Allow enough time for the user to see the flipped cards before flipping them back over
            setTimeout(function(){

            //Reset the mismatched cards to original attribute
            seenTiles[0].setAttribute("class", "mismatch card");
            seenTiles[1].setAttribute("class", "mismatch card");

            //Clear the seenTiles array and set the tilesFlipped counter to 0
            seenTiles = [];
            tilesFlipped = 0;
            }
        ,600);
        }
    }
};



/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
newGame();

