document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['summary'], function(result) {
        const summaryElement = document.getElementById('summary');
        summaryElement.textContent = result.summary || 'No summary available.';
    });
});
