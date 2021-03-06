var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/**
* "Abstract" super class for answer evaluations.
*/
var AnswerEvaluation = (function () {
    /**
    * Constructor.
    *
    * @param message Human readable message for this evaluation.
    * @param type Name of the evaluation type, e.g. 'NoAnswer'.
    */
    function AnswerEvaluation(message, type) {
        this.setMessage(message);
        this.setType(type);
        this.createdAt = new Date();
    }
    /**
    * Get the human readable message for this evaluation.
    *
    * @returns {string}
    */
    AnswerEvaluation.prototype.getMessage = function () {
        return this.message;
    };

    /**
    * Set the human readable message for this evaluation.
    *
    * @param message
    * @returns {AnswerEvaluation} fluent interface
    */
    AnswerEvaluation.prototype.setMessage = function (message) {
        this.message = message;
        return this;
    };

    /**
    * Set the name of the evaluation type, e.g. 'NoAnswer'.
    *
    * @param type
    * @returns {AnswerEvaluation} fluent interface
    */
    AnswerEvaluation.prototype.setType = function (type) {
        this.type = type;
        return this;
    };
    return AnswerEvaluation;
})();

/**
* This AnswerEvaluation says no answer has been given.
*/
var NoAnswerEvaluation = (function (_super) {
    __extends(NoAnswerEvaluation, _super);
    /**
    * Constructor.
    */
    function NoAnswerEvaluation() {
        _super.call(this, 'Bitte antworten Sie etwas schneller.', 'NoAnswer');
    }
    return NoAnswerEvaluation;
})(AnswerEvaluation);

/**
* This AnswerEvaluation says the given answer is correct (and was not falsely marked as incorrect).
*/
var CorrectAnswerEvaluation = (function (_super) {
    __extends(CorrectAnswerEvaluation, _super);
    /**
    * Constructor.
    */
    function CorrectAnswerEvaluation() {
        _super.call(this, 'Gut: Ihre Antwort war richtig.', 'UnmarkedCorrectAnswer');
    }
    return CorrectAnswerEvaluation;
})(AnswerEvaluation);

/**
* This AnswerEvaluation says the given answer is wrong (and was not marked as incorrect).
*/
var WrongAnswerEvaluation = (function (_super) {
    __extends(WrongAnswerEvaluation, _super);
    /**
    * Constructor.
    */
    function WrongAnswerEvaluation() {
        _super.call(this, 'Ihre Antwort war falsch.', 'UnmarkedWrongAnswer');
    }
    return WrongAnswerEvaluation;
})(AnswerEvaluation);

/**
* This AnswerEvaluation says the given answer was wrong but was marked as incorrect.
*/
var CorrectlyMarkedAnswerAsWrongEvaluation = (function (_super) {
    __extends(CorrectlyMarkedAnswerAsWrongEvaluation, _super);
    /**
    * Constructor.
    */
    function CorrectlyMarkedAnswerAsWrongEvaluation() {
        _super.call(this, 'Gut: Sie haben bemerkt, dass Sie die falsche Antwort gegeben hatten.', 'MarkedWrongAnswer');
    }
    return CorrectlyMarkedAnswerAsWrongEvaluation;
})(AnswerEvaluation);

/**
* This AnswerEvaluation says the given original answer was correct but was marked as incorrect.
*/
var WronglyMarkedAnswerAsWrongEvaluation = (function (_super) {
    __extends(WronglyMarkedAnswerAsWrongEvaluation, _super);
    /**
    * Constructor.
    */
    function WronglyMarkedAnswerAsWrongEvaluation() {
        _super.call(this, 'Sie haben Ihre eigentlich richtige Antwort leider als Vertipper markiert.', 'MarkedCorrectAnswer');
    }
    return WronglyMarkedAnswerAsWrongEvaluation;
})(AnswerEvaluation);
//# sourceMappingURL=AnswerEvaluations.js.map
