window.fvKeyboards['nuuc'] = function() {
    return {
        "allowed_backwards_combinations": {
            "\u0313": ["c", "t", "y", "p", "n"]
        },
        "forward_substitutions": {
            "KeyN": {
                "modifier": "RightAlt",
                "substitution": "ŋ"
            },
            "KeyE": {
                "modifier": "RightAlt",
                "substitution": "ə"
            },
            "KeyL": {
                "modifier": "RightAlt",
                "substitution": "ɫ"
            },
            "KeyL": {
                "modifier": "RightAlt",
                "substitution": "ɫ"
            },
        },
        "skip_substitutions_key": "RightAlt",
        "substitutions": {
            "Digit1": "\u0302",
            "Digit2": "\u02B7",
            "Digit3": "š",
            "Digit4": "č",
            "Digit5": "ƛ",
            "Digit6": "x̣",
            "Digit7": "ḥ",
            "Digit8": "ł",
            "Digit9": "ʔ",
            "Digit0": "ʕ",
            "Quote": function() {
                return combineWithPreviousChar("\u0313");
            },
        }
    };
}

function Nuuc_KeyboardRules() {

}
