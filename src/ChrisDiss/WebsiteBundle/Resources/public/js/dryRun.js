/**
 * AngularJS-controller for the dry run.
 */
function DryRunCtrl($scope, $timeout) {
    'use strict';

    /**
     * Base controller with extracted commonalities between the dryRun- and test-Controller,
     *
     * @type {BaseController}
     */
    $scope.baseController = new BaseController(15, 3000, 1000, 3000, 3000, 50, true);

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
     * Manage the evaluation of the user's answer: for the dry run, simply display it.
     *
     * @returns {number} delay for displaying the answer evaluation in milliseconds.
     */
    $scope.manageAnswerEvaluation = function () {
        if ($scope.baseController.currentQuestionNumber === 1) {
            return 0;
        }

        $scope.baseController.displayAnswerEvaluation($timeout, 0);
        return $scope.baseController.durationOfAnswerEvaluationInMilliseconds;
    };

    /**
     * Get whether one of the termination conditions is met.
     *
     * @returns {boolean}
     */
    $scope.quizShouldEnd = function () {
        return $scope.baseController.currentQuestionNumber > $scope.baseController.numberOfQuestions;
    };

    $scope.manageQuiz();
}
