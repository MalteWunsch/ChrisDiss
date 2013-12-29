var KeyCodeHelper = (function () {
    function KeyCodeHelper() { }
    KeyCodeHelper.shiftKeyCodeToLowercasedLetterIfApplicable = function (keyCode) {
        var lowerCasedKeyCode = keyCode;
        if(keyCode >= 65 && keyCode <= 90) {
            lowerCasedKeyCode += 32;
        }
        return lowerCasedKeyCode;
    };
    return KeyCodeHelper;
})();
//@ sourceMappingURL=KeyCodeHelper.js.map
