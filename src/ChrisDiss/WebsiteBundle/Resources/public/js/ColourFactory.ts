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
        new Colour('gelb', 'ffff00'),
        new Colour('pink', 'ff00ff'),
        new Colour('türkis', '00ffff')
    ];

    /**
     * Get a random Colour.
     */
    public static getRandomColour() {
        var index = Math.floor(Math.random() * this.colours.length);
        return this.colours[index];
    }

    /**
     * Get two distinct Colours.
     */
    public static getTwoDistinctColours() {
        var firstColour = this.getRandomColour();
        var secondColour = this.getRandomColour();
        while (secondColour === firstColour) {
            secondColour = this.getRandomColour();
        }
        return [firstColour, secondColour];
    }
}