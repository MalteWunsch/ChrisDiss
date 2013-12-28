var Question = (function () {
    function Question(colourForName, colourForHex) {
        this.colourForName = colourForName;
        this.colourForHex = colourForHex;
        var headsOrTails = Math.floor(Math.random() * 2);
        this.colourForBox = (headsOrTails === 0) ? colourForHex : colourForName;
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
    Question.prototype.isStroop = function () {
        return (this.colourForName === this.colourForHex);
    };
    return Question;
})();
//@ sourceMappingURL=Question.js.map
