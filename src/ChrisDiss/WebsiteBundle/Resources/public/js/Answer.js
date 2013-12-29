var Answer = (function () {
    function Answer(letter) {
        this.getAsBoolean = function () {
            var characterForYes = Answer.getCharacterForYes();
            return (this.letter === characterForYes);
        };
        this.setLetter(letter);
    }
    Answer.canBeEnteredNow = undefined;
    Answer.getCharacterForYes = function getCharacterForYes() {
        return "y";
    }
    Answer.getCharacterForNo = function getCharacterForNo() {
        return "n";
    }
    Answer.getCharacterForMarkingAnswerAsErroneous = function getCharacterForMarkingAnswerAsErroneous() {
        return " ";
    }
    Answer.getCanBeEnteredNow = function getCanBeEnteredNow() {
        return (this.canBeEnteredNow === true);
    }
    Answer.setCanBeEnteredNow = function setCanBeEnteredNow(canBeEntered) {
        this.canBeEnteredNow = canBeEntered;
    }
    Answer.prototype.getLetter = function () {
        return this.letter.toUpperCase();
    };
    Answer.prototype.setLetter = function (letter) {
        this.letter = letter.toLowerCase();
        return this;
    };
    Answer.prototype.isMarkedAsErroneous = function () {
        return (this.markedAsErroneous === true);
    };
    Answer.prototype.markAsErroneous = function () {
        this.markedAsErroneous = true;
        return this;
    };
    Answer.getEvaluation = function (myAnswer, question) {
        if(myAnswer === null) {
            return new NoAnswerEvaluation();
        }
        if(myAnswer.isMarkedAsErroneous() === false) {
            if(myAnswer.getAsBoolean() === question.getCorrectAnswer()) {
                return new CorrectAnswerEvaluation();
            }
            return new WrongAnswerEvaluation();
        }
        if(myAnswer.getAsBoolean() === question.getCorrectAnswer()) {
            return new WronglyMarkedAnswerAsWrongEvaluation();
        }
        return new CorrectlyMarkedAnswerAsWrongEvaluation();
    };
    return Answer;
})();
//@ sourceMappingURL=Answer.js.map
