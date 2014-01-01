/**
 * AngularJS-controller for the dry run.
 */
function DryRunCtrl($scope, $interval, $timeout) {
    'use strict';

    var manageQuizInIntervals;

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
        if ($scope.baseController.currentQuestionNumber <= $scope.baseController.numberOfQuestions) {
            $scope.baseController.manageAnotherQuestion($timeout);
        } else {
            $scope.baseController.manageEndOfQuestions($interval, manageQuizInIntervals);
        }
    };

    manageQuizInIntervals = $scope.baseController.manageQuizInIntervals($interval, $scope.manageQuiz);
}
