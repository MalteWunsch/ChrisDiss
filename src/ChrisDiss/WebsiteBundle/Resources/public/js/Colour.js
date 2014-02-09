/**
* The Colour class is for plain, immutable value objects.
*/
var Colour = (function () {
    /**
    * Constructor injecting all values.
    *
    * @param name of the colour, e.g. 'red'.
    * @param hex code of the colour without a leading hash, e.g. 'ff0000'.
    */
    function Colour(name, hex) {
        this.name = name;
        this.hex = hex;
    }
    /**
    * Get the name of the colour, e.g. 'red'.
    */
    Colour.prototype.getName = function () {
        return this.name;
    };

    /**
    * Get the hex code of the colour without a leading hash, e.g. 'ff0000'.
    */
    Colour.prototype.getHex = function () {
        return this.hex;
    };
    return Colour;
})();
//# sourceMappingURL=Colour.js.map
