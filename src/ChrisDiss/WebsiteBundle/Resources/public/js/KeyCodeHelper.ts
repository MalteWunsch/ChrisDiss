/**
 * Helps juggling with key codes.
 */
class KeyCodeHelper {
    /**
     * If the keyCode corresponds to an upper case ASCII letter, return the corresponding lower case letter's key code.
     * Otherwise just return the key code.
     *
     * @param keyCode number
     * @returns {number}
     */
    public static shiftKeyCodeToLowercasedLetterIfApplicable = function (keyCode: number) {
        var lowerCasedKeyCode = keyCode;
        if (keyCode >= 65 && keyCode <= 90) {
            lowerCasedKeyCode += 32;
        }
        return lowerCasedKeyCode;
    };
}