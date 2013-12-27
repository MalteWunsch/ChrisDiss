/**
 * The Colour class is for plain, immutable value objects.
 */
class Colour {
    /**
     * Name of the colour, e.g. 'red'.
     */
    name: string;

    /**
     * Hex code of the colour without a leading hash, e.g. 'ff0000'.
     */
    hex: string;

    /**
     * Constructor injecting all values.
     *
     * @param name of the colour, e.g. 'red'.
     * @param hex code of the colour without a leading hash, e.g. 'ff0000'.
     */
    constructor(name: string, hex: string) {
        this.name = name;
        this.hex = hex;
    }

    /**
     * Get the name of the colour, e.g. 'red'.
     */
    public getName() {
        return this.name;
    }

    /**
     * Get the hex code of the colour without a leading hash, e.g. 'ff0000'.
     */
    public getHex() {
        return this.hex;
    }
}
