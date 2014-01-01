/**
 * AngularJS-controller for the real test.
 */
function TestCtrl($scope, $interval, $timeout) {
    'use strict';

    var manageQuizInIntervals;

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
    $scope.baseController = new BaseController(100, 3000, 1000, 3000, 0, 80, false);

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
        if ($scope.baseController.currentQuestionNumber > 1) {
            $scope.testResult.add($scope.baseController.getAnswerEvaluation());
        }
        if ($scope.quizShouldEnd() === true) {
            $scope.baseController.manageEndOfQuestions($interval, manageQuizInIntervals);
        } else {
            $scope.baseController.manageAnotherQuestion($timeout);
        }
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

    manageQuizInIntervals = $scope.baseController.manageQuizInIntervals($interval, $scope.manageQuiz);
}
