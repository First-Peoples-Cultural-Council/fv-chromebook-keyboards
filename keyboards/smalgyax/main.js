window.fvKeyboards['smalgyax'] = function() {
    return {
        "allowed_backwards_combinations": {
            "\u0331": ["a", "g", "k"]
        },
        "substitutions": {
            "Semicolon": function() {
                return combineWithPreviousChar("\u0331");
            },
            "BracketLeft": function() {
                return handleCase("ü", "Ü");
            },
            "BracketRight": function() {
                return handleCase("ẅ", "Ẅ");
            },
            "Backslash": "?",
            "Slash": "\u0142"
        }
    };
}
