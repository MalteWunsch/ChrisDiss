/// <reference path="../../../../../../vendor/borisyankov/definitely-typed/jquery/jquery.d.ts" />
/// <reference path="BaseController.ts" />
/// <reference path="TestResult.ts" />
/**
* AngularJS-controller for the real test.
*/
function TestCtrl($scope, $timeout, $http) {
    'use strict';

    /**
    * Number of Questions the user has been too slow to answer after which they will be given a "too slow" notice.
    *
    * @type {number}
    */
    $scope.numberOfNoAnswersBeforeTooSlowNotice = 3;

    /**
    * Maximum number of Questions the user can answer in the test, if no other exit condition occurs earlier.
    *
    * @type {number}
    */
    $scope.maxNumberOfQuestionsInTest = 100;

    /**
    * Base controller with extracted commonalities between the dryRun- and test-Controller,
    *
    * @type {BaseController}
    */
    $scope.baseController = new BaseController($scope.maxNumberOfQuestionsInTest, 2000, 200, 900, 1000, 3000, 80);

    /**
    * Seconds the pause screen is displayed.
    *
    * @type {number}
    */
    $scope.pauseDuration = 15;

    /**
    * Remaining number of seconds for the current pause.
    *
    * @type {boolean}
    */
    $scope.pauseForXSeconds = 0;

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
        var delayForDisplayingEvaluation = $scope.manageAnswerEvaluation(), delayForNextQuestion = delayForDisplayingEvaluation;

        if ($scope.baseController.quizShouldEnd() === true) {
            $scope.saveResult();
            $scope.baseController.manageEndOfQuestions($timeout, delayForDisplayingEvaluation);
        } else {
            // inject pause
            if ($scope.quizShouldPause() === true) {
                delayForNextQuestion += $scope.pauseDuration * 1000;
                $timeout(function () {
                    $scope.pauseForXSeconds = $scope.pauseDuration;
                    $scope.pauseCountdown();
                }, delayForDisplayingEvaluation);
            }

            $scope.baseController.manageNextQuestion($timeout, delayForNextQuestion, $scope, $scope.setNextQuestion);
        }
    };

    /**
    * Get whether the quiz should be paused now.
    *
    * @returns {boolean}
    */
    $scope.quizShouldPause = function () {
        return ($scope.baseController.currentQuestionNumber % 21 === 0);
    };

    /**
    * Count the remaining pause down, one second each second.
    */
    $scope.pauseCountdown = function () {
        $timeout(function () {
            $scope.pauseForXSeconds--;
            if ($scope.pauseForXSeconds > 0) {
                $scope.pauseCountdown();
            }
        }, 1000);
    };

    // display pause - dann wieder fiese dom manipulation?
    /**
    * Starting at the timeIndex after the focus mark, set a new Question, with it randomly being a Stroop or a regular
    * one. That deletes the former answer.
    *
    * @param $timeout AngularJS timeout function to delay execution of a function.
    * @param timeIndex delay for the $timeout in milliseconds.
    * @param $scope AngularJS $scope.
    */
    $scope.setNextQuestion = function ($timeout, timeIndex, $scope) {
        $timeout(function () {
            var dice100Result = Math.ceil(Math.random() * 100);
            if (dice100Result >= $scope.baseController.percentageOfStroopQuestions) {
                $scope.baseController.question = QuestionFactory.getRegularQuestion();
            } else {
                $scope.baseController.question = QuestionFactory.getStroopQuestion();
            }
            $scope.baseController.currentQuestionNumber += 1;
            $scope.baseController.answer = null;
        }, timeIndex);
    };

    /**
    * Manage the evaluation of the user's answer: For the real test run, store the evaluation in the test result and
    * display the "too slow" message if the user has been too slow several times.
    *
    * @returns {number} delay for displaying the answer evaluation in milliseconds.
    */
    $scope.manageAnswerEvaluation = function () {
        var delayForDisplayingEvaluation = 0, answerEvaluation;

        if ($scope.baseController.currentQuestionNumber === 1) {
            return delayForDisplayingEvaluation;
        }

        answerEvaluation = $scope.baseController.getAnswerEvaluation();
        $scope.testResult.add(answerEvaluation);

        // if user was too slow and has already missed numberOfNoAnswersBeforeTooSlowNotice questions, display notice
        if (answerEvaluation instanceof NoAnswerEvaluation && this.testResult.getNumberOfNoAnswers() > this.numberOfNoAnswersBeforeTooSlowNotice && $scope.baseController.currentQuestionNumber <= $scope.maxNumberOfQuestionsInTest) {
            $scope.baseController.displayAnswerEvaluation($timeout, 0);
            delayForDisplayingEvaluation += $scope.baseController.durationOfAnswerEvaluationInMilliseconds;
        }

        return delayForDisplayingEvaluation;
    };

    /**
    * Save the test result via an AJAX call.
    */
    $scope.saveResult = function () {
        $http({
            method: 'POST',
            url: $scope.getUrlForSavingResult(),
            data: $scope.getPostDataForSavingResult(),
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).success(function () {
        }).error(function (data, status) {
            alert('Leider ist ein Fehler aufgetreten. (Fehlercode: ' + status + ')');
        });
    };

    /**
    * Get the URL for saving the test result.
    *
    * @returns {string}
    */
    $scope.getUrlForSavingResult = function () {
        var urlForSavingResult, currentPath = window.location.pathname;

        if (currentPath.charAt(0) !== '/') {
            currentPath = '/' + currentPath;
        }
        urlForSavingResult = currentPath.substr(0, currentPath.indexOf('/testung')) + '/save-result';

        return urlForSavingResult;
    };

    /**
    * Get the data for saving the result as a string, suitable for the request body.
    *
    * @returns {string}
    */
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
    $('.hideAtFirstWhereNgCloakIsNotWorking').show();
}
//# sourceMappingURL=test.js.map
