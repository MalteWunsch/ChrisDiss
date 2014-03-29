/// <reference path="ColourFactory.ts" />
/// <reference path="Question.ts" />
/**
* The QuestionFactory class creates Question objects.
*/
var QuestionFactory = (function () {
    function QuestionFactory() {
    }
    /**
    * Get a stroop Question (having different Colours for name and hex code). With a 50% chance, the blood tube's
    * colour hex code and the colour name on the tube box match, i.e. the correct answer would be 'Y'.
    *
    * @returns {Question}
    */
    QuestionFactory.getStroopQuestion = function () {
        var headsOrTails = Math.ceil(Math.random() * 2), colourForBox = ColourFactory.getRandomColour(), nameColour = ColourFactory.getRandomColourButNot([colourForBox]), thirdColour = ColourFactory.getRandomColourButNot([colourForBox, nameColour]);

        if (headsOrTails === 1) {
            return new Question(nameColour, colourForBox, colourForBox);
        } else {
            return new Question(nameColour, thirdColour, colourForBox);
        }
    };

    /**
    * Get a regular Question item (having same Colour for name and hex code). With a 50% chance, the blood tube's
    * colour hex code and the colour name on the tube box match, i.e. the correct answer would be 'Y'.
    *
    * @returns {Question}
    */
    QuestionFactory.getRegularQuestion = function () {
        var headsOrTails = Math.ceil(Math.random() * 2), colourForBox = ColourFactory.getRandomColour(), differentColour = ColourFactory.getRandomColourButNot([colourForBox]);

        if (headsOrTails === 1) {
            return new Question(colourForBox, colourForBox, colourForBox);
        } else {
            return new Question(differentColour, differentColour, colourForBox);
        }
    };
    return QuestionFactory;
})();
//# sourceMappingURL=QuestionFactory.js.map
