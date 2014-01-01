/**
 * AngularJS-controller for the real test.
 */
function TestCtrl($scope, $interval, $timeout) {
    'use strict';

    var manageQuizInterval;

    /**
     * Base controller with extracted commonalities between the dryRun- and test-Controller,
     *
     * @type {BaseController}
     */
    $scope.baseController = new BaseController(15, 3000, 1000, 3000, 0);

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
        if ($scope.baseController.currentQuestionNumber <= $scope.baseController.numberOfQuestions) {
            $scope.baseController.manageAnotherQuestion($timeout);
        } else {
            $scope.baseController.manageEndOfQuestions($interval, manageQuizInterval);
        }
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
        $scope.baseController.durationOfFocusMarkInMilliseconds + $scope.baseController.delayBeforeTubeBoxInMilliseconds + $scope.baseController.durationOfUserInputListeningInMilliseconds + $scope.baseController.durationOfAnswerEvaluationInMilliseconds
    );
}
