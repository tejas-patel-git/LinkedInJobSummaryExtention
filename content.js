// Wait for the page to load and then scrape the job requirements
// if (document.readyState !== 'loading') {
//     console.log('document is already ready, just execute code here');
//     DoJob();
// }
// else {
//     document.addEventListener('DOMContentLoaded', DoJob);
// }
window.addEventListener('load', () => {
    console.log("IN EXTENSION");
    // const jobDescriptionElement = document.getElementById('job-details'); // LinkedIn's job description element
    const jobDescriptionElement = document.querySelector("#job-details > div");
    console.log("Check Element");
    console.log(jobDescriptionElement ? jobDescriptionElement : "NOT FOUND");

    // const jobDescription = extractText(jobDescriptionElement);
    const jobDescription = jobDescriptionElement.innerText;
    console.log(jobDescription);
    // chrome.runtime.sendMessage({ action: 'summarize', text: jobDescription });
    const summary = summarizeRequirements(jobDescription);
    console.log("Summaryyyy");
    console.log(summary);
    chrome.storage.local.set({ summary: summary });
});

function DoJob() {
    document.addEventListener('DOMContentLoaded', () => {
        console.log("IN EXTENSION");
        // const jobDescriptionElement = document.getElementById('job-details'); // LinkedIn's job description element
        const jobDescriptionElement = document.querySelector("#job-details > div");
        console.log("Check Element");
        console.log(jobDescriptionElement ? jobDescriptionElement : "NOT FOUND");

        // const jobDescription = extractText(jobDescriptionElement);
        const jobDescription = jobDescriptionElement.innerText;
        console.log(jobDescription);
        // chrome.runtime.sendMessage({ action: 'summarize', text: jobDescription });
        const summary = summarizeRequirements(jobDescription);
        console.log("Summaryyyy");
        console.log(summary);
        chrome.storage.local.set({ summary: summary });
    });
    // setTimeout(() => {
    //     console.log("IN EXTENSION");
    //     // const jobDescriptionElement = document.getElementById('job-details'); // LinkedIn's job description element
    //     const jobDescriptionElement = document.querySelector("#job-details > div");
    //     console.log("Check Element");
    //     console.log(jobDescriptionElement ? jobDescriptionElement : "NOT FOUND");

    //     // const jobDescription = extractText(jobDescriptionElement);
    //     const jobDescription = jobDescriptionElement.innerText;
    //     console.log(jobDescription);
    //     // chrome.runtime.sendMessage({ action: 'summarize', text: jobDescription });
    //     const summary = summarizeRequirements(jobDescription);
    //     console.log("Summaryyyy");
    //     console.log(summary);
    //     chrome.storage.local.set({ summary: summary });
    // }, 5000);

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
    const summary = lines.filter(line => {
        return keywords.some(keyword => line.toLowerCase().includes(keyword));
    });
    return summary.join('\n');
}

/**
 * Recursively extracts and concatenates text from an HTML element and its child nodes.
 * @param {Element} element - The HTML element to extract text from.
 * @returns {string} The extracted text.
 */
function extractText(element) {
    let text = '';

    // Traverse child nodes
    element.childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
            text += node.textContent.trim() + ' ';
            console.log(text);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            text += extractText(node);
        }
    }); document.querySelector("#job-details > div")

    return text;
}
