/**
 * The ColourFactory class creates Colour objects.
 */
class ColourFactory
{
    /**
     * Collection of all known Colours.
     */
    static colours = [
        new Colour('rot', 'ff0000'),
        new Colour('grün', '00ff00'),
        new Colour('blau', '0000ff'),
        new Colour('pink', 'ff00ff'),
        new Colour('türkis', '00ffff')
    ];

    /**
     * Collection of the Colours available in the dry run.
     */
    static dryRunColours = [
        new Colour('rot', 'ff0000'),
        new Colour('blau', '0000ff')
    ];

    /**
     * Get a random Colour.
     */
    public static getRandomColour(colourSetForDryRun: boolean) {
        var index,
            colourSet = (colourSetForDryRun === true)? this.dryRunColours : this.colours;

        index = Math.floor(Math.random() * colourSet.length);
        return colourSet[index];
    }

    /**
     * Get two distinct Colours.
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