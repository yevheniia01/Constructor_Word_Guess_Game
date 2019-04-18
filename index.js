var inquirer = require("inquirer");

var Word = require("./Word.js");

var chalk = require('chalk');
//available guesses
var guesses = 10;
var points = 0;
//words array
var wordsArray = ["Apple", "Orange","Strawberry", "Banana", "Pear"];
var randomWord;
var chosenWord;

//randomly choosing word
function random() {
    randomWord = wordsArray[Math.floor(Math.random() * wordsArray.length)]

    chosenWord = new Word(randomWord);
}

function displayWord() {
    if(randomWord === "Apple"){
        console.log(chalk.greenBright("Guess which Fruit I want right now!"));
    }else if(randomWord === "Orange"){
        console.log(chalk.redBright("Some orange fruit"))
    }else if(randomWord === "Strawberry"){
        console.log(chalk.red("Something Red"))
    }else if(randomWord === "Banana"){
        console.log(chalk.yellow("That yellow nice fruit!"))
    }else if(randomWord === "Pear"){
        console.log(chalk.green("Green one, friends with Apple"))
    } 
    if (guesses > 0 && points < 5) {

        console.log(chosenWord.display());
    

        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (str) {
                    if (str.length != 1) return false;
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }

            }

        ]).then(function (guessedLetter) {

            var guess = guessedLetter.txt;

            chosenWord.checkGuess(guess);

            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log(chalk.red("INCORRECT! " + guesses + " guesses remaining"))
            } 
            else {
                if (points < 5) {
                console.log(chalk.green("CORRECT!"))
                }
            }

            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 10;
                points++;

                if (points < 5) {
                    console.log(chalk.green("GOOD JOB! TRY TO GUESS NEXT ONE!"));
                    random();
                }

                else {
                    win();
                }
            }

            if (guesses === 0) {
                lose();
            }

            displayWord();

        });
    }

}
//check if lose
function lose() {
    console.log(chalk.red("GAME OVER!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                random();
                displayWord();
            }
            else {
                console.log(chalk.blue("hey"));
                process.exit();
            }
        })
}
//check if win
function win() {
    
    ('YOU WIN!', function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)
    })


    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                random();
                displayWord();
            }
            else {
                console.log(chalk.blue("ho ho ho"))
                process.exit();
            }
        })

}

random();
displayWord();