/// <reference path="../../../../../../vendor/borisyankov/definitely-typed/jquery/jquery.d.ts" />
/// <reference path="Question.ts" />
/// <reference path="QuestionFactory.ts" />
/// <reference path="Answer.ts" />
/// <reference path="KeyCodeHelper.ts" />

/**
 * Base controller for extracting commonalities between the dryRun- and test-Controller, implemented as a composite
 * because currently I'm not cleverer than that.
 *
 * @TODO: Composition doesn't really fit here. But it seems there is no way to let a function like the AngularJS
 * controller functions (not a function object) inherit from another function. Get sure of that. If not, learn about
 * AngularJS modules, which seem to use function objects, which should be easier to get along with prototypical
 * inheritance. Learn about prototypical inheritance.
 */
class BaseController {
    /**
     * Constant number of questions to ask.
     */
    public numberOfQuestions: number;

    /**
     * Number of the current question asked.
     */
    public currentQuestionNumber: number;

    /**
     * Constant duration in milliseconds to display nothing but a focus mark between Questions to allow a user to
     * regenerate their concentration. After that, the blood tube is displayed.
     */
    public durationOfFocusMarkInMilliseconds: number;

    /**
     * Constant delay in milliseconds before displaying the tube box after the blood tube.
     */
    public delayBeforeTubeBoxInMilliseconds: number;

    /**
     * Duration in milliseconds for listening to user input for an answer key after both the blood tube and the tube box
     * have been displayed. Can be cut short if the user answers before the end of this duration.
     */
    public durationOfAnswerListeningInMilliseconds: number;

    /**
     * Constant duration in milliseconds for listening to user input for marking a previously given answer as incorrect.
     */
    public durationOfAnswerMarkListeningInMilliseconds: number;

    /**
     * Constant duration in milliseconds the evaluation of the user's answer is displayed.
     */
    public durationOfAnswerEvaluationInMilliseconds: number;

    /**
     * Constant percentage of chance that a Question is a Stroop one.
     */
    public percentageOfStroopQuestions: number;

    /**
     * Current Question.
     */
    public question: Question;

    /**
     * Locked answer to the current question.
     */
    public answer: Answer;

    /**
     * Constructor.
     *
     * @param numberOfQuestions number of questions to ask
     * @param durationOfFocusMarkInMilliseconds Constant duration in milliseconds to display nothing but a focus mark
     * between Questions to allow a user to regenerate their concentration. After that, the blood tube is displayed.
     * @param delayBeforeTubeBoxInMilliseconds Constant delay in milliseconds before displaying the tube box after the
     * blood tube.
     * @param durationOfAnswerListeningInMilliseconds Duration in milliseconds for listening to user input for an answer
     * key after both the blood tube and the tube box have been displayed. Can be cut short if the user answers before
     * the end of this duration.
     * @param durationOfAnswerMarkListeningInMilliseconds Constant duration in milliseconds for listening to user input
     * for marking a previously given answer as incorrect.
     * @param durationOfAnswerEvaluationInMilliseconds Constant duration in milliseconds the evaluation of the user's
     * answer is displayed.
     * @param percentageOfStroopQuestions Constant percentage of chance that a Question is a Stroop one.
     */
    constructor(
        numberOfQuestions: number,
        durationOfFocusMarkInMilliseconds: number,
        delayBeforeTubeBoxInMilliseconds: number,
        durationOfAnswerListeningInMilliseconds: number,
        durationOfAnswerMarkListeningInMilliseconds: number,
        durationOfAnswerEvaluationInMilliseconds: number,
        percentageOfStroopQuestions: number
    ) {
        this.numberOfQuestions = numberOfQuestions;
        this.currentQuestionNumber = 1;
        this.durationOfFocusMarkInMilliseconds = durationOfFocusMarkInMilliseconds;
        this.delayBeforeTubeBoxInMilliseconds = delayBeforeTubeBoxInMilliseconds;
        this.durationOfAnswerListeningInMilliseconds = durationOfAnswerListeningInMilliseconds;
        this.durationOfAnswerMarkListeningInMilliseconds = durationOfAnswerMarkListeningInMilliseconds;
        this.durationOfAnswerEvaluationInMilliseconds = durationOfAnswerEvaluationInMilliseconds;
        this.percentageOfStroopQuestions = percentageOfStroopQuestions
    }

