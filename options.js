var fvActiveKeyboard = null;

chrome.storage.sync.get(['fvActiveKeyboard'], function(result) {
    fvActiveKeyboard = result.fvActiveKeyboard;
});

// Saves options to chrome.storage
function saveOptions() {
    var keyboardsSelectList = document.getElementById('keyboards');
    var selectedKeyboard = keyboardsSelectList.value;
    var selectedKeyboardLabel = keyboardsSelectList.options[keyboardsSelectList.selectedIndex].innerHTML;

    for (const kbi of document.getElementsByClassName("keyboard-instructions")) {
        kbi.style.display = 'none';
    }
    
    if (selectedKeyboard === "null") {
        chrome.storage.sync.remove("fvActiveKeyboard");
        document.getElementById('selected-keyboard-container').style.display = 'none';
    }
    
    chrome.storage.sync.set({
        fvActiveKeyboard: selectedKeyboard
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.style.display = 'block'
        
        if (selectedKeyboard != "null") {
            status.innerHTML = 'Active language set to <strong>' + getActiveKeyboardLabel() + '</strong>.';
        } else {
            status.innerHTML = 'Active language reset.';
        }
        
        setTimeout(function () {
            status.textContent = '';
            status.style.display = 'none'
        }, 3500);
        
        
        showInstructions(selectedKeyboard);
    });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function initOptions() {

    let keyboardsSelect = document.getElementById('keyboards');
    let manifest = chrome.runtime.getManifest();

    // Load keyboard metadata and add as options
    for (index in manifest.background.scripts) {
        let script = manifest.background.scripts[index];
        if (script.startsWith("keyboards/")) {
            fetch(script.replace("main.js", "metadata.json"))
            .then(response => {
                response.json().then(metadata => {
                    keyboardsSelect.options[keyboardsSelect.options.length] = 
                        new Option(metadata.name, metadata.id, false, (fvActiveKeyboard === metadata.id));
                    
                    // Set instructions for active keyboard
                    showInstructions(fvActiveKeyboard);
                });
                

            });
        }
    }    
}

function showInstructions(activeKeyboard) {
    if (activeKeyboard != null && activeKeyboard != "null") {
        document.getElementById('selected-keyboard-container').style.display = 'block';
        document.getElementById('selectedKeyboard').innerText = getActiveKeyboardLabel();

        // Set instructions if available
        var activeKeyboardInstructionsElement = document.getElementById(activeKeyboard + "-instructions");
        if (activeKeyboardInstructionsElement != null) {
            activeKeyboardInstructionsElement.style.display = 'block';
        }
    }
}

function getActiveKeyboardLabel() {
    var keyboardsSelectList = document.getElementById('keyboards');
    var selectedKeyboard = keyboardsSelectList.value;
    var selectedKeyboardLabel = keyboardsSelectList.options[keyboardsSelectList.selectedIndex].innerHTML;

    return selectedKeyboardLabel;
}

document.addEventListener('DOMContentLoaded', initOptions);

document.getElementById('save').addEventListener('click', saveOptions);