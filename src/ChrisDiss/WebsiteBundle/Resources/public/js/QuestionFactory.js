var QuestionFactory = (function () {
    function QuestionFactory() { }
    QuestionFactory.getStroopQuestion = function getStroopQuestion() {
        var colours = ColourFactory.getTwoDistinctColours();
        return new Question(colours[0], colours[1]);
    }
    QuestionFactory.getRegularQuestion = function () {
        var colour = ColourFactory.getRandomColour();
        return new Question(colour, colour);
    };
    return QuestionFactory;
})();
//@ sourceMappingURL=QuestionFactory.js.map
