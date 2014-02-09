var Question = (function () {
    function Question(colourForName, colourForHex, colourForBox) {
        var headsOrTails;
        this.colourForName = colourForName;
        this.colourForHex = colourForHex;
        this.colourForBox = colourForBox;
    }
    Question.prototype.getColourName = function () {
        return this.colourForName.getName();
    };
    Question.prototype.getColourHex = function () {
        return this.colourForHex.getHex();
    };
    Question.prototype.getBoxColourName = function () {
        return this.colourForBox.getName();
    };
    Question.prototype.getCorrectAnswer = function () {
        return this.colourForHex === this.colourForBox;
    };
    return Question;
})();
//@ sourceMappingURL=Question.js.map
