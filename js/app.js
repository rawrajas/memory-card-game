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

//Stopwatch function from https://codepen.io/_Billy_Brown/pen/dbJeh

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
