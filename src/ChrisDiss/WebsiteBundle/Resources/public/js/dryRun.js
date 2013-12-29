/**
 * AngularJS-controller for the dry run.
 */
function DryRunCtrl($scope, $interval, $timeout) {
    'use strict';

    var manageQuizInterval;

    /**
     * Constant number of questions to ask.
     *
     * @type {number}
     */
    $scope.numberOfQuestions = 15;

    /**
     * Number of the current question asked.
     *
     * @type {number}
     */
    $scope.currentQuestionNumber = 1;

    /**
     * Constant duration in milliseconds to display nothing but a focus mark between Questions to allow a user to
     * regenerate their concentration. After that, the blood tube is displayed.
     *
     * @type {number}
     */
    $scope.durationOfFocusMarkInMilliseconds = 3000;

    /**
     * Constant delay in milliseconds before displaying the tube box after the blood tube.
     *
     * @type {number}
     */
    $scope.delayBeforeTubeBoxInMilliseconds = 1000;

    /**
     * Constant duration in milliseconds for listening to user input after both the blood tube and the tube box have
     * been displayed.
     *
     * @type {number}
     */
    $scope.durationOfUserInputListeningInMilliseconds = 3000;

    /**
     * Constant duration in milliseconds the evaluation of the user's answer is displayed.
     *
     * @type {number}
     */
    $scope.durationOfAnswerEvaluationInMilliseconds = 3000;

    /**
     * Whether an answer can be entered now.
     *
     * @type {boolean}
     */
    $scope.answerCanBeEnteredNow = false;

    /**
     * Current Question.
     *
     * @type {Question|null}
     */
    $scope.question = null;

    /**
     * Constant letter for giving the "Colour on the tube box is correct" answer.
     *
     * @type {string}
     */
    $scope.letterForYes = "y";

    /**
     * Constant letter for giving the "Colour on the tube box is not correct" answer.
     *
     * @type {string}
     */
    $scope.letterForNo = "n";

    /**
     * Constant letter for marking an answer as erroneous.
     *
     * @type {string}
     */
    $scope.letterForMarkingAnswerAsErroneous = " ";

    /**
     * Locked ascii code of the uppercased letter of the key the user has pressed. Only allowed strokes on allowed keys
     * are locked.
     *
     * @type {number|null}
     */
    $scope.lockedKeyCode = null;

    /**
     * Whether the user marked his answer to the current question as erroneous (whether he is correct in that mark or
     * not).
     *
     * @type {boolean}
     */
    $scope.answerMarkedErroneous = false;

    /**
     * Manage the quiz control flow.
     */
    $scope.manageQuiz = function () {
        if ($scope.currentQuestionNumber > 1) {
            $scope.managePassedQuestion();
        }
        if ($scope.currentQuestionNumber <= $scope.numberOfQuestions) {
            $scope.manageAnotherQuestion();
        } else {
            $scope.manageEndOfDryRun();
        }
    };

    /**
     * Manages a passed question.
     */
    $scope.managePassedQuestion = function () {
        // nothing for now, one could store answers here
    };

    /**
     * Get the human readable message of the answer's evaluation.
     */
    $scope.getAnswerEvaluationAsText = function () {
        return $scope.getAnswerEvaluation().getMessage();
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
    $scope.getAnswerEvaluation = function () {
        if (this.lockedKeyCode === null) {
            return new NoAnswerEvaluation();
        }

        if (this.answerMarkedErroneous === false) {
            if ($scope.getLockedAnswerAsBoolean() === this.question.getCorrectAnswer()) {
                return new CorrectAnswerEvaluation();
            }
            return new WrongAnswerEvaluation();
        }

        if ($scope.getLockedAnswerAsBoolean() === this.question.getCorrectAnswer()) {
            return new WronglyMarkedAnswerAsWrongEvaluation();
        }
        return new CorrectlyMarkedAnswerAsWrongEvaluation();
    };

    /**
     * Manages giving the user another Question. For the time-dependant parts which show and hide DOM elements, this is
     * timeIndex = 0.
     */
    $scope.manageAnotherQuestion = function() {
        $scope.displayFocusMark();
        $scope.displayQuestion();
        $scope.displayAnswerEvaluation();
        $scope.removeAnswer();
        $scope.setNextQuestion();
    };

    /**
     * Starting at timeIndex = 0, the screen is blank. Display a focus mark for durationOfFocusMarkInMilliseconds to
     * allow users to regenerate their concentration and focus on the area where the next question will show up. After
     * that, the focus mark is hidden.
     */
    $scope.displayFocusMark = function () {
        var timeIndex = 0;
        $timeout(
            function () {
                $('#userFocusMarker').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('#userFocusMarker').hide();
            },
            timeIndex + $scope.durationOfFocusMarkInMilliseconds
        );
    };

    /**
     * Starting at the timeIndex after that focus mark, the screen is blank. Display the question in two parts: the
     * blood tube at first, and after delayBeforeTubeBoxInMilliseconds the tube box. After displaying the tube box, the
     * Question as a whole is displayed for durationOfUserInputListeningInMilliseconds and an answer can be entered.
     * After that, the Question and a possible answer are hidden and answers can no longer be entered.
     */
    $scope.displayQuestion = function () {
        var timeIndex = $scope.durationOfFocusMarkInMilliseconds;
        $timeout(
            function () {
                $('#question').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('.tube-box, #errorDetectionNotice').show();
                $scope.answerCanBeEnteredNow = true;
            },
            timeIndex + $scope.delayBeforeTubeBoxInMilliseconds
        );
        $timeout(
            function () {
                $('#question, .tube-box, #errorDetectionNotice, #lockedAnswer, #answerMarkedErroneous').hide();
                $scope.answerCanBeEnteredNow = false;
            },
            timeIndex + $scope.delayBeforeTubeBoxInMilliseconds + $scope.durationOfUserInputListeningInMilliseconds
        );
    };

    /**
     * Starting at the timeIndex after the Question, the screen is blank. Display the evaluation of the user's answer
     * for durationOfAnswerEvaluationInMilliseconds. After that, the evaluation is hidden.
     */
    $scope.displayAnswerEvaluation = function () {
        var timeIndex = $scope.durationOfFocusMarkInMilliseconds + $scope.delayBeforeTubeBoxInMilliseconds + $scope.durationOfUserInputListeningInMilliseconds;
        $timeout(
            function () {
                $('#answerEvaluation').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('#answerEvaluation').hide();
            },
            timeIndex + $scope.durationOfAnswerEvaluationInMilliseconds
        );
    };

    /**
     * Manage the end of the dry run after the user has answered all Questions.
     */
    $scope.manageEndOfDryRun = function() {
        $interval.cancel(manageQuizInterval);
        $('#endOfDryRun').show();
    };

    /**
     * Removes the current answer.
     */
    $scope.removeAnswer = function () {
        this.lockedKeyCode = null;
        this.answerMarkedErroneous = false;
    };

    /**
     * Sets a new Question, with it randomly being a Stroop or a regular one.
     */
    $scope.setNextQuestion = function () {
        var dice100Result = Math.ceil(Math.random() * 100);
        if (dice100Result <= 50) {
            this.question = QuestionFactory.getRegularQuestion(true);
        } else {
            this.question = QuestionFactory.getStroopQuestion(true);
        }
        $scope.currentQuestionNumber += 1;
    };

    /**
     * Handle the user input: If the user presses one of the allowed keys, the answer is locked.
     *
     * @param event the key press event
     */
    $scope.handleUserInput = function (event) {
        var keyCodeForYes, keyCodeForNo, keyCodeForMarkingAnswerAsErroneous, pressedKeyCode;

        if ($scope.answerCanBeEnteredNow === true) {
            keyCodeForYes = this.letterForYes.charCodeAt(0);
            keyCodeForNo = this.letterForNo.charCodeAt(0);
            keyCodeForMarkingAnswerAsErroneous = this.letterForMarkingAnswerAsErroneous.charCodeAt(0);
            pressedKeyCode = KeyCodeHelper.shiftKeyCodeToLowercasedLetterIfApplicable(event.which);

            if (this.lockedKeyCode === null) {
                if (pressedKeyCode === keyCodeForYes || pressedKeyCode === keyCodeForNo) {
                    this.lockedKeyCode = pressedKeyCode;
                    $('#lockedAnswer').show();
                }
            } else if (pressedKeyCode === keyCodeForMarkingAnswerAsErroneous) {
                this.answerMarkedErroneous = true;
                $('#answerMarkedErroneous').show();
            }
        }
    };

    /**
     * Gets the locked answer, i.e. the letter of the pressed key.
     *
     * @returns {string}
     */
    $scope.getLockedAnswer = function () {
        return String.fromCharCode(this.lockedKeyCode).toUpperCase();
    };

    /**
     * Returns whether the locked answer is that the Colour on the tube box is correct.
     *
     * @returns {boolean}
     */
    $scope.getLockedAnswerAsBoolean = function () {
        return (this.lockedKeyCode === this.letterForYes.charCodeAt(0));
    };

    /**
     * Bootstrap the manageQuiz-function.
     */
    $scope.manageQuiz();

    /**
     * Call the manageQuiz-function in intervals. The interval length consists out of the lengths of it's parts.
     */
    manageQuizInterval = $interval(
        function () { $scope.manageQuiz(); },
        $scope.durationOfFocusMarkInMilliseconds + $scope.delayBeforeTubeBoxInMilliseconds + $scope.durationOfUserInputListeningInMilliseconds + $scope.durationOfAnswerEvaluationInMilliseconds
    );
}
