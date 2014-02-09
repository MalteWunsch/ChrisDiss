function TestCtrl($scope, $timeout, $http) {
    'use strict';
    $scope.numberOfNoAnswersBeforeNotice = 3;
    $scope.enoughWrongAnswersGiven = 20;
    $scope.baseController = new BaseController(100, 2000, 200, 1100, 3000, 80, false);
    $scope.testResult = new TestResult();
    $scope.manageQuiz = function () {
        var delayForDisplayingEvaluation = $scope.manageAnswerEvaluation();
        if($scope.quizShouldEnd() === true) {
            $scope.saveResult();
            $scope.baseController.manageEndOfQuestions();
        } else {
            $scope.baseController.manageNextQuestion($timeout, delayForDisplayingEvaluation, $scope);
        }
    };
    $scope.manageAnswerEvaluation = function () {
        var delayForDisplayingEvaluation = 0;
        var answerEvaluation;

        if($scope.baseController.currentQuestionNumber === 1) {
            return delayForDisplayingEvaluation;
        }
        answerEvaluation = $scope.baseController.getAnswerEvaluation();
        $scope.testResult.add(answerEvaluation);
        if(answerEvaluation instanceof NoAnswerEvaluation && this.testResult.getNumberOfNoAnswers() > this.numberOfNoAnswersBeforeNotice) {
            $scope.baseController.displayAnswerEvaluation($timeout, 0);
            delayForDisplayingEvaluation += $scope.baseController.durationOfAnswerEvaluationInMilliseconds;
        }
        return delayForDisplayingEvaluation;
    };
    $scope.quizShouldEnd = function () {
        var allQuestionsAsked = $scope.baseController.currentQuestionNumber > $scope.baseController.numberOfQuestions;
        var enoughWrongAnswersGiven = $scope.testResult.getSumOfWrongAnswers() >= $scope.enoughWrongAnswersGiven;

        return allQuestionsAsked || enoughWrongAnswersGiven;
    };
    $scope.saveResult = function () {
        $http({
            method: 'POST',
            url: $scope.getUrlForSavingResult(),
            data: $scope.getPostDataForSavingResult(),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function (data, status, headers, config) {
        }).error(function (data, status, headers, config) {
            alert('Leider ist ein Fehler aufgetreten. (Fehlercode: ' + status + ')');
        });
    };
    $scope.getUrlForSavingResult = function () {
        var urlForSavingResult;
        var currentPath = window.location.pathname;

        if(currentPath.charAt(0) !== '/') {
            currentPath = '/' + currentPath;
        }
        urlForSavingResult = currentPath.substr(0, currentPath.indexOf('/testung')) + '/save-result';
        return urlForSavingResult;
    };
    $scope.getPostDataForSavingResult = function () {
        return $.param({
            'markedWrongAnswers': $scope.testResult.getNumberOfMarkedWrongAnswers(),
            'unmarkedWrongAnswers': $scope.testResult.getNumberOfUnmarkedWrongAnswers(),
            'markedCorrectAnswers': $scope.testResult.getNumberOfMarkedCorrectAnswers(),
            'unmarkedCorrectAnswers': $scope.testResult.getNumberOfUnmarkedCorrectAnswers(),
            'noAnswers': $scope.testResult.getNumberOfNoAnswers()
        });
    };
    $scope.manageQuiz();
}
//@ sourceMappingURL=test.js.map
