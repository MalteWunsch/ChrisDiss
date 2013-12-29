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
    $scope.numberOfQuestions = 5;

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
    $scope.millisecondsPerBlackScreen = 500;

    /**
     * Constant number of milliseconds a user has for answering a Question before they get a "too slow" message.
     *
     * @type {number}
     */
    $scope.millisecondsPerQuestion = 2500;

    /**
     * Current Question.
     *
     * @type {Question|null}
     */
    $scope.question = null;

    /**
     * Locked ascii code of the uppercased letter of the key the user has pressed. Only allowed strokes on allowed keys
     * are locked.
     *
     * @type {number|null}
     */
    $scope.lockedKeyCode = null;

    /**
     * Manage the quiz: display Questions, evaluate user input...
     */
    $scope.manageQuiz = function () {
        $('#lockedAnswer').hide();
        if ($scope.currentQuestionNumber <= $scope.numberOfQuestions) {
            $scope.displayBlackScreen();
            $scope.setNextQuestion();
            this.lockedKeyCode = null;
            $scope.currentQuestionNumber += 1;
        } else {
            $interval.cancel(manageQuizInterval);
            $('#question').hide();
            $('#errorDetectionNotice').hide();
            $('#afterDryRun').show();
        }
    };

    /**
     * Displays a black screen for the configured time  to allow a user to regenerate their concentration.
     */
    $scope.displayBlackScreen = function () {
        $('body').hide();
        $timeout(function () { $('body').show(); }, $scope.millisecondsPerBlackScreen);
    };

    /**
     * Sets a new Question, with it randomly being a Stroop or a regular one.
     */
    $scope.setNextQuestion = function () {
        var dice100Result = Math.ceil(Math.random() * 100);
        if (dice100Result <= 50) {
            this.question = QuestionFactory.getRegularQuestion();
        } else {
            this.question = QuestionFactory.getStroopQuestion();
        }
    };

    /**
     * Handle the user input: If the user presses one of the allowed keys, the answer is locked.
     *
     * @param event the key press event
     */
    $scope.handleUserInput = function (event) {
        var keyCodeForYes = "y".charCodeAt(0),
            keyCodeForNo = "n".charCodeAt(0),
            pressedKeyCode = $scope.shiftKeyCodeToLowercasedLetterIfApplicable(event.which);

        if (pressedKeyCode === keyCodeForYes || pressedKeyCode === keyCodeForNo) {
            if (this.lockedKeyCode === null) {
                this.lockedKeyCode = pressedKeyCode;
                $('#lockedAnswer').show();
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
