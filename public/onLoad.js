const uploadContainer = document.querySelector('.upload');
if (uploadContainer) {
    const uploadOnLoad = uploadContainer.querySelector(".ImageUpload");
    const subButton = uploadContainer.querySelector(".submitButton");
    uploadOnLoad.addEventListener("change", () => {
        subButton.disabled = false
    });
}


const pdfContainer = document.querySelector('.createPdf');
if (pdfContainer) {
    const form = pdfContainer.querySelector('.pdfForm');
    const text = pdfContainer.querySelector('.text');
    const line = text.querySelectorAll('p');
    const pdfText = pdfContainer.querySelector('.pdfText');
    const button = form.querySelector('.button');
    button.addEventListener('click', () => {
        let text = [];
        let i = 0;

        line.forEach(line => {
            var StrippedString = line.innerHTML.replace(/(<([^>]+)>)/ig,"");
            text[i] = StrippedString.trim();
            i++;
        });
        let xhr = new XMLHttpRequest();
        xhr.open("POST", '/upload', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            text: text
        }));
    });
}

