/// <reference path="ColourFactory.ts" />
/// <reference path="Question.ts" />

/**
 * The QuestionFactory class creates Question objects.
 */
class QuestionFactory
{
    /**
     * Get a stroop Question (having different Colours for name and hex code).
     *
     * @returns {Question}
     */
    public static getStroopQuestion() {
        var colours = ColourFactory.getTwoDistinctColours(),
            colourForBox = ColourFactory.getRandomColour();
        return new Question(colours[0], colours[1], colourForBox);
    }

    /**
     * Get a regular Question item (having same Colour for name and hex code).
     *
     * @returns {Question}
     */
    public static getRegularQuestion() {
        var colour = ColourFactory.getRandomColour(),
            colourForBox = ColourFactory.getRandomColour();
        return new Question(colour, colour, colourForBox);
    }
}