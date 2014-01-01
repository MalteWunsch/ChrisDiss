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
    BaseController.prototype.manageNextQuestion = function ($timeout, timeIndex, $scope) {
        this.displayFocusMark($timeout, timeIndex);
        timeIndex += this.durationOfFocusMarkInMilliseconds;
        this.setNextQuestion($timeout, timeIndex, $scope);
        this.displayBloodTube($timeout, timeIndex);
        timeIndex += this.delayBeforeTubeBoxInMilliseconds;
        this.allowUserInput($timeout, timeIndex);
        this.displayTubeBox($timeout, timeIndex);
        timeIndex += this.durationOfUserInputListeningInMilliseconds;
        this.setNextManagement($timeout, timeIndex, $scope);
    };
    BaseController.prototype.displayFocusMark = function ($timeout, timeIndex) {
        $timeout(function () {
            $('#userFocusMarker').show();
        }, timeIndex);
        $timeout(function () {
            $('#userFocusMarker').hide();
        }, timeIndex + this.durationOfFocusMarkInMilliseconds);
    };
    BaseController.prototype.setNextQuestion = function ($timeout, timeIndex, $scope) {
        $timeout(function () {
            var dice100Result = Math.ceil(Math.random() * 100);
            if(dice100Result >= $scope.baseController.percentageOfStroopQuestions) {
                $scope.baseController.question = QuestionFactory.getRegularQuestion(this.decreasedColourSet);
            } else {
                $scope.baseController.question = QuestionFactory.getStroopQuestion(this.decreasedColourSet);
            }
            $scope.baseController.currentQuestionNumber += 1;
            $scope.baseController.answer = null;
        }, timeIndex);
    };
    BaseController.prototype.displayBloodTube = function ($timeout, timeIndex) {
        $timeout(function () {
            $('#question').show();
        }, timeIndex);
        $timeout(function () {
            $('#question').hide();
        }, timeIndex + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds);
    };
    BaseController.prototype.allowUserInput = function ($timeout, timeIndex) {
        $timeout(function () {
            Answer.setCanBeEnteredNow(true);
        }, timeIndex);
        $timeout(function () {
            Answer.setCanBeEnteredNow(false);
        }, timeIndex + this.durationOfUserInputListeningInMilliseconds);
    };
    BaseController.prototype.displayTubeBox = function ($timeout, timeIndex) {
        $timeout(function () {
            $('.tube-box, #errorDetectionNotice').show();
        }, timeIndex);
        $timeout(function () {
            $('#question, .tube-box, #errorDetectionNotice, #lockedAnswer, #answerMarkedErroneous').hide();
        }, timeIndex + this.durationOfUserInputListeningInMilliseconds);
    };
    BaseController.prototype.setNextManagement = function ($timeout, timeIndex, $scope) {
        $timeout(function () {
            $scope.manageQuiz();
        }, timeIndex);
    };
    BaseController.prototype.getAnswerEvaluation = function () {
        return Answer.getEvaluation(this.answer, this.question);
    };
    BaseController.prototype.displayAnswerEvaluation = function ($timeout, timeIndex) {
        $timeout(function () {
            $('#answerEvaluation').show();
        }, timeIndex);
        $timeout(function () {
            $('#answerEvaluation').hide();
        }, timeIndex + this.durationOfAnswerEvaluationInMilliseconds);
    };
    BaseController.prototype.manageEndOfQuestions = function () {
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
    return BaseController;
})();
//@ sourceMappingURL=BaseController.js.map
