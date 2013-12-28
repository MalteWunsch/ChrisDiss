/**
 * The Question class is for plain, immutable value objects. A Question contains three Colours: one which name is
 * displayed on the blood tube, one which hex code is used to colour the aforementioned name and a third one which name
 * is displayed on the tube box. A user has to answer whether the hex code colour has the name as displayed in the box.
 */
class Question {
    /**
     * Colour that is used for displaying the Colour name in this Question.
     */
    private colourForName: Colour;

    /**
     * Colour that is used for displaying the Colour hex code in this Question.
     */
    private colourForHex: Colour;

    /**
     * Colour of which it's name is displayed on the tube box.
     */
    private colourForBox: Colour;

    /**
     * Constructor. The Colour for the box is chosen at random among the passed Colours.
     *
     * @param colourForName Colour that is used for displaying the Colour name.
     * @param colourForHex Colour that is used for displaying the Colour hex code.
     */
    constructor(colourForName: Colour, colourForHex: Colour) {
        this.colourForName = colourForName;
        this.colourForHex = colourForHex;

        var headsOrTails = Math.floor(Math.random() * 2);
        this.colourForBox = (headsOrTails === 0) ? colourForHex : colourForName;
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
     * Get the Colour name for the tube box, e.g. 'red'.
     */
    public getBoxColourName() {
        return this.colourForBox.getName();
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