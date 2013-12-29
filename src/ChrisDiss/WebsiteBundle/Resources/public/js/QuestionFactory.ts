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
    public static getStroopQuestion(colourSetForDryRun: boolean) {
        var colours = ColourFactory.getTwoDistinctColours(colourSetForDryRun);
        return new Question(colours[0], colours[1]);
    };

    /**
     * Get a regular Question item (having same Colour for name and hex code).
     *
     * @returns {Question}
     */
    public static getRegularQuestion = function (colourSetForDryRun: boolean) {
        var colour = ColourFactory.getRandomColour(colourSetForDryRun);
        return new Question(colour, colour);
    };
}