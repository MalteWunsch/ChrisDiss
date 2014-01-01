var BaseController = (function () {
    function BaseController(numberOfQuestions, durationOfFocusMarkInMilliseconds, delayBeforeTubeBoxInMilliseconds, durationOfUserInputListeningInMilliseconds, durationOfAnswerEvaluationInMilliseconds, percentageOfStroopQuestions, decreasedColourSet) {
        this.numberOfQuestions = numberOfQuestions;
        this.currentQuestionNumber = 1;
        this.durationOfFocusMarkInMilliseconds = durationOfFocusMarkInMilliseconds;
        this.delayBeforeTubeBoxInMilliseconds = delayBeforeTubeBoxInMilliseconds;
        this.durationOfUserInputListeningInMilliseconds = durationOfUserInputListeningInMilliseconds;
        this.durationOfAnswerEvaluationInMilliseconds = durationOfAnswerEvaluationInMilliseconds;
        this.percentageOfStroopQuestions = percentageOfStroopQuestions;
        this.decreasedColourSet = decreasedColourSet;
    }
    BaseController.prototype.getAnswerEvaluation = function () {
        return Answer.getEvaluation(this.answer, this.question);
    };
    BaseController.prototype.manageAnotherQuestion = function ($timeout) {
        this.displayFocusMark($timeout);
        this.displayQuestion($timeout);
        this.displayAnswerEvaluation($timeout);
        this.setNextQuestion();
    };
    BaseController.prototype.displayFocusMark = function ($timeout) {
        var timeIndex = 0;
        $timeout(function () {
            $('#userFocusMarker').show();
        }, timeIndex);
        $timeout(function () {
            $('#userFocusMarker').hide();
        }, timeIndex + this.durationOfFocusMarkInMilliseconds);
    };
    BaseController.prototype.displayQuestion = function ($timeout) {
        var timeIndex = this.durationOfFocusMarkInMilliseconds;
        $timeout(function () {
            $('#question').show();
        }, timeIndex);
        $timeout(function () {
            $('.tube-box, #errorDetectionNotice').show();
            Answer.setCanBeEnteredNow(true);
        }, timeIndex + this.delayBeforeTubeBoxInMilliseconds);
        $timeout(function () {
            $('#question, .tube-box, #errorDetectionNotice, #lockedAnswer, #answerMarkedErroneous').hide();
            Answer.setCanBeEnteredNow(false);
        }, timeIndex + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds);
    };
    BaseController.prototype.displayAnswerEvaluation = function ($timeout) {
        var timeIndex = this.durationOfFocusMarkInMilliseconds + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds;
        $timeout(function () {
            $('#answerEvaluation').show();
        }, timeIndex);
        $timeout(function () {
            $('#answerEvaluation').hide();
        }, timeIndex + this.durationOfAnswerEvaluationInMilliseconds);
    };
    BaseController.prototype.setNextQuestion = function () {
        var dice100Result = Math.ceil(Math.random() * 100);
        if(dice100Result >= this.percentageOfStroopQuestions) {
            this.question = QuestionFactory.getRegularQuestion(this.decreasedColourSet);
        } else {
            this.question = QuestionFactory.getStroopQuestion(this.decreasedColourSet);
        }
        this.currentQuestionNumber += 1;
        this.answer = null;
    };
    BaseController.prototype.manageEndOfQuestions = function ($interval, manageQuizInterval) {
        $interval.cancel(manageQuizInterval);
        $('#endOfQuestions').show();
    };
    BaseController.prototype.handleUserInput = function (event) {
        var lowerCaseChar = String.fromCharCode(KeyCodeHelper.shiftKeyCodeToLowerCasedLetterIfApplicable(event.which));
        if(Answer.getCanBeEnteredNow() === true) {
            if(this.answer === null) {
                if(lowerCaseChar === Answer.getCharacterForYes() || lowerCaseChar === Answer.getCharacterForNo()) {
                    this.answer = new Answer(lowerCaseChar);
                    $('#lockedAnswer').show();
                }
            } else {
                if(lowerCaseChar === Answer.getCharacterForMarkingAnswerAsErroneous()) {
                    this.answer.markAsErroneous();
                    $('#answerMarkedErroneous').show();
                }
            }
        }
    };
    BaseController.prototype.manageQuizInIntervals = function ($interval, manageQuiz) {
        manageQuiz();
        return $interval(function () {
            manageQuiz();
        }, this.durationOfFocusMarkInMilliseconds + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds + this.durationOfAnswerEvaluationInMilliseconds);
    };
    return BaseController;
})();
//@ sourceMappingURL=BaseController.js.map
