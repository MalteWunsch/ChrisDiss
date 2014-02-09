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
     * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
     * @returns {Question}
     */
    public static getStroopQuestion(colourSetForDryRun: boolean) {
        var colours = ColourFactory.getTwoDistinctColours(colourSetForDryRun),
            colourForBox = ColourFactory.getRandomColour(colourSetForDryRun);
        return new Question(colours[0], colours[1], colourForBox);
    }

    /**
     * Get a regular Question item (having same Colour for name and hex code).
     *
     * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
     * @returns {Question}
     */
    public static getRegularQuestion(colourSetForDryRun: boolean) {
        var colour = ColourFactory.getRandomColour(colourSetForDryRun),
            colourForBox = ColourFactory.getRandomColour(colourSetForDryRun);
        return new Question(colour, colour, colourForBox);
    }
}