/**
 * The ColourFactory class creates Colour objects.
 */
class ColourFactory
{
    /**
     * Collection of all known Colours.
     */
    static colours = [
        new Colour('ROT', 'ff0000'),
        new Colour('GRÜN', '009900'),
        new Colour('BLAU', '0000ff'),
        new Colour('PINK', 'ff00ff'),
        new Colour("BRAUN", '8B4C39')
    ];

    /**
     * Collection of the Colours available in the dry run.
     */
    static dryRunColours = [
        new Colour('ROT', 'ff0000'),
        new Colour('BLAU', '0000ff')
    ];

    /**
     * Get a random Colour.
     *
     * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
     * @returns {Colour}
     */
    public static getRandomColour(colourSetForDryRun: boolean) {
        var index,
            colourSet = (colourSetForDryRun === true)? this.dryRunColours : this.colours;

        index = Math.floor(Math.random() * colourSet.length);
        return colourSet[index];
    }

    /**
     * Get two distinct Colours.
     *
     * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
     * @returns {Colour[]}
     */
    public static getTwoDistinctColours(colourSetForDryRun: boolean) {
        var firstColour = this.getRandomColour(colourSetForDryRun);
        var secondColour = this.getRandomColour(colourSetForDryRun);
        while (secondColour === firstColour) {
            secondColour = this.getRandomColour(colourSetForDryRun);
        }
        return [firstColour, secondColour];
    }
}