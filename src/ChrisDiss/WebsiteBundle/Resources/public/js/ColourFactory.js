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
    ColourFactory.getRandomColour = function getRandomColour() {
        var index = Math.floor(Math.random() * this.colours.length);
        return this.colours[index];
    }
    ColourFactory.getTwoDistinctColours = function getTwoDistinctColours() {
        var firstColour = this.getRandomColour();
        var secondColour = this.getRandomColour();
        while(secondColour === firstColour) {
            secondColour = this.getRandomColour();
        }
        return [
            firstColour, 
            secondColour
        ];
    }
    return ColourFactory;
})();
//@ sourceMappingURL=ColourFactory.js.map
