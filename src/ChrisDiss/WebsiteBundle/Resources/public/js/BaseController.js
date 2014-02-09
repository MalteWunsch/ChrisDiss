/// <reference path="../../../../../../vendor/borisyankov/definitely-typed/jquery/jquery.d.ts" />
/// <reference path="Question.ts" />
/// <reference path="QuestionFactory.ts" />
/// <reference path="Answer.ts" />
/// <reference path="KeyCodeHelper.ts" />
/**
* Base controller for extracting commonalities between the dryRun- and test-Controller, implemented as a composite
* because currently I'm not cleverer than that.
*
* @TODO: Composition doesn't really fit here. But it seems there is no way to let a function like the AngularJS
* controller functions (not a function object) inherit from another function. Get sure of that. If not, learn about
* AngularJS modules, which seem to use function objects, which should be easier to get along with prototypical
* inheritance. Learn about prototypical inheritance.
*/
var BaseController = (function () {
    /**
    * Constructor.
    *
    * @param numberOfQuestions number of questions to ask
    * @param durationOfFocusMarkInMilliseconds Constant duration in milliseconds to display nothing but a focus mark
    * between Questions to allow a user to regenerate their concentration. After that, the blood tube is displayed.
    * @param delayBeforeTubeBoxInMilliseconds Constant delay in milliseconds before displaying the tube box after the
    * blood tube.
    * @param durationOfUserInputListeningInMilliseconds Constant duration in milliseconds for listening to user input
    * after both the blood tube and the tube box have been displayed.
    * @param durationOfAnswerEvaluationInMilliseconds Constant duration in milliseconds the evaluation of the user's
    * answer is displayed.
    * @param percentageOfStroopQuestions Constant percentage of chance that a Question is a Stroop one.
    * @param decreasedColourSet Whether the reduced colour set for the test run should be used (true) or the full
    * colour set (false).
    */
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
    /**
    * Manages giving the user the next Question.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    * @param $scope AngularJS $scope.
    */
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

    /**
    * Starting at some timeIndex, the screen is blank. Display a focus mark for durationOfFocusMarkInMilliseconds to
    * allow users to regenerate their concentration and focus on the area where the next question will show up. After
    * that, the focus mark is hidden.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    */
    BaseController.prototype.displayFocusMark = function ($timeout, timeIndex) {
        $timeout(function () {
            $('#userFocusMarker').show();
        }, timeIndex);
        $timeout(function () {
            $('#userFocusMarker').hide();
        }, timeIndex + this.durationOfFocusMarkInMilliseconds);
    };

    /**
    * Starting at the timeIndex after the focus mark, set a new Question, with it randomly being a Stroop or a regular
    * one. That deletes the former answer.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    * @param $scope AngularJS $scope.
    */
    BaseController.prototype.setNextQuestion = function ($timeout, timeIndex, $scope) {
        $timeout(function () {
            var dice100Result = Math.ceil(Math.random() * 100);
            if (dice100Result >= $scope.baseController.percentageOfStroopQuestions) {
                $scope.baseController.question = QuestionFactory.getRegularQuestion($scope.baseController.decreasedColourSet);
            } else {
                $scope.baseController.question = QuestionFactory.getStroopQuestion($scope.baseController.decreasedColourSet);
            }
            $scope.baseController.currentQuestionNumber += 1;
            $scope.baseController.answer = null;
        }, timeIndex);
    };

    /**
    * Starting at the timeIndex after the focus mark, the screen is blank. Display the blood tube as one part of the
    * Question for delayBeforeTubeBoxInMilliseconds + durationOfUserInputListeningInMilliseconds. After that, the blood
    * tube is hidden.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    */
    BaseController.prototype.displayBloodTube = function ($timeout, timeIndex) {
        $timeout(function () {
            $('#question').show();
        }, timeIndex);
        $timeout(function () {
            $('#question').hide();
        }, timeIndex + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds);
    };

    /**
    * Starting at the timeIndex after the blood tube + delayBeforeTubeBoxInMilliseconds, allow user input for answering
    * the Question for durationOfUserInputListeningInMilliseconds. After that, user input is disabled.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    */
    BaseController.prototype.allowUserInput = function ($timeout, timeIndex) {
        $timeout(function () {
            Answer.setCanBeEnteredNow(true);
        }, timeIndex);
        $timeout(function () {
            Answer.setCanBeEnteredNow(false);
        }, timeIndex + this.durationOfUserInputListeningInMilliseconds);
    };

    /**
    * Starting at the timeIndex after the blood tube + delayBeforeTubeBoxInMilliseconds, the screen show the blood
    * tube. Display the tube box (and error detection notice) as the second and final part of the Question for
    * delayBeforeTubeBoxInMilliseconds + durationOfUserInputListeningInMilliseconds. After that, the tube box, error
    * detection notice and a possible answer are hidden.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    */
    BaseController.prototype.displayTubeBox = function ($timeout, timeIndex) {
        $timeout(function () {
            $('.tube-box, #errorDetectionNotice').show();
        }, timeIndex);
        $timeout(function () {
            $('#question, .tube-box, #errorDetectionNotice, #lockedAnswer, #answerMarkedErroneous').hide();
        }, timeIndex + this.durationOfUserInputListeningInMilliseconds);
    };

    /**
    * Starting at the timeIndex after the user input, call the manager function for the Question currently displayed
    * and the Answer possibly given.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    * @param $scope AngularJS $scope.
    */
    BaseController.prototype.setNextManagement = function ($timeout, timeIndex, $scope) {
        $timeout(function () {
            $scope.manageQuiz();
        }, timeIndex);
    };

    /**
    * Get the one of five possible evaluation of the user's answer:
    * 1) user entered no (allowed) key at all
    * 2) user entered correct key and did not enter the "error noticed" key
    * 3) user entered wrong key and did not enter the "error noticed" key
    * 4) user entered wrong key and entered the "error noticed" key
    * 5) user entered correct key but entered the "error noticed" key
    *
    * @returns {AnswerEvaluation}
    */
    BaseController.prototype.getAnswerEvaluation = function () {
        return Answer.getEvaluation(this.answer, this.question);
    };

    /**
    * Starting at the timeIndex after the Question, the screen is blank. Display the evaluation of the user's answer
    * for durationOfAnswerEvaluationInMilliseconds. After that, the evaluation is hidden.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    */
    BaseController.prototype.displayAnswerEvaluation = function ($timeout, timeIndex) {
        $timeout(function () {
            $('#answerEvaluation').show();
        }, timeIndex);
        $timeout(function () {
            $('#answerEvaluation').hide();
        }, timeIndex + this.durationOfAnswerEvaluationInMilliseconds);
    };

    /**
    * Manage the end after the user has answered all Questions.
    */
    BaseController.prototype.manageEndOfQuestions = function () {
        $('#endOfQuestions').show();
    };

    /**
    * Handle the user input: If the user presses one of the allowed keys, the answer is locked.
    *
    * @param event the key press event
    */
    BaseController.prototype.handleUserInput = function (event) {
        var lowerCaseChar = String.fromCharCode(KeyCodeHelper.shiftKeyCodeToLowerCasedLetterIfApplicable(event.which));

        if (Answer.getCanBeEnteredNow() === true) {
            if (this.answer === null) {
                if (lowerCaseChar === Answer.getCharacterForYes() || lowerCaseChar === Answer.getCharacterForNo()) {
                    this.answer = new Answer(lowerCaseChar);
                    $('#lockedAnswer').show();
                }
            } else if (lowerCaseChar === Answer.getCharacterForMarkingAnswerAsErroneous()) {
                this.answer.markAsErroneous();
                $('#answerMarkedErroneous').show();
            }
        }
    };
    return BaseController;
})();
//# sourceMappingURL=BaseController.js.map