    /**
     * Manages giving the user the next Question.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     * @param $scope AngularJS $scope.
     * @param setNextQuestionFunction function to execute to choose the next question.
     */
    public manageNextQuestion($timeout, timeIndex: number, $scope, setNextQuestionFunction) {
        this.displayFocusMark($timeout, timeIndex);

        timeIndex += this.durationOfFocusMarkInMilliseconds;
        setNextQuestionFunction($timeout, timeIndex, $scope);
        this.displayBloodTube($timeout, timeIndex);

        timeIndex += this.delayBeforeTubeBoxInMilliseconds;
        this.allowUserInput($timeout, timeIndex);
        this.displayTubeBox($timeout, timeIndex);

        timeIndex += this.durationOfAnswerListeningInMilliseconds + this.durationOfAnswerMarkListeningInMilliseconds;
        this.setNextManagement($timeout, timeIndex, $scope);
    }

    /**
     * Starting at some timeIndex, the screen is blank. Display a focus mark for durationOfFocusMarkInMilliseconds to
     * allow users to regenerate their concentration and focus on the area where the next question will show up. After
     * that, the focus mark is hidden.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     */
    public displayFocusMark($timeout, timeIndex: number) {
        $timeout(
            function () {
                $('#userFocusMarker').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('#userFocusMarker').hide();
            },
            timeIndex + this.durationOfFocusMarkInMilliseconds
        );
    }

    /**
     * Starting at the timeIndex after the focus mark, the screen is blank. Display the blood tube as one part of the
     * Question for delayBeforeTubeBoxInMilliseconds + durationOfAnswerListeningInMilliseconds
     * + durationOfAnswerMarkListeningInMilliseconds milliseconds. After that, the blood tube is hidden.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     */
    public displayBloodTube($timeout, timeIndex: number) {
        $timeout(
            function () {
                $('#question').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('#question').hide();
            },
            (timeIndex
                + this.delayBeforeTubeBoxInMilliseconds
                + this.durationOfAnswerListeningInMilliseconds
                + this.durationOfAnswerMarkListeningInMilliseconds
            )
        );
    }

    /**
     * Starting at the timeIndex after the blood tube + delayBeforeTubeBoxInMilliseconds, allow user input for answering
     * the Question for durationOfAnswerListeningInMilliseconds. After that, user input for marking the answer is
     * allowed for durationOfMarkListeningInMilliseconds, amd after that, all input is disabled.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     */
    public allowUserInput($timeout, timeIndex: number) {
        $timeout(
            function () {
                Answer.setCanBeEnteredNow(true);
            },
            timeIndex
        );
        $timeout(
            function () {
                Answer.setCanBeEnteredNow(false);
                Answer.setCanBeMarkedNow(true);
            },
            timeIndex + this.durationOfAnswerListeningInMilliseconds
        );
        $timeout(
            function () {
                Answer.setCanBeMarkedNow(false);
            },
            timeIndex + this.durationOfAnswerListeningInMilliseconds + this.durationOfAnswerMarkListeningInMilliseconds
        );
    }

    /**
     * Starting at the timeIndex after the blood tube + delayBeforeTubeBoxInMilliseconds, the screen show the blood
     * tube. Display the tube box (and error detection notice) as the second and final part of the Question for
     * delayBeforeTubeBoxInMilliseconds + durationOfAnswerListeningInMilliseconds
     * + durationOfAnswerMarkListeningInMilliseconds milliseconds. After that, the tube box, error detection notice and
     * a possible answer are hidden.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     */
    public displayTubeBox($timeout, timeIndex: number) {
        $timeout(
            function () {
                $('.tube-box').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('#question, .tube-box').hide();
            },
            timeIndex + this.durationOfAnswerListeningInMilliseconds + this.durationOfAnswerMarkListeningInMilliseconds
        );
    }

