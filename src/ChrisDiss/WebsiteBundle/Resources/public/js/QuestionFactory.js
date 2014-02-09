/// <reference path="ColourFactory.ts" />
/// <reference path="Question.ts" />
/**
* The QuestionFactory class creates Question objects.
*/
var QuestionFactory = (function () {
    function QuestionFactory() {
    }
    /**
    * Get a stroop Question (having different Colours for name and hex code).
    *
    * @returns {Question}
    */
    QuestionFactory.getStroopQuestion = function () {
        var colours = ColourFactory.getTwoDistinctColours(), colourForBox = ColourFactory.getRandomColour();
        return new Question(colours[0], colours[1], colourForBox);
    };

    /**
    * Get a regular Question item (having same Colour for name and hex code).
    *
    * @returns {Question}
    */
    QuestionFactory.getRegularQuestion = function () {
        var colour = ColourFactory.getRandomColour(), colourForBox = ColourFactory.getRandomColour();
        return new Question(colour, colour, colourForBox);
    };
    return QuestionFactory;
})();
//# sourceMappingURL=QuestionFactory.js.map
