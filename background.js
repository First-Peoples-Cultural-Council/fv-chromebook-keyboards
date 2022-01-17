var contextID = -1;

// Global key variables
var previousKey = null;
var previousKeyCode = null;
var isCapsLockOn = false;

var ActiveKeyboardRules = null;

// Test whether the character is uppercase (latin)
const isUpperCase = (string) => /^[A-Z]*$/.test(string)

window.fvKeyboards = [];

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.fvActiveKeyboard?.newValue) {
    setKeyboard(changes.fvActiveKeyboard?.newValue);
  }
});

chrome.input.ime.onFocus.addListener(function (context) {
    contextID = context.contextID;
    if (ActiveKeyboardRules === null) {
       chrome.storage.sync.get(['fvActiveKeyboard'], function(result) {
           setKeyboard(result.fvActiveKeyboard);
       }); 
    }
});

chrome.input.ime.onBlur.addListener(() => { contextID = -1; }); // Remove context ID on blur

chrome.input.ime.onKeyEvent.addListener(
  function (engineID, keyData) {
    handled = false;

    // Only care about keydown
    if (keyData.type !== 'keydown' || ActiveKeyboardRules == null) {
      return false;
    }

    // Store current state of caps lock
    isCapsLockOn = keyData.capsLock;

    if (isCapsLockOn &&
        hasRule("caps_cancels_substitution") && keyData.code.indexOf("Digit") == 0) {
        return false;
    }
      
    // Handle forward substitutions (modifier + char)
    if (hasRule("forward_substitutions") && 
        keyData.code in ActiveKeyboardRules.forward_substitutions) {
      let rule = ActiveKeyboardRules.forward_substitutions[keyData.code];

      if (previousKeyCode === rule.modifier) {

        let substitution = rule.substitution;

        if (isUpperCase(keyData.key) && hasRule("uppercase_forward_substitutions")) {
          substitution = substitution.toUpperCase();
        }

        chrome.input.ime.commitText({ "contextID": contextID, "text": substitution });
        handled = true;
      }
    }

    // Handle regular substitutions (char + modifier)
    else if (hasRule("substitutions") && 
             keyData.code in ActiveKeyboardRules.substitutions) {
      if (hasRule("skip_substitutions_key") && 
          ActiveKeyboardRules.skip_substitutions_key === previousKeyCode) {
            // Allow for skipping substitutions 
            return false;
      }

      let result = ActiveKeyboardRules.substitutions[keyData.code];

      if (typeof result === 'function') {
        result = result.call(this);
      }
        
      if (result === null) {
        handled = false;
      } else {
        chrome.input.ime.commitText({ "contextID": contextID, "text": result });
        handled = true;
      }
    }

    // Store previous key and key code
    previousKey = keyData.key;
    previousKeyCode = keyData.code;

    return handled;
  }
);

// Core methods

// Combine with previous character, if allowed
function combineWithPreviousChar(combinedChar) {
  if (hasRuleForKey("allowed_backwards_combinations", combinedChar) && 
    combinedChar in ActiveKeyboardRules.allowed_backwards_combinations) {
    // If rules are defined for combining characters and for this character
    let restrictions = ActiveKeyboardRules.allowed_backwards_combinations[combinedChar];

    if (restrictions.indexOf(previousKey) != -1) {
      return combinedChar;
    }
  }

  return null;
}

// Handle case
function handleCase(lowercaseKey, uppercaseKey) {
  if (isCapsLockOn || previousKeyCode === "ShiftRight" || previousKeyCode === "ShiftLeft") {
    return uppercaseKey;
  }
  
  return lowercaseKey;
}

// Check if rule exists
function hasRule(ruleName) {
    return ruleName in ActiveKeyboardRules
}

// Check if rule exists for key
function hasRuleForKey(ruleName, ruleKey) {
    return (
        hasRule(ruleName) &&
        ruleKey in ActiveKeyboardRules[ruleName]
    );
}

// Set active keyboard
function setKeyboard(keyboardId) {
    let selectedKeyboard = window.fvKeyboards[keyboardId];
    if (typeof selectedKeyboard === 'function') {
        ActiveKeyboardRules = selectedKeyboard();
    }
}
