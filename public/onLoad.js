const uploadContainer = document.querySelector('.upload');
if (uploadContainer) {
    const uploadOnLoad = uploadContainer.querySelector(".ImageUpload");
    const subButton = uploadContainer.querySelector(".submitButton");
    const loadingBar = uploadContainer.querySelector('.loading-bar');
    const header = uploadContainer.querySelector('h1');
    uploadOnLoad.addEventListener("change", () => {
        subButton.disabled = false;
    });
    subButton.addEventListener('click', () => {
        header.innerHTML = 'Trying to read your handwriting';
        loadingBar.classList.add('active');
    })
}


const pdfContainer = document.querySelector('.createPdf');
if (pdfContainer) {
    const form = pdfContainer.querySelector('.pdfForm');
    const text = pdfContainer.querySelector('.text');
    const line = text.querySelectorAll('p');
    const pdfText = pdfContainer.querySelector('.pdfText');
    const button = pdfContainer.querySelector('.button');
    button.addEventListener('click', () => {
        let text = [];
        let i = 0;

        line.forEach(line => {
            var StrippedString = line.innerHTML.replace(/(<([^>]+)>)/ig,"");
            text[i] = StrippedString.trim();
            i++;
        });
        let copy = text.join("\n");
        copyToClipboard(copy);
    });
}

function copyToClipboard(text) {

    if (window.clipboardData && window.clipboardData.setData) {
        // IE specific code path to prevent textarea being shown while dialog is visible.

        return clipboardData.setData("Text", text);

    }

    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy"); // Security exception may be thrown by some browsers.
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

