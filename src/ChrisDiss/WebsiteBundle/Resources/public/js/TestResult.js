var TestResult = (function () {
    function TestResult() {
        this.markedWrongAnswers = [];
        this.unmarkedWrongAnswers = [];
        this.markedCorrectAnswers = [];
        this.unmarkedCorrectAnswers = [];
    }
    TestResult.prototype.add = function (evaluation) {
        if(evaluation instanceof CorrectlyMarkedAnswerAsWrongEvaluation) {
            this.markedWrongAnswers.push(evaluation);
        } else {
            if(evaluation instanceof WrongAnswerEvaluation) {
                this.unmarkedWrongAnswers.push(evaluation);
            } else {
                if(evaluation instanceof WronglyMarkedAnswerAsWrongEvaluation) {
                    this.markedCorrectAnswers.push(evaluation);
                } else {
                    if(evaluation instanceof CorrectAnswerEvaluation) {
                        this.unmarkedCorrectAnswers.push(evaluation);
                    }
                }
            }
        }
    };
    TestResult.prototype.getNumberOfMarkedWrongAnswers = function () {
        return this.markedWrongAnswers.length;
    };
    TestResult.prototype.getNumberOfUnmarkedWrongAnswers = function () {
        return this.unmarkedWrongAnswers.length;
    };
    TestResult.prototype.getNumberOfMarkedCorrectAnswers = function () {
        return this.markedCorrectAnswers.length;
    };
    TestResult.prototype.getNumberOfUnmarkedCorrectAnswers = function () {
        return this.unmarkedCorrectAnswers.length;
    };
    TestResult.prototype.getNumberOfMarkedWrongAnswersDividedBySumOfWrongAnswers = function () {
        if(this.getSumOfWrongAnswers() > 0) {
            return this.getNumberOfMarkedWrongAnswers() / this.getSumOfWrongAnswers();
        }
        return 'n/a';
    };
    TestResult.prototype.getSumOfWrongAnswers = function () {
        return this.getNumberOfMarkedWrongAnswers() + this.getNumberOfUnmarkedWrongAnswers();
    };
    return TestResult;
})();
//@ sourceMappingURL=TestResult.js.map
