var fvActiveKeyboard = null;

chrome.storage.sync.get(['fvActiveKeyboard'], function(result) {
    fvActiveKeyboard = result.fvActiveKeyboard;
});

// Saves options to chrome.storage
function saveOptions() {
    var selectedKeyboard = document.getElementById('keyboards').value;

    if (selectedKeyboard === "null") {
        chrome.storage.sync.remove("fvActiveKeyboard");
    }
    
    chrome.storage.sync.set({
        fvActiveKeyboard: selectedKeyboard
    }, function () {
        // Update status to let user know options were saved.
        var status = document.getElementById('status');
        status.textContent = 'Options saved.';
        setTimeout(function () {
            status.textContent = '';
        }, 750);
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
                });
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', initOptions);

document.getElementById('save').addEventListener('click', saveOptions);