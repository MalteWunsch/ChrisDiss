/**
 * AngularJS-controller for the real test.
 */
function TestCtrl($scope, $timeout) {
    'use strict';

    /**
     * Number of Questions the user has been too slow to answer after which they will be given a "too slow" notice.
     *
     * @type {number}
     */
    $scope.numberOfNoAnswersBeforeNotice = 3;

    /**
     * Number of wrong answers (marked and unmarked) after which the real test run terminates.
     *
     * @type {number}
     */
    $scope.enoughWrongAnswersGiven = 20;

    /**
     * Base controller with extracted commonalities between the dryRun- and test-Controller,
     *
     * @type {BaseController}
     */
    $scope.baseController = new BaseController(100, 3000, 1000, 3000, 3000, 80, false);

    /**
     * Aggregation of the AnswerEvaluations.
     *
     * @type {TestResult}
     */
    $scope.testResult = new TestResult();

    /**
     * Manage the quiz control flow.
     */
    $scope.manageQuiz = function () {
        var delayForDisplayingEvaluation = $scope.manageAnswerEvaluation();

        if ($scope.quizShouldEnd() === true) {
            $scope.baseController.manageEndOfQuestions();
        } else {
            $scope.baseController.manageNextQuestion($timeout, delayForDisplayingEvaluation, $scope);
        }
    };

    /**
     * Manage the evaluation of the user's answer: For the real test run, store the evaluation in the test result and
     * display the "too slow" message if the user has been too slow several times.
     *
     * @returns {number} delay for displaying the answer evaluation in milliseconds.
     */
    $scope.manageAnswerEvaluation = function () {
        var delayForDisplayingEvaluation = 0,
            answerEvaluation;

        if ($scope.baseController.currentQuestionNumber === 1) {
            return delayForDisplayingEvaluation;
        }

        answerEvaluation = $scope.baseController.getAnswerEvaluation();
        $scope.testResult.add(answerEvaluation);

        // letzte answer no answer und y no answers schon da
        if (answerEvaluation instanceof NoAnswerEvaluation && this.testResult.getNumberOfNoAnswers() > this.numberOfNoAnswersBeforeNotice) {
            $scope.baseController.displayAnswerEvaluation($timeout, 0);
            delayForDisplayingEvaluation += $scope.baseController.durationOfAnswerEvaluationInMilliseconds;
        }

        return delayForDisplayingEvaluation;
    };

    /**
     * Get whether one of the termination conditions is met.
     *
     * @returns {boolean}
     */
    $scope.quizShouldEnd = function () {
        var allQuestionsAsked = $scope.baseController.currentQuestionNumber > $scope.baseController.numberOfQuestions,
            enoughWrongAnswersGiven = $scope.testResult.getSumOfWrongAnswers() >= $scope.enoughWrongAnswersGiven;

        return allQuestionsAsked || enoughWrongAnswersGiven;
    };

    $scope.manageQuiz();
}
