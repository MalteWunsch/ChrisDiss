/// <reference path="AnswerEvaluations.ts" />
/// <reference path="Question.ts" />

/**
 * A user's Answer to a Question originates from the letter key a user presses during a special time frame (when the
 * Question as a whole is displayed). After that, they can mark it as erroneous. A user's answer is not guaranteed to be
 * correct, so it can be evaluated.
 */
class Answer {
    /**
     * Whether an answer can be entered now.
     *
     * @type {boolean}
     */
    private static canBeEnteredNow: boolean;

    /**
     * Whether an answer can be marked as incorrect now.
     *
     * @type {boolean}
     */
    private static canBeMarkedNow: boolean;

    /**
     * Locked lower cased letter of the key the user has pressed.
     *
     * @type {string}
     */
    private letter: string;

    /**
     * Whether this answer is marked as being erroneous (whether this is correct in that mark or not).
     *
     * @type {boolean}
     */
    private markedAsErroneous: boolean;

    /**
     * Get the character for giving the "Yes, the colour of the blood tube label corresponds to the label on the tube
     * box" answer.
     *
     * @type {string}
     */
    public static getCharacterForYes() {
        return "y";
    }

    /**
     * Get the character for giving the "No, the colour of the blood tube label differs from the label on the tube box"
     * answer.
     *
     * @type {string}
     */
    public static getCharacterForNo() {
        return "n";
    }

    /**
     * Get the character for marking an answer as erroneous.
     *
     * @type {string}
     */
    public static getCharacterForMarkingAnswerAsErroneous() {
        return " ";
    }

    /**
     * Get whether answers can be entered now.
     *
     * @returns {bool}
     */
    public static getCanBeEnteredNow() {
        return (this.canBeEnteredNow === true);
    }

    /**
     * Set whether answers can be entered now.
     *
     * @param canBeEntered
     */
    public static setCanBeEnteredNow(canBeEntered: boolean) {
        this.canBeEnteredNow = canBeEntered;
    }

    /**
     * Get whether an answers can be marked as incorrect now.
     *
     * @returns {bool}
     */
    public static getCanBeMarkedNow() {
        return (this.canBeMarkedNow === true);
    }

    /**
     * Set whether answers can be marked as incorrect now.
     *
     * @param canBeMarked
     */
    public static setCanBeMarkedNow(canBeMarked: boolean) {
        this.canBeMarkedNow = canBeMarked;
    }

    /**
     * Constructor.
     *
     * @param letter the letter on the key the user pressed.
     */
    constructor(letter: string) {
        this.setLetter(letter);
    }

    /**
     * Get the lower cased letter of the key the user has pressed.
     *
     * @returns {string}
     */
    public getLetter() {
        return this.letter.toUpperCase();
    }

    /**
     * Set the lower cased letter of the key the user has pressed.
     *
     * @param letter
     * @returns {Answer} fluent interface
     */
    private setLetter(letter: string) {
        this.letter = letter.toLowerCase();
        return this;
    }

    /**
     * Get whether this answer was marked as being erroneous (whether this is correct in that mark or not).
     *
     * @returns {bool}
     */
    public isMarkedAsErroneous() {
        return (this.markedAsErroneous === true);
    }

    /**
     * Mark this answer as erroneous (whether this is correct or not).
     *
     * @returns {Answer}
     */
    public markAsErroneous() {
        this.markedAsErroneous = true;
        return this;
    }

    /**
     * Returns whether this answer means "Yes, the colour of the blood tube label corresponds to the label on the tube
     * box"
     *
     * @returns {bool}
     */
    public getAsBoolean = function () {
        var characterForYes = Answer.getCharacterForYes();
        return (this.letter === characterForYes);
    };

    /**
     * Get the one of five possible evaluations:
     * 1) user entered no (allowed) key at all
     * 2) user entered correct key and did not enter the "error noticed" key
     * 3) user entered wrong key and did not enter the "error noticed" key
     * 4) user entered wrong key and entered the "error noticed" key
     * 5) user entered correct key but entered the "error noticed" key
     *
     * @returns {AnswerEvaluation}
     */
    public static getEvaluation = function (myAnswer: Answer, question: Question) {
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
}
