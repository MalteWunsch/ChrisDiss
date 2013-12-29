var __extends = this.__extends || function (d, b) {
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
}
var AnswerEvaluation = (function () {
    function AnswerEvaluation(message) {
        this.setMessage(message);
    }
    AnswerEvaluation.prototype.getMessage = function () {
        return this.message;
    };
    AnswerEvaluation.prototype.setMessage = function (message) {
        this.message = message;
        return this;
    };
    return AnswerEvaluation;
})();
var NoAnswerEvaluation = (function (_super) {
    __extends(NoAnswerEvaluation, _super);
    function NoAnswerEvaluation() {
        _super.call(this, 'Bitte antworten Sie noch etwas schneller.');
    }
    return NoAnswerEvaluation;
})(AnswerEvaluation);
var CorrectAnswerEvaluation = (function (_super) {
    __extends(CorrectAnswerEvaluation, _super);
    function CorrectAnswerEvaluation() {
        _super.call(this, 'Gut: Ihre Antwort war richtig.');
    }
    return CorrectAnswerEvaluation;
})(AnswerEvaluation);
var WrongAnswerEvaluation = (function (_super) {
    __extends(WrongAnswerEvaluation, _super);
    function WrongAnswerEvaluation() {
        _super.call(this, 'Ihre Antwort war leider falsch.');
    }
    return WrongAnswerEvaluation;
})(AnswerEvaluation);
var CorrectlyMarkedAnswerAsWrongEvaluation = (function (_super) {
    __extends(CorrectlyMarkedAnswerAsWrongEvaluation, _super);
    function CorrectlyMarkedAnswerAsWrongEvaluation() {
        _super.call(this, 'Gut: Sie haben bemerkt, dass Sie die falsche Antwort gegeben hatten.');
    }
    return CorrectlyMarkedAnswerAsWrongEvaluation;
})(AnswerEvaluation);
var WronglyMarkedAnswerAsWrongEvaluation = (function (_super) {
    __extends(WronglyMarkedAnswerAsWrongEvaluation, _super);
    function WronglyMarkedAnswerAsWrongEvaluation() {
        _super.call(this, 'Sie haben Ihre eigentlich richtige Antwort leider als Vertipper markiert.');
    }
    return WronglyMarkedAnswerAsWrongEvaluation;
})(AnswerEvaluation);
//@ sourceMappingURL=AnswerEvaluations.js.map
