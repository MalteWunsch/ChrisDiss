/// <reference path="Colour.ts" />

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
     * @param colourForBox Colour of which the name is used as a label for the tube box.
     */
    constructor(colourForName: Colour, colourForHex: Colour, colourForBox: Colour) {
        var headsOrTails;

        this.colourForName = colourForName;
        this.colourForHex = colourForHex;
        this.colourForBox = colourForBox;
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
     * Gets the correct answer for this question, i.e. whether the Colour for the hex code is the same (caution: in
     * terms of identity, not equality) as the one used for the tube box.
     *
     * @returns {bool}
     */
    public getCorrectAnswer() {
        return this.colourForHex === this.colourForBox;
    }
}