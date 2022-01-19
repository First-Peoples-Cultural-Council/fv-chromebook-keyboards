/**
Note:
On ChromeBooks many RightAlt+Key combinations are reserved. Instead, use ShiftRight+Key.
To skip all substitutions (e.g. to type numbers normally) - activate caps lock (RightAlt + Search key)
**/

window.fvKeyboards['ucwalmicwts'] = function() {
    return {
        "allowed_backwards_combinations": {
            "\u0313": ["p", "P", "t", "T", "s", "S", "k", "K", "q", "Q", "z", "Z", "m", "M",   "n", "N", "w", "W", "y", "Y", "r", "R", "g", "G"],
            "\u0332": ["l", "L", "s", "S", "t", "T"]
        },
        // The following are activated once CAPSLOCK is on (e.g. CAPSLOCK; ShiftRight + A)
        "uc_forward_substitutions": {
            "KeyA": {
                "modifier": "ShiftRight",
                "substitution": "\u00C1"
            },
             "KeyE": {
                "modifier": "ShiftRight",
                "substitution": "\u00c9"              
            },
             "KeyL": {
                "modifier": "ShiftRight",
                "substitution": "\u013d"
            },
             "KeyI": {
                "modifier": "ShiftRight",
                "substitution": "\u00cd"
            },
             "KeyO": {
                "modifier": "ShiftRight",
                "substitution": "\u00d3"
            },
             "KeyU": {
                "modifier": "ShiftRight",
                "substitution": "\u00da"
            },
             "KeyV": {
                "modifier": "ShiftRight",
                "substitution": "V́"
            }
       },
        // The following are direct substitutions (e.g. ShiftRight + E)
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
       // The following create combined characters when allowed (k + Semicolon)
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
