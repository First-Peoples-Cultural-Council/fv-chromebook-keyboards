function Sm_KeyboardRules() {
    return {
        "allowed_backwards_combinations": {
            "\u0331": ["a", "g", "k"]
        },
        "substitutions": {
            "Semicolon": function() {
                return combineWithPreviousChar("\u0331");
            },
            "BracketLeft": function() {
                return handleCase("ü", "Ü");
            },
            "BracketRight": function() {
                return handleCase("ẅ", "Ẅ");
            },
            "Backslash": "?",
            "Slash": "\u0142"
        }
    };
}

function Sm_KeyboardMetadata() {
    return {
        "name": "",
        "id": "",
        "metadata": {
            "author": "",
            "link": "",
            "fv_link": ""
        }
    };
}

function Sm_KeyboardSettings() {
    return {
        "test": "test",
    };
}