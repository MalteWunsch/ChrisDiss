/**
* The ColourFactory class creates Colour objects.
*/
var ColourFactory = (function () {
    function ColourFactory() {
    }
    /**
    * Get a random Colour.
    *
    * @returns {Colour}
    */
    ColourFactory.getRandomColour = function () {
        var index = Math.floor(Math.random() * this.colours.length);
        return this.colours[index];
    };

    /**
    * Get a random colour, but exclude the excludedColour.
    *
    * @param excludedColour
    * @returns {Colour}
    */
    ColourFactory.getRandomColourButNot = function (excludedColours) {
        var randomColour = ColourFactory.getRandomColour();
        while ($.inArray(randomColour, excludedColours) !== -1) {
            randomColour = ColourFactory.getRandomColour();
        }
        return randomColour;
    };

    /**
    * Get two distinct Colours.
    *
    * @returns {Colour[]}
    */
    ColourFactory.getTwoDistinctColours = function () {
        var firstColour = this.getRandomColour();
        var secondColour = this.getRandomColour();
        while (secondColour === firstColour) {
            secondColour = this.getRandomColour();
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
    return ColourFactory;
})();
//# sourceMappingURL=ColourFactory.js.map
