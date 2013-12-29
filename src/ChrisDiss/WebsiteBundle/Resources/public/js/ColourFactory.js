var ColourFactory = (function () {
    function ColourFactory() { }
    ColourFactory.colours = [
        new Colour('rot', 'ff0000'), 
        new Colour('grün', '00ff00'), 
        new Colour('blau', '0000ff'), 
        new Colour('gelb', 'ffff00'), 
        new Colour('pink', 'ff00ff'), 
        new Colour('türkis', '00ffff')
    ];
    ColourFactory.dryRunColours = [
        new Colour('rot', 'ff0000'), 
        new Colour('blau', '0000ff')
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
