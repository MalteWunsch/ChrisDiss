var Question = (function () {
    function Question(colourForName, colourForHex) {
        this.colourForName = colourForName;
        this.colourForHex = colourForHex;
    }
    Question.prototype.getColourName = function () {
        return this.colourForName.getName();
    };
    Question.prototype.getColourHex = function () {
        return this.colourForHex.getHex();
    };
    Question.prototype.isStroop = function () {
        return (this.colourForName === this.colourForHex);
    };
    return Question;
})();
//@ sourceMappingURL=Question.js.map
