/**
 * The Question class is for plain, immutable value objects.
 */
class Question {
    /**
     * Colour that is used for displaying the Colour name in this Question.
     */
    colourForName: Colour;

    /**
     * Colour that is used for displaying the Colour hex code in this Question.
     */
    colourForHex: Colour;

    /**
     * Constructor.
     *
     * @param colourForName Colour that is used for displaying the Colour name.
     * @param colourForHex Colour that is used for displaying the Colour hex code.
     */
    constructor(colourForName: Colour, colourForHex: Colour) {
        this.colourForName = colourForName;
        this.colourForHex = colourForHex;
    }

    /**
     * Get the Colour name to display in this Question, e.g. 'red'.
     */
    public getColourName() {
        return this.colourForName.getName();
    }

    /**
     * Get the Colour hex code to display in this Question, e.g. 'ff0000'.
     */
    public getColourHex() {
        return this.colourForHex.getHex();
    }

    /**
     * Returns whether this Question is a Stroop one (having different Colours for the name and the hex code) or a
     * regular one.
     * Caution: This distinction is based on Colour identity, not equality.
     *
     * @returns {bool}
     */
    public isStroop() {
        return (this.colourForName === this.colourForHex);
    }
}