/**
* The ColourFactory class creates Colour objects.
*/
var ColourFactory = (function () {
    function ColourFactory() {
    }
    /**
    * Get a random Colour.
    *
    * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
    * @returns {Colour}
    */
    ColourFactory.getRandomColour = function (colourSetForDryRun) {
        var index, colourSet = (colourSetForDryRun === true) ? this.dryRunColours : this.colours;

        index = Math.floor(Math.random() * colourSet.length);
        return colourSet[index];
    };

    /**
    * Get two distinct Colours.
    *
    * @param colourSetForDryRun whether the question should be producted with the reduced colour set for the dry run.
    * @returns {Colour[]}
    */
    ColourFactory.getTwoDistinctColours = function (colourSetForDryRun) {
        var firstColour = this.getRandomColour(colourSetForDryRun);
        var secondColour = this.getRandomColour(colourSetForDryRun);
        while (secondColour === firstColour) {
            secondColour = this.getRandomColour(colourSetForDryRun);
        }
        return [firstColour, secondColour];
    };

    /**
    * Get a Colour by it's name.
    *
    * @param name
    * @returns {Colour}
    */
    ColourFactory.getByName = function (name) {
        var index;

        for (index in ColourFactory.colours) {
            if (ColourFactory.colours[index].getName().toLowerCase() === name.toLowerCase()) {
                return ColourFactory.colours[index];
            }
        }

        throw 'No Colour with the name "' + name + '" found.';
    };
    ColourFactory.colours = [
        new Colour('ROT', 'ff0000'),
        new Colour('GRÜN', '009900'),
        new Colour('BLAU', '0000ff'),
        new Colour('PINK', 'ff00ff'),
        new Colour("BRAUN", '8B4C39')
    ];

    ColourFactory.dryRunColours = [
        new Colour('ROT', 'ff0000'),
        new Colour('BLAU', '0000ff')
    ];
    return ColourFactory;
})();
//# sourceMappingURL=ColourFactory.js.map
