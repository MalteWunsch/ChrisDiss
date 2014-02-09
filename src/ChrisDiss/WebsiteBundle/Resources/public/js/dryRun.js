function DryRunCtrl($scope, $timeout) {
    'use strict';
    $scope.baseController = new BaseController(10, 2000, 1000, 3000, 3000, 50, true);
    $scope.manageQuiz = function () {
        var delayForDisplayingEvaluation = $scope.manageAnswerEvaluation();
        if($scope.quizShouldEnd() === true) {
            $scope.baseController.manageEndOfQuestions();
        } else {
            $scope.baseController.manageNextQuestion($timeout, delayForDisplayingEvaluation, $scope);
        }
    };
    $scope.manageAnswerEvaluation = function () {
        if($scope.baseController.currentQuestionNumber === 1) {
            return 0;
        }
        $scope.baseController.displayAnswerEvaluation($timeout, 0);
        return $scope.baseController.durationOfAnswerEvaluationInMilliseconds;
    };
    $scope.quizShouldEnd = function () {
        return $scope.baseController.currentQuestionNumber > $scope.baseController.numberOfQuestions;
    };
    $scope.manageQuiz();
}
//@ sourceMappingURL=dryRun.js.map
