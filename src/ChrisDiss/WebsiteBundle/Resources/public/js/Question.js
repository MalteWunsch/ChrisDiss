/// <reference path="Colour.ts" />
/**
* The Question class is for plain, immutable value objects. A Question contains three Colours: one which name is
* displayed on the blood tube, one which hex code is used to colour the aforementioned name and a third one which name
* is displayed on the tube box. A user has to answer whether the hex code colour has the name as displayed in the box.
*/
var Question = (function () {
    /**
    * Constructor. The Colour for the box is chosen at random among the passed Colours.
    *
    * @param colourForName Colour that is used for displaying the Colour name.
    * @param colourForHex Colour that is used for displaying the Colour hex code.
    * @param colourForBox Colour of which the name is used as a label for the tube box.
    */
    function Question(colourForName, colourForHex, colourForBox) {
        var headsOrTails;

        this.colourForName = colourForName;
        this.colourForHex = colourForHex;
        this.colourForBox = colourForBox;
    }
    /**
    * Get the Colour name to display in this Question, e.g. 'red'.
    */
    Question.prototype.getColourName = function () {
        return this.colourForName.getName();
    };

    /**
    * Get the Colour hex code to display in this Question, e.g. 'ff0000'.
    */
    Question.prototype.getColourHex = function () {
        return this.colourForHex.getHex();
    };

    /**
    * Get the Colour name for the tube box, e.g. 'red'.
    */
    Question.prototype.getBoxColourName = function () {
        return this.colourForBox.getName();
    };

    /**
    * Gets the correct answer for this question, i.e. whether the Colour for the hex code is the same (caution: in
    * terms of identity, not equality) as the one used for the tube box.
    *
    * @returns {bool}
    */
    Question.prototype.getCorrectAnswer = function () {
        return this.colourForHex === this.colourForBox;
    };
    return Question;
})();
//# sourceMappingURL=Question.js.map
