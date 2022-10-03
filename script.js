var height = 6; //number of guesses
var width = 5; //length of word

var row = 0; //current guess (attempt #)
var col = 0; // current letter for that attempt
var startButton = document.querySelector(".start-button"); // button
// list of movies to guess
var search = [
    "dumbo", "rambo", "bambi", "moana", "shaft", "rocky", "shrek"
]

var gameOver = false;

var word = ""

function initialize() {
    //Board creation
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);
        }
    }

    // Listen for key press
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;


        if ("KeyA" <= e.code && e.code <= "KeyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + '-' + col.toString());
                if (currTile.innerText == "") {
                    currTile.innerText = e.code[3]
                    col += 1;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col -= 1;
            }
            let currTile = document.getElementById(row.toString() + '-' + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row += 1;
            col = 0;
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }
    })
}

function update() {
    console.log(word)
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + '-' + c.toString());
        let letter = currTile.innerText;

        // Is the letter in the correct position?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct += 1;
        } // Is it in the word?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // Not in the word?
        else {
            title.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }
    console.log(correct)
}

var movieInfo = ""
// randomize the poster
function randomSearch() {
    var index = Math.floor(Math.random() * 7);
    var term = search[index]
    startButton.disabled = true;
    getCover(term)
    getReview(term)
}

// this is the movie cover API

const app = document.getElementById('root')

const logo = document.createElement('img')
logo.src = 'logo.png'

const container = document.createElement('div')
container.setAttribute('class', 'container')

function getCover(search) {
    fetch('http://www.omdbapi.com/?apikey=3e99f2a0&t=' + search)
        .then((response) => response.json())
        .then((data) => {
            word = search.toUpperCase()
            movieInfo = data.Poster
            getPoster()
            initialize();
        });
}
// displays movie poster
function getPoster(link) {
    const frame = document.createElement('img')
    frame.src = movieInfo
    document.getElementById("poster").appendChild(frame)
}
// NYT review API returns URL to article
function getReview(search) {
    fetch('https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=' + search + '&api-key=b5MKpSIbSVNKzSnGGJM3iGZsi2r7BfKD')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            var selectMovie = data.results.filter(title =>{
                if(title.display_title.toLowerCase() === search) {
                    return title
                }
            })
            console.log(selectMovie)
            var movieURL = selectMovie[0].link.url
            console.log(movieURL)
            displayMovieURL(movieURL)
        })
}
// displays link to review
function displayMovieURL(url){
    const frame = document.createElement("h4")
    const link = document.createElement('a')
    link.href = url
    link.textContent = 'Read about the movie here'
    frame.appendChild(link) 
    document.getElementById('about').appendChild(frame)
}

startButton.addEventListener("click", randomSearch); // Start buttons 