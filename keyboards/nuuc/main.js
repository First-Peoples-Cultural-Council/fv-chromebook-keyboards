/**
Note:
On ChromeBooks many RightAlt+Key combinations are reserved. Instead, use ShiftRight+Key.
To skip all substitutions (e.g. to type numbers normally) - activate caps lock (RightAlt + Search key)
**/

window.fvKeyboards['nuuc'] = function() {
    return {
        "caps_cancels_substitution": true,
        "allowed_backwards_combinations": {
            "\u0313": ["c", "č", "ƛ", "k", "m", "w", "t", "y", "p", "n"]
        },
        "forward_substitutions": {
            "KeyN": {
                "modifier": "ShiftRight",
                "substitution": "ŋ"
            },
            "KeyE": {
                "modifier": "ShiftRight",
                "substitution": "ə"
            },
            "KeyL": {
                "modifier": "ShiftRight",
                "substitution": "ɫ"
            },
            "KeyL": {
                "modifier": "ShiftRight",
                "substitution": "ɫ"
            },
        },
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
