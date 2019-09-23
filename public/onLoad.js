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
    const pdfText = pdfContainer.querySelector('.pdfText');
    const button = form.querySelector('.button');
    button.addEventListener('click', () => {
        pdfText.innerHTML = text.innerHTML;
    });
}

