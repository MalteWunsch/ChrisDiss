/**
 * "Abstract" super class for answer evaluations.
 */
class AnswerEvaluation {
    /**
     * Human readable message for this evaluation.
     */
    private message: string;

    /**
     * Creation date of this evaluation.
     */
    private createdAt: Date;

    /**
     * Name of the evaluation type, e.g. 'NoAnswer'.
     */
    private type: string;

    /**
     * Constructor.
     *
     * @param message Human readable message for this evaluation.
     * @param type Name of the evaluation type, e.g. 'NoAnswer'.
     */
    constructor(message: string, type: string) {
        this.setMessage(message);
        this.setType(type);
        this.createdAt = new Date();
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

    /**
     * Set the name of the evaluation type, e.g. 'NoAnswer'.
     *
     * @param type
     * @returns {AnswerEvaluation} fluent interface
     */
    public setType(type: string) {
        this.type = type;
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
        super('Bitte antworten Sie etwas schneller.', 'NoAnswer');
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
        super('Gut: Ihre Antwort war richtig.', 'UnmarkedCorrectAnswer');
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
        super('Ihre Antwort war falsch.', 'UnmarkedWrongAnswer');
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
        super('Gut: Sie haben bemerkt, dass Sie die falsche Antwort gegeben hatten.', 'MarkedWrongAnswer');
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
        super('Sie haben Ihre eigentlich richtige Antwort leider als Vertipper markiert.', 'MarkedCorrectAnswer');
    }
}
