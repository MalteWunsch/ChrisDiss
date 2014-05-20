/**
* TestResult is an aggregation of the AnswerEvaluations.
*/
var TestResult = (function () {
    function TestResult() {
        /**
        * Collection of Answers that were wrong but correctly marked as such.
        */
        this.markedWrongAnswers = [];
        /**
        * Collection of Answers that were wrong and not marked as such.
        */
        this.unmarkedWrongAnswers = [];
        /**
        * Collection of Answers that were correct but marked as wrong.
        */
        this.markedCorrectAnswers = [];
        /**
        * Collection of Answers that were correct and correctly not marked as wrong.
        */
        this.unmarkedCorrectAnswers = [];
        /**
        * Collection of "empty" Answers, where the user was not fast enough to type in their Answer.
        */
        this.noAnswers = [];
    }
    /**
    * Add an AnswerEvaluation to this TestResult.
    *
    * @param evaluation
    */
    TestResult.prototype.add = function (evaluation) {
        if (evaluation instanceof CorrectlyMarkedAnswerAsWrongEvaluation) {
            this.markedWrongAnswers.push(evaluation);
        } else if (evaluation instanceof WrongAnswerEvaluation) {
            this.unmarkedWrongAnswers.push(evaluation);
        } else if (evaluation instanceof WronglyMarkedAnswerAsWrongEvaluation) {
            this.markedCorrectAnswers.push(evaluation);
        } else if (evaluation instanceof CorrectAnswerEvaluation) {
            this.unmarkedCorrectAnswers.push(evaluation);
        } else if (evaluation instanceof NoAnswerEvaluation) {
            this.noAnswers.push(evaluation);
        }
    };

    /**
    * Get the number of Answers that were wrong but correctly marked as such.
    *
    * @returns {number}
    */
    TestResult.prototype.getNumberOfMarkedWrongAnswers = function () {
        return this.markedWrongAnswers.length;
    };

    /**
    * Get the number of Answers that were wrong and not marked as such.
    *
    * @returns {number}
    */
    TestResult.prototype.getNumberOfUnmarkedWrongAnswers = function () {
        return this.unmarkedWrongAnswers.length;
    };

    /**
    * Get the number of Answers that were correct but marked as wrong.
    *
    * @returns {number}
    */
    TestResult.prototype.getNumberOfMarkedCorrectAnswers = function () {
        return this.markedCorrectAnswers.length;
    };

    /**
    * Get the number of Answers that were correct and correctly not marked as wrong.
    *
    * @returns {number}
    */
    TestResult.prototype.getNumberOfUnmarkedCorrectAnswers = function () {
        return this.unmarkedCorrectAnswers.length;
    };

    /**
    * Get the number of "empty" Answers, where the user was not fast enough to type in their Answer.
    *
    * @returns {number}
    */
    TestResult.prototype.getNumberOfNoAnswers = function () {
        return this.noAnswers.length;
    };

    /**
    * Get the quotient of the number of marked wrong Answers divided by number of all wrong answers (marked and
    * unmarked) as a string.
    *
    * @returns {string}
    */
    TestResult.prototype.getNumberOfMarkedWrongAnswersDividedBySumOfWrongAnswers = function () {
        return (this.getSumOfWrongAnswers() > 0) ? (this.getNumberOfMarkedWrongAnswers() / this.getSumOfWrongAnswers()).toString() : 'n/a';
    };

    /**
    * Get the sum of wrong answers (marked and unmarked).
    *
    * @returns {number}
    */
    TestResult.prototype.getSumOfWrongAnswers = function () {
        return this.getNumberOfMarkedWrongAnswers() + this.getNumberOfUnmarkedWrongAnswers();
    };

    /**
    * Get a serializated string of all Answers.
    *
    * @returns {string}
    */
    TestResult.prototype.getAllAnswers = function () {
        var allAnswers = [];
        allAnswers = allAnswers.concat(this.markedWrongAnswers, this.unmarkedWrongAnswers, this.markedCorrectAnswers, this.unmarkedCorrectAnswers, this.noAnswers);
        return JSON.stringify(allAnswers);
    };
    return TestResult;
})();
//# sourceMappingURL=TestResult.js.map
