var Letter = require("./Letter.js");

var Word = function (word) {

    this.newWord = function (word) {
        var storeLetter = [];
        for (var i = 0; i < word.length; i++) {
            var currentLetter = new Letter(word[i]);
            storeLetter.push(currentLetter);
        }
        return storeLetter;
    }

    this.letters = this.newWord(word);
    this.chosenWord = word;

    this.checkGuess = function (guess) {

        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterGuess(guess);

        }
    }

    this.display = function () {
        var storeLetter = '';
        for (var i = 0; i < this.letters.length; i++) {
            storeLetter += this.letters[i].display();
        }
        return storeLetter;
    }


}

module.exports = Word;

