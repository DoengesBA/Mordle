var height = 6; //number of guesses
var width = 5; //length of word

var row = 0; //current guess (attempt #)
var col = 0; // current letter for that attempt

var gameOver = false;
var word = "SQUID"

window.onload = function() {
    initialize();
}

function initialize() {
    //Board creation
    for(let r = 0; r < height; r++) {
        for(let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile)
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
              col -=1;  
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
}
