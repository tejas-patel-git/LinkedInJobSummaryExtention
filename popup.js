document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['summary'], function(result) {
        const summaryElement = document.getElementById('summary');
        const yearOfExperienceRequiredElement = document.getElementById('yearOfExperience');
        summaryElement.textContent = result.summary || 'No summary available.';
        yearOfExperienceRequiredElement.textContent = result.Requriments || 'No summary available.';
    });
});
