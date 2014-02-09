var QuestionFactory = (function () {
    function QuestionFactory() { }
    QuestionFactory.getStroopQuestion = function getStroopQuestion(colourSetForDryRun) {
        var colours = ColourFactory.getTwoDistinctColours(colourSetForDryRun);
        var colourForBox = ColourFactory.getRandomColour(colourSetForDryRun);

        return new Question(colours[0], colours[1], colourForBox);
    }
    QuestionFactory.getRegularQuestion = function getRegularQuestion(colourSetForDryRun) {
        var colour = ColourFactory.getRandomColour(colourSetForDryRun);
        var colourForBox = ColourFactory.getRandomColour(colourSetForDryRun);

        return new Question(colour, colour, colourForBox);
    }
    return QuestionFactory;
})();
//@ sourceMappingURL=QuestionFactory.js.map
