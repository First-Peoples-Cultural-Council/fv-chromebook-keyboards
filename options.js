
// Saves options to chrome.storage
function saveOptions() {
    var selectedKeyboard = document.getElementById('keyboards').value;

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

    // Load keyboard metadata
    for (script in manifest.background.scripts) {
        if (script.startsWith("keyboards/")) {
            fetch(script.replace("main.js", "metadata.json"))
            .then(response => {
                let metadata = response.json();
                // Add as option
                keyboardsSelect.options[keyboardsSelect.options.length] = new Option(metadata.name, metadata.id);
            });

            // Load keyboard json
            // var req = new XMLHttpRequest();
            // req.onload = handleResponse;
            // req.onerror = handleError;
            // req.open('GET', script.replace("main.js", "metadata.json"), true);
            // req.send(null);
        }
    }

    chrome.storage.sync.get(['fvActiveKeyboard'], function(result) {
        document.getElementById('keyboards').value = result.fvActiveKeyboard;
    });
}

document.addEventListener('DOMContentLoaded', initOptions);

document.getElementById('save').addEventListener('click', saveOptions);