/**
 * "Abstract" super class for answer evaluations.
 */
class AnswerEvaluation {
    /**
     * Human readable message for this evaluation.
     */
    private message: string;

    /**
     * Constructor.
     *
     * @param message Human readable message for this evaluation.
     */
    constructor(message: string) {
        this.setMessage(message);
    }

    /**
     * Get the human readable message for this evaluation.
     *
     * @returns {string}
     */
    public getMessage() {
        return this.message;
    }

    /**
     * Set the human readable message for this evaluation.
     *
     * @param message
     * @returns {AnswerEvaluation} fluent interface
     */
    public setMessage(message: string) {
        this.message = message;
        return this;
    }
}

/**
 * This AnswerEvaluation says no answer has been given.
 */
class NoAnswerEvaluation extends AnswerEvaluation {
    /**
     * Constructor.
     */
    constructor() {
        super('Bitte antworten Sie noch etwas schneller.');
    }
}

/**
 * This AnswerEvaluation says the given answer is correct (and was not falsely marked as incorrect).
 */
class CorrectAnswerEvaluation extends AnswerEvaluation {
    /**
     * Constructor.
     */
    constructor() {
        super('Gut: Ihre Antwort war richtig.');
    }
}

/**
 * This AnswerEvaluation says the given answer is wrong (and was not marked as incorrect).
 */
class WrongAnswerEvaluation extends AnswerEvaluation {
    /**
     * Constructor.
     */
    constructor() {
        super('Ihre Antwort war falsch.');
    }
}

/**
 * This AnswerEvaluation says the given answer was wrong but was marked as incorrect.
 */
class CorrectlyMarkedAnswerAsWrongEvaluation extends AnswerEvaluation {
    /**
     * Constructor.
     */
    constructor() {
        super('Gut: Sie haben bemerkt, dass Sie die falsche Antwort gegeben hatten.');
    }
}

/**
 * This AnswerEvaluation says the given original answer was correct but was marked as incorrect.
 */
class WronglyMarkedAnswerAsWrongEvaluation extends AnswerEvaluation {
    /**
     * Constructor.
     */
    constructor() {
        super('Sie haben Ihre eigentlich richtige Antwort leider als Vertipper markiert.');
    }
}
