window.addEventListener('load', () => {
    // Initialize the MutationObserver
    const observer = new MutationObserver(mutations => {
        for (let mutation of mutations) {
            if (mutation.type === 'childList' || mutation.type === 'subtree') {
                // When the job details are updated, get the new job description
                updateJobSummary();
                break;
            }
        }
    });

    // Target the job details container
    const jobContainer = document.querySelector("#job-details");

    if (jobContainer) {
        observer.observe(jobContainer, { childList: true, subtree: true });
    }

    // Initial summary update
    updateJobSummary();
});

function updateJobSummary() {
    const jobDescriptionElement = document.querySelector("#job-details > div");
    if (jobDescriptionElement) {
        const jobDescription = jobDescriptionElement.innerText;
        const summary = summarizeRequirements(jobDescription);
        chrome.storage.local.set({ summary: summary });
    }
}

/**
 * 
 * @param {string} text 
 * @returns {string}
 */
function summarizeRequirements(text) {
    // Simple keyword-based extraction (could be expanded to use NLP)
    const lines = text.split('\n');
    const keywords = ['required', 'must', 'experience', 'skills', 'qualification'];
    const yearOfExperienceKeywords = ['years of experience', 'year of experience', 'experience']

    const summary = lines.filter(line => {
        return keywords.some(keyword => line.toLowerCase().includes(keyword.toLowerCase()));
    });

    const yearOfExperienceRequired = extractRequiredYearOfExp(summary);
    console.log(yearOfExperienceRequired);
    return JSON.stringify({
        "summary": summary.join('\n'),
        "Requriments": { 'YoE': yearOfExperienceRequired ? yearOfExperienceRequired[0] : "Not Mentioned" }
    });
}

/**
 * 
 * @param {string[]} lines
 * @returns {RegExpMatchArray | null}
 */
function extractRequiredYearOfExp(lines) {
    const regExp = /\b(\d+)\s*(?:\+|-)?\s*(\d+)?\s*years?\s*(?:of\s+)?(?:relevant\s+)?experience\b/i;
    return lines.join().match(regExp);
}