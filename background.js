var contextID = -1;

// Global key variables
var previousKey = null;
var previousKeyCode = null;
var isCapsLockOn = false;

var ActiveKeyboardRules = Sm_KeyboardRules();

chrome.input.ime.onFocus.addListener(function (context) {
  contextID = context.contextID;
});

chrome.input.ime.onBlur.addListener(() => { contextID = -1; }); // Remove context ID on blur

chrome.input.ime.onKeyEvent.addListener(
  function (engineID, keyData) {
    handled = false;

    // Only care about keydown
    if (keyData.type !== 'keydown') {
      return false;
    }

    // Store state of caps lock
    isCapsLockOn = keyData.capsLock;
  
    // Only handle keys that are needed
    if (keyData.code in ActiveKeyboardRules.substitutions) {
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
