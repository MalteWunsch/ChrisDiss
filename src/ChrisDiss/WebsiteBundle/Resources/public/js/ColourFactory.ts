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
     * Get a random Colour.
     *
     * @returns {Colour}
     */
    public static getRandomColour() {
        var index = Math.floor(Math.random() * this.colours.length);
        return this.colours[index];
    }

    /**
     * Get two distinct Colours.
     *
     * @returns {Colour[]}
     */
    public static getTwoDistinctColours() {
        var firstColour = this.getRandomColour();
        var secondColour = this.getRandomColour();
        while (secondColour === firstColour) {
            secondColour = this.getRandomColour();
        }
        return [firstColour, secondColour];
    }

    /**
     * Get a Colour by it's name.
     *
     * @param name
     * @returns {Colour}
     */
    public static getByName(name: string) {
        var index: any;

        for (index in ColourFactory.colours) {
            if (ColourFactory.colours[index].getName().toLowerCase() === name.toLowerCase()) {
                return ColourFactory.colours[index];
            }
        }

        throw 'No Colour with the name "' + name + '" found.';
    }
}