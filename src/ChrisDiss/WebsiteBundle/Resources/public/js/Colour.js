var Colour = (function () {
    function Colour(name, hex) {
        this.name = name;
        this.hex = hex;
    }
    Colour.prototype.getName = function () {
        return this.name;
    };
    Colour.prototype.getHex = function () {
        return this.hex;
    };
    return Colour;
})();
//@ sourceMappingURL=Colour.js.map
