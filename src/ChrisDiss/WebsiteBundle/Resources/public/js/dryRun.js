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
     * Constant number of milliseconds to display the black screen between Questions to allow a user to regenerate their
     * concentration.
     *
     * @type {number}
     */
    $scope.millisecondsPerBlackScreen = 3000;

    /**
     * Constant number of milliseconds to delay displaying the tube box after the blood tube has been displayed.
     *
     * @type {number}
     */
    $scope.millisecondsDelayBeforeTubeBox = 1000;

    /**
     * Constant number of milliseconds a user has for answering a Question before they get a "too slow" message.
     *
     * @type {number}
     */
    $scope.millisecondsPerQuestion = 3000;

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
     * Hides the passed Question and answer and shows feedback to the user on his answer. There are 5 possible cases:
     *
     * 1) user entered no (allowed) key at all
     * 2) user entered correct key and did not enter the "error noticed" key
     * 3) user entered wrong key and did not enter the "error noticed" key
     * 4) user entered wrong key and entered the "error noticed" key
     * 5) user entered correct key but entered the "error noticed" key
     */
    $scope.managePassedQuestion = function() {
        $('#lockedAnswer, #answerMarkedErroneous').hide();

        // 1) user entered no (allowed) key at all
        if (this.lockedKeyCode === null) {
            alert('Bitte antworten Sie noch etwas schneller.');
            return;
        }

        if (this.answerMarkedErroneous === false) {
            // user entered no correction key
            if ($scope.getLockedAnswerAsBoolean() === this.question.getCorrectAnswer()) {
                // 2) user entered correct key and did not enter the "error noticed" key
                alert('Gut: Ihre Antwort war richtig.');
            } else {
                // 3) user entered wrong key and did not enter the "error noticed" key
                alert('Ihre Antwort war leider falsch.');
            }
            return;
        }

        // user entered the correction key
        if ($scope.getLockedAnswerAsBoolean() === this.question.getCorrectAnswer()) {
            // 4) user entered wrong key and entered the "error noticed" key
            alert('Sie haben Ihre eigentlich richtige Antwort leider als Vertipper markiert.');
        } else {
            // 5) user entered correct key but entered the "error noticed" key
            alert('Gut: Sie haben bemerkt, dass Sie die falsche Antwort gegeben hatten.');
        }
    };

    /**
     * Manages giving the user another Question.
     */
    $scope.manageAnotherQuestion = function() {
        $scope.displayBlackScreen();
        $scope.removeAnswer();
        $scope.setNextQuestion();
    };

    /**
     * Displays a black screen for the configured time to allow a user to regenerate their concentration. After the
     * configured time, display the blood tube Question and with the configured delay the tube box.
     */
    $scope.displayBlackScreen = function () {
        $('#question, .tube-box, #endOfDryRun, #errorDetectionNotice, #lockedAnswer, #answerMarkedErroneous').hide();
        $('#userFocusMarker').show();

        $timeout(
            function () {
                $('#question').show();
                $('#userFocusMarker').hide();
            },
            $scope.millisecondsPerBlackScreen
        );
        $timeout(
            function () {
                $('.tube-box, #errorDetectionNotice').show();
            },
            $scope.millisecondsPerBlackScreen + $scope.millisecondsDelayBeforeTubeBox
        );
    };

    /**
     * Manage the end of the dry run after the user has answered all Questions.
     */
    $scope.manageEndOfDryRun = function() {
        $interval.cancel(manageQuizInterval);
        $('#question, .tube-box, #errorDetectionNotice').hide();
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
        var keyCodeForYes = this.letterForYes.charCodeAt(0),
            keyCodeForNo = this.letterForNo.charCodeAt(0),
            keyCodeForMarkingAnswerAsErroneous = this.letterForMarkingAnswerAsErroneous.charCodeAt(0),
            pressedKeyCode = $scope.shiftKeyCodeToLowercasedLetterIfApplicable(event.which);

        if (this.lockedKeyCode === null) {
            if (pressedKeyCode === keyCodeForYes || pressedKeyCode === keyCodeForNo) {
                this.lockedKeyCode = pressedKeyCode;
                $('#lockedAnswer').show();
            }
        } else if (pressedKeyCode === keyCodeForMarkingAnswerAsErroneous) {
            this.answerMarkedErroneous = true;
            $('#answerMarkedErroneous').show();
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
     * If the keyCode corresponds to an upper case ASCII letter, return the corresponding lower case letter's key code.
     * Otherwise just return the key code.
     *
     * @param keyCode number
     * @returns {number}
     */
    $scope.shiftKeyCodeToLowercasedLetterIfApplicable = function (keyCode) {
        var lowercasedKeyCode = keyCode;
        if (keyCode >= 65 && keyCode <= 90) {
            lowercasedKeyCode += 32;
        }
        return lowercasedKeyCode;
    };

    /**
     * Bootstrap the manageQuiz-function.
     */
    $scope.manageQuiz();

    /**
     * Call the manageQuiz-function in intervals.
     */
    manageQuizInterval = $interval(
        function () { $scope.manageQuiz(); },
        $scope.millisecondsPerBlackScreen + $scope.millisecondsPerQuestion
    );
}
