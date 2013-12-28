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
     * Manage the quiz: display Questions, evaluate user input...
     */
    $scope.manageQuiz = function () {
        if ($scope.currentQuestionNumber <= $scope.numberOfQuestions) {
            $scope.displayBlackScreen();
            $scope.setNextQuestion();
            $scope.currentQuestionNumber += 1;
        } else {
            $interval.cancel(manageQuizInterval);
            $('#question').hide();
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
