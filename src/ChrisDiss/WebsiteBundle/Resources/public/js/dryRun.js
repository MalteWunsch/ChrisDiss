/// <reference path="BaseController.ts" />
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
    $scope.baseController = new BaseController(10, 2000, 1000, 3000, 3000, 50, true);

    /**
    * Fixed set of questions for the dry run, so that each user has seen examples for questions that have the answer
    * 'yes' and 'no' (for all different reasons).
    *
    * @type {Question[]}
    */
    $scope.questionsForDryRun = [
        new Question(ColourFactory.getByName('blau'), ColourFactory.getByName('blau'), ColourFactory.getByName('blau')),
        new Question(ColourFactory.getByName('rot'), ColourFactory.getByName('rot'), ColourFactory.getByName('blau')),
        new Question(ColourFactory.getByName('rot'), ColourFactory.getByName('blau'), ColourFactory.getByName('blau')),
        new Question(ColourFactory.getByName('blau'), ColourFactory.getByName('rot'), ColourFactory.getByName('blau')),
        new Question(ColourFactory.getByName('rot'), ColourFactory.getByName('rot'), ColourFactory.getByName('rot')),
        new Question(ColourFactory.getByName('rot'), ColourFactory.getByName('blau'), ColourFactory.getByName('rot')),
        new Question(ColourFactory.getByName('blau'), ColourFactory.getByName('rot'), ColourFactory.getByName('rot')),
        new Question(ColourFactory.getByName('blau'), ColourFactory.getByName('blau'), ColourFactory.getByName('rot')),
        new Question(ColourFactory.getByName('blau'), ColourFactory.getByName('rot'), ColourFactory.getByName('blau')),
        new Question(ColourFactory.getByName('blau'), ColourFactory.getByName('rot'), ColourFactory.getByName('rot'))
    ];

    /**
    * Manage the quiz control flow.
    */
    $scope.manageQuiz = function () {
        var delayForDisplayingEvaluation = $scope.manageAnswerEvaluation();

        if ($scope.quizShouldEnd() === true) {
            $scope.baseController.manageEndOfQuestions();
        } else {
            $scope.baseController.manageNextQuestion($timeout, delayForDisplayingEvaluation, $scope, $scope.setNextQuestion);
        }
    };

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
            $scope.baseController.question = $scope.questionsForDryRun[$scope.baseController.currentQuestionNumber - 1];
            $scope.baseController.currentQuestionNumber += 1;
            $scope.baseController.answer = null;
        }, timeIndex);
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
//# sourceMappingURL=dryRun.js.map
