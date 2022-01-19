/**
Note:
On ChromeBooks many RightAlt+Key combinations are reserved. Instead, use ShiftRight+Key.
To skip all substitutions (e.g. to type numbers normally) - activate caps lock (RightAlt + Search key)
**/

window.fvKeyboards['ucwalmicwts'] = function() {
    return {
        "allowed_backwards_combinations": {
            "\u0313": ["p", "P", "t", "s", "k", "q", "z", "m", "n", "w", "y", "r", "g"],
            "\u0332": ["l", "s", "t"],
            "\u0301": ["a", "A", "e", "E"]
        },
        // The following are activated once CAPSLOCK is on (e.g. CAPSLOCK; ShiftRight + A)
        "uc_forward_substitutions": {
            "KeyA": {
                "modifier": "ShiftRight",
                "substitution": "\u00C1"
            }
       },
        // The following are direct substitutions (e.g. ShiftRight + E)
        "forward_substitutions": {
            "KeyL": {
                "modifier": "ShiftRight",
                "substitution": "ľ"
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
       // The following create combined characters when allowed (k + Semicolon)
       "substitutions": {
            "Semicolon": function() {
                return combineWithPreviousChar("\u0313");
            },
            "Backslash": function() {
                return combineWithPreviousChar("\u0332");
            },
            "Backquote": function() {
                return combineWithPreviousChar("\u0301");
            }
       }
    };
}
