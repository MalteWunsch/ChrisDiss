var ColourFactory = (function () {
    function ColourFactory() { }
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
    ColourFactory.getRandomColour = function getRandomColour(colourSetForDryRun) {
        var index;
        var colourSet = (colourSetForDryRun === true) ? this.dryRunColours : this.colours;

        index = Math.floor(Math.random() * colourSet.length);
        return colourSet[index];
    }
    ColourFactory.getTwoDistinctColours = function getTwoDistinctColours(colourSetForDryRun) {
        var firstColour = this.getRandomColour(colourSetForDryRun);
        var secondColour = this.getRandomColour(colourSetForDryRun);
        while(secondColour === firstColour) {
            secondColour = this.getRandomColour(colourSetForDryRun);
        }
        return [
            firstColour, 
            secondColour
        ];
    }
    return ColourFactory;
})();
//@ sourceMappingURL=ColourFactory.js.map