    /**
     * Starting at the timeIndex after the user input, call the manager function for the Question currently displayed
     * and the Answer possibly given.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     * @param $scope AngularJS $scope.
     */
    public setNextManagement($timeout, timeIndex: number, $scope) {
        $timeout(
            function () {
                $scope.manageQuiz();
            },
            timeIndex
        );
    }

    /**
     * Get the one of five possible evaluation of the user's answer:
     * 1) user entered no (allowed) key at all
     * 2) user entered correct key and did not enter the "error noticed" key
     * 3) user entered wrong key and did not enter the "error noticed" key
     * 4) user entered wrong key and entered the "error noticed" key
     * 5) user entered correct key but entered the "error noticed" key
     *
     * @returns {AnswerEvaluation}
     */
    public getAnswerEvaluation() {
        return Answer.getEvaluation(this.answer, this.question);
    }

    /**
     * Starting at the timeIndex after the Question, the screen is blank. Display the evaluation of the user's answer
     * for durationOfAnswerEvaluationInMilliseconds. After that, the evaluation is hidden.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     */
    public displayAnswerEvaluation($timeout, timeIndex: number) {
        $timeout(
            function () {
                $('#answerEvaluation').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('#answerEvaluation').hide();
            },
            timeIndex + this.durationOfAnswerEvaluationInMilliseconds
        );
    }

    /**
     * Manage the end after the user has answered all Questions.
     *
     * @param $timeout AngularJS timeout function to delay execution of a function.
     * @param timeIndex delay for the $timeout in milliseconds.
     */
    public manageEndOfQuestions($timeout, timeIndex: number) {
        $timeout(
            function () {
                $('#endOfQuestions').show();
            },
            timeIndex
        );
    }

    /**
     * Handle the user input: If the user presses one of the allowed keys, the answer is locked.
     *
     * @param event the key press event
     */
    public handleUserInput(event) {
        var lowerCaseChar = String.fromCharCode(
            KeyCodeHelper.shiftKeyCodeToLowerCasedLetterIfApplicable(event.which)
        );

        if (Answer.getCanBeEnteredNow() === true
            && this.answer === null
            && (lowerCaseChar === Answer.getCharacterForYes() || lowerCaseChar === Answer.getCharacterForNo())
        ) {
            this.answer = new Answer(lowerCaseChar);
            Answer.setCanBeEnteredNow(false);
            Answer.setCanBeMarkedNow(true);
        } else if (Answer.getCanBeMarkedNow() === true
            && this.answer !== null
            && lowerCaseChar === Answer.getCharacterForMarkingAnswerAsErroneous()
        ) {
            this.answer.markAsErroneous();
        }
    }

    /**
     * Get whether an answer can be entered now.
     *
     * This delegationb method is used in the views, as angular expressions cannot query the static
     * Answer.getCanBeEnteredNow() by themselves.
     *
     * @returns {boolean}
     */
    public answerCanBeEnteredNow() {
        return Answer.getCanBeEnteredNow();
    }

    /**
     * Get whether an answer can be marked as incorrect now.
     *
     * This delegation method is used in the views, as angular expressions cannot query the static
     * Answer.getCanBeMarkedNow() by themselves.
     *
     * @returns {boolean}
     */
    public answerCanBeMarkedNow() {
        return Answer.getCanBeMarkedNow();
    }

    /**
     * Get whether one of the termination conditions is met.
     *
     * @returns {boolean}
     */
    public quizShouldEnd() {
        return this.currentQuestionNumber > this.numberOfQuestions;
    }
}
