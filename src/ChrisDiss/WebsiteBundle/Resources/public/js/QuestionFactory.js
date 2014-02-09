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
    * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
    * @returns {Question}
    */
    QuestionFactory.getStroopQuestion = function (colourSetForDryRun) {
        var colours = ColourFactory.getTwoDistinctColours(colourSetForDryRun), colourForBox = ColourFactory.getRandomColour(colourSetForDryRun);
        return new Question(colours[0], colours[1], colourForBox);
    };

    /**
    * Get a regular Question item (having same Colour for name and hex code).
    *
    * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
    * @returns {Question}
    */
    QuestionFactory.getRegularQuestion = function (colourSetForDryRun) {
        var colour = ColourFactory.getRandomColour(colourSetForDryRun), colourForBox = ColourFactory.getRandomColour(colourSetForDryRun);
        return new Question(colour, colour, colourForBox);
    };
    return QuestionFactory;
})();
//# sourceMappingURL=QuestionFactory.js.map
