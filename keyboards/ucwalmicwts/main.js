/**
Note:
On ChromeBooks many RightAlt+Key combinations are reserved. Instead, use ShiftRight+Key.
To skip all substitutions (e.g. to type numbers normally) - activate caps lock (RightAlt + Search key)
**/

window.fvKeyboards['ucwalmicwts'] = function() {
    return {
        "allowed_backwards_combinations": {
            "\u0313": ["p", "P", "t", "s", "k", "q", "z", "m", "n", "w", "y", "r", "g"],
            "\u0332": ["l", "s", "t"]
        },
        "forward_substitutions": {
            "KeyL": {
                "modifier": "ShiftRight",
                "substitution": "ľ"
            },
            "KeyA": {
                "modifier": "ShiftRight",
                "substitution": "á"

            },
            "KeyE": {
                "modifier": "ShiftRight",
                "substitution": "é"

            },
            "KeyI": {
                "modifier": "ShiftRight",
                "substitution": "í"

            },
            "KeyO": {
                "modifier": "ShiftRight",
                "substitution": "ó"
            },
            "KeyU": {
                "modifier": "ShiftRight",
                "substitution": "ú"

            },
            "KeyV": {
                "modifier": "ShiftRight",
                "substitution": "v́"
    
            },

       },    
        "substitutions": {
            "Semicolon": function() {
                return combineWithPreviousChar("\u0313");
            },
            "Backslash": function() {
                return combineWithPreviousChar("\u0332");
            }
        }
    };
}
