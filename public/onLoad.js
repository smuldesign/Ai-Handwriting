const uploadOnLoad = document.getElementById("ImageUpload");
const subButton = document.getElementById("submitButton");

function changeOnLoad() {
    subButton.disabled = false
}

uploadOnLoad.addEventListener("change", changeOnLoad);