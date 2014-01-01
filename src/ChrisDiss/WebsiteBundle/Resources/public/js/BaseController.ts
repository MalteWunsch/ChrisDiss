/**
 * Base controller for extracting commonalities between the dryRun- and test-Controller, implemented as a composite
 * because currently I'm not cleverer than that.
 *
 * @TODO: Composition doesn't really fit here. But it seems there is no way to let a function like the AngularJS
 * controller functions (not a function object) inherit from another function. Get sure of that. If not, learn about
 * AngularJS modules, which seem to use function objects, which should be easier to get along with prototypical
 * inheritance. Learn about prototypical inheritance.
 */
class BaseController
{
    /**
     * Constant number of questions to ask.
     *
     * @type {number}
     */
    public numberOfQuestions: number;

    /**
     * Number of the current question asked.
     *
     * @type {number}
     */
    public currentQuestionNumber: number;

    /**
     * Constant duration in milliseconds to display nothing but a focus mark between Questions to allow a user to
     * regenerate their concentration. After that, the blood tube is displayed.
     *
     * @type {number}
     */
    public durationOfFocusMarkInMilliseconds: number;

    /**
     * Constant delay in milliseconds before displaying the tube box after the blood tube.
     *
     * @type {number}
     */
    public delayBeforeTubeBoxInMilliseconds: number;

    /**
     * Constant duration in milliseconds for listening to user input after both the blood tube and the tube box have
     * been displayed.
     *
     * @type {number}
     */
    public durationOfUserInputListeningInMilliseconds: number;

    /**
     * Constant duration in milliseconds the evaluation of the user's answer is displayed.
     *
     * @type {number}
     */
    public durationOfAnswerEvaluationInMilliseconds: number;

    /**
     * Current Question.
     *
     * @type {Question|null}
     */
    public question: Question;

    /**
     * Locked answer to the current question.
     *
     * @type {Answer|null}
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
     * @param durationOfUserInputListeningInMilliseconds Constant duration in milliseconds for listening to user input
     * after both the blood tube and the tube box have been displayed.
     * @param durationOfAnswerEvaluationInMilliseconds Constant duration in milliseconds the evaluation of the user's
     * answer is displayed.
     */
    constructor(
        numberOfQuestions: number,
        durationOfFocusMarkInMilliseconds: number,
        delayBeforeTubeBoxInMilliseconds: number,
        durationOfUserInputListeningInMilliseconds: number,
        durationOfAnswerEvaluationInMilliseconds: number
    ) {
        this.numberOfQuestions = numberOfQuestions;
        this.currentQuestionNumber = 1;
        this.durationOfFocusMarkInMilliseconds = durationOfFocusMarkInMilliseconds;
        this.delayBeforeTubeBoxInMilliseconds = delayBeforeTubeBoxInMilliseconds;
        this.durationOfUserInputListeningInMilliseconds = durationOfUserInputListeningInMilliseconds;
        this.durationOfAnswerEvaluationInMilliseconds = durationOfAnswerEvaluationInMilliseconds;
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
     * Manages giving the user another Question. For the time-dependant parts which show and hide DOM elements, this is
     * timeIndex = 0.
     */
    public manageAnotherQuestion($timeout) {
        this.displayFocusMark($timeout);
        this.displayQuestion($timeout);
        this.displayAnswerEvaluation($timeout);
        this.setNextQuestion();
    }

    /**
     * Starting at timeIndex = 0, the screen is blank. Display a focus mark for durationOfFocusMarkInMilliseconds to
     * allow users to regenerate their concentration and focus on the area where the next question will show up. After
     * that, the focus mark is hidden.
     */
    public displayFocusMark($timeout) {
        var timeIndex = 0;
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
     * Starting at the timeIndex after that focus mark, the screen is blank. Display the question in two parts: the
     * blood tube at first, and after delayBeforeTubeBoxInMilliseconds the tube box. After displaying the tube box, the
     * Question as a whole is displayed for durationOfUserInputListeningInMilliseconds and an answer can be entered.
     * After that, the Question and a possible answer are hidden and answers can no longer be entered.
     */
    public displayQuestion($timeout) {
        var timeIndex = this.durationOfFocusMarkInMilliseconds;
        $timeout(
            function () {
                $('#question').show();
            },
            timeIndex
        );
        $timeout(
            function () {
                $('.tube-box, #errorDetectionNotice').show();
                Answer.setCanBeEnteredNow(true);
            },
            timeIndex + this.delayBeforeTubeBoxInMilliseconds
        );
        $timeout(
            function () {
                $('#question, .tube-box, #errorDetectionNotice, #lockedAnswer, #answerMarkedErroneous').hide();
                Answer.setCanBeEnteredNow(false);
            },
            timeIndex + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds
        );
    }

    /**
     * Starting at the timeIndex after the Question, the screen is blank. Display the evaluation of the user's answer
     * for durationOfAnswerEvaluationInMilliseconds. After that, the evaluation is hidden.
     */
    public displayAnswerEvaluation($timeout) {
        var timeIndex = this.durationOfFocusMarkInMilliseconds + this.delayBeforeTubeBoxInMilliseconds + this.durationOfUserInputListeningInMilliseconds;
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
     * Sets a new Question, with it randomly being a Stroop or a regular one.
     */
    public setNextQuestion() {
        var dice100Result = Math.ceil(Math.random() * 100);
        if (dice100Result <= 50) {
            this.question = QuestionFactory.getRegularQuestion(true);
        } else {
            this.question = QuestionFactory.getStroopQuestion(true);
        }
        this.currentQuestionNumber += 1;
        this.answer = null;
    }

    /**
     * Manage the end after the user has answered all Questions.
     */
    public manageEndOfQuestions($interval, manageQuizInterval) {
        $interval.cancel(manageQuizInterval);
        $('#endOfQuestions').show();
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

        if (Answer.getCanBeEnteredNow() === true) {
            if (this.answer === null) {
                if (lowerCaseChar === Answer.getCharacterForYes() || lowerCaseChar === Answer.getCharacterForNo()) {
                    this.answer = new Answer(lowerCaseChar);
                    $('#lockedAnswer').show();
                }
            } else if (lowerCaseChar === Answer.getCharacterForMarkingAnswerAsErroneous()) {
                this.answer.markAsErroneous();
                $('#answerMarkedErroneous').show();
            }
        }
    }
}
