function Smalgyax_KeyboardRules() {
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

function Smalgyax_KeyboardMetadata() {
    return {
        "name": "",
        "id": "smalgyax",
        "metadata": {
            "author": "First Peoples' Cultural Council",
            "link": "https://www.fpcc.ca/",
            "fv_link": ""
        }
    };
}

function Smalgyax_KeyboardSettings() {
    return {
        "test": "test",
    };
}