/// <reference path="AnswerEvaluations.ts" />
/// <reference path="Question.ts" />
/**
* A user's Answer to a Question originates from the letter key a user presses during a special time frame (when the
* Question as a whole is displayed). After that, they can mark it as erroneous. A user's answer is not guaranteed to be
* correct, so it can be evaluated.
*/
var Answer = (function () {
    /**
    * Constructor.
    *
    * @param letter the letter on the key the user pressed.
    */
    function Answer(letter) {
        /**
        * Returns whether this answer means "Yes, the colour of the blood tube label corresponds to the label on the tube
        * box"
        *
        * @returns {bool}
        */
        this.getAsBoolean = function () {
            var characterForYes = Answer.getCharacterForYes();
            return (this.letter === characterForYes);
        };
        this.setLetter(letter);
    }
    /**
    * Get the character for giving the "Yes, the colour of the blood tube label corresponds to the label on the tube
    * box" answer.
    *
    * @type {string}
    */
    Answer.getCharacterForYes = function () {
        return "y";
    };

    /**
    * Get the character for giving the "No, the colour of the blood tube label differs from the label on the tube box"
    * answer.
    *
    * @type {string}
    */
    Answer.getCharacterForNo = function () {
        return "n";
    };

    /**
    * Get the character for marking an answer as erroneous.
    *
    * @type {string}
    */
    Answer.getCharacterForMarkingAnswerAsErroneous = function () {
        return " ";
    };

    /**
    * Get whether answers can be entered now.
    *
    * @returns {bool}
    */
    Answer.getCanBeEnteredNow = function () {
        return (this.canBeEnteredNow === true);
    };

    /**
    * Set whether answers can be entered now.
    *
    * @param canBeEntered
    */
    Answer.setCanBeEnteredNow = function (canBeEntered) {
        this.canBeEnteredNow = canBeEntered;
    };

    /**
    * Get whether an answers can be marked as incorrect now.
    *
    * @returns {bool}
    */
    Answer.getCanBeMarkedNow = function () {
        return (this.canBeMarkedNow === true);
    };

    /**
    * Set whether answers can be marked as incorrect now.
    *
    * @param canBeMarked
    */
    Answer.setCanBeMarkedNow = function (canBeMarked) {
        this.canBeMarkedNow = canBeMarked;
    };

    /**
    * Get the lower cased letter of the key the user has pressed.
    *
    * @returns {string}
    */
    Answer.prototype.getLetter = function () {
        return this.letter.toUpperCase();
    };

    /**
    * Set the lower cased letter of the key the user has pressed.
    *
    * @param letter
    * @returns {Answer} fluent interface
    */
    Answer.prototype.setLetter = function (letter) {
        this.letter = letter.toLowerCase();
        return this;
    };

    /**
    * Get whether this answer was marked as being erroneous (whether this is correct in that mark or not).
    *
    * @returns {bool}
    */
    Answer.prototype.isMarkedAsErroneous = function () {
        return (this.markedAsErroneous === true);
    };

    /**
    * Mark this answer as erroneous (whether this is correct or not).
    *
    * @returns {Answer}
    */
    Answer.prototype.markAsErroneous = function () {
        this.markedAsErroneous = true;
        return this;
    };

    Answer.getEvaluation = function (myAnswer, question) {
        if (myAnswer === null || myAnswer === undefined) {
            return new NoAnswerEvaluation();
        }

        if (myAnswer.isMarkedAsErroneous() === false) {
            if (myAnswer.getAsBoolean() === question.getCorrectAnswer()) {
                return new CorrectAnswerEvaluation();
            }
            return new WrongAnswerEvaluation();
        }

        if (myAnswer.getAsBoolean() === question.getCorrectAnswer()) {
            return new WronglyMarkedAnswerAsWrongEvaluation();
        }
        return new CorrectlyMarkedAnswerAsWrongEvaluation();
    };
    return Answer;
})();
//# sourceMappingURL=Answer.js.map
