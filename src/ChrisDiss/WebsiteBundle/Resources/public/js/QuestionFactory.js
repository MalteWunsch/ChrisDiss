var QuestionFactory = (function () {
    function QuestionFactory() { }
    QuestionFactory.getStroopQuestion = function getStroopQuestion(colourSetForDryRun) {
        var colours = ColourFactory.getTwoDistinctColours(colourSetForDryRun);
        return new Question(colours[0], colours[1]);
    }
    QuestionFactory.getRegularQuestion = function getRegularQuestion(colourSetForDryRun) {
        var colour = ColourFactory.getRandomColour(colourSetForDryRun);
        return new Question(colour, colour);
    }
    return QuestionFactory;
})();
//@ sourceMappingURL=QuestionFactory.js.map
