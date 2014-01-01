/**
 * TestResult is an aggregation of the AnswerEvaluations.
 */
class TestResult {
    /**
     * Collection of Answers that were wrong but correctly marked as such.
     */
    markedWrongAnswers: CorrectlyMarkedAnswerAsWrongEvaluation[] = [];

    /**
     * Collection of Answers that were wrong and not marked as such.
     */
    unmarkedWrongAnswers: WrongAnswerEvaluation[] = [];

    /**
     * Collection of Answers that were correct but marked as wrong.
     */
    markedCorrectAnswers: WronglyMarkedAnswerAsWrongEvaluation[] = [];

    /**
     * Collection of Answers that were correct and correctly not marked as wrong.
     */
    unmarkedCorrectAnswers: CorrectAnswerEvaluation[] = [];

    /**
     * Add an AnswerEvaluation to this TestResult.
     *
     * @param evaluation
     */
    public add(evaluation: AnswerEvaluation) {
        if (evaluation instanceof CorrectlyMarkedAnswerAsWrongEvaluation) {
            this.markedWrongAnswers.push(evaluation);
        } else if (evaluation instanceof WrongAnswerEvaluation) {
            this.unmarkedWrongAnswers.push(evaluation);
        } else if (evaluation instanceof WronglyMarkedAnswerAsWrongEvaluation) {
            this.markedCorrectAnswers.push(evaluation);
        } else if (evaluation instanceof CorrectAnswerEvaluation) {
            this.unmarkedCorrectAnswers.push(evaluation);
        }
    }

    /**
     * Get the number of Answers that were wrong but correctly marked as such.
     *
     * @returns {number}
     */
    public getNumberOfMarkedWrongAnswers() {
        return this.markedWrongAnswers.length;
    }

    /**
     * Get the number of Answers that were wrong and not marked as such.
     *
     * @returns {number}
     */
    public getNumberOfUnmarkedWrongAnswers() {
        return this.unmarkedWrongAnswers.length;
    }

    /**
     * Get the number of Answers that were correct but marked as wrong.
     *
     * @returns {number}
     */
    public getNumberOfMarkedCorrectAnswers() {
        return this.markedCorrectAnswers.length;
    }

    /**
     * Get the number of Answers that were correct and correctly not marked as wrong.
     *
     * @returns {number}
     */
    public getNumberOfUnmarkedCorrectAnswers() {
        return this.unmarkedCorrectAnswers.length;
    }

    /**
     * Get the quotient of the number of marked wrong Answers divided by number of all wrong answers (marked and
     * unmarked).
     *
     * @returns {number|string}
     */
    public getNumberOfMarkedWrongAnswersDividedBySumOfWrongAnswers() {
        if (this.getSumOfWrongAnswers() > 0) {
            return this.getNumberOfMarkedWrongAnswers() / this.getSumOfWrongAnswers();
        }
        return 'n/a';
    }

    /**
     * Get the sum of wrong answers (marked and unmarked).
     *
     * @returns {number}
     */
    public getSumOfWrongAnswers() {
        return this.getNumberOfMarkedWrongAnswers() + this.getNumberOfUnmarkedWrongAnswers();
    }
}
