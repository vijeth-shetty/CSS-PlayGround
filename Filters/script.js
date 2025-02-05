const image = document.getElementById("uploaded-image");
const ranges = document.querySelectorAll(".settings input");
const styles = document.getElementById("styles");
const copyButton = document.getElementById("copy-styles");

ranges.forEach((slider) => {
    slider.addEventListener("input", updateFilters);
});

function loadImage(event) {
    const file = event.target.files[0];
    const messageElement = document.getElementById('message'); // Get the message element
    if (file) {
        image.src = URL.createObjectURL(file);
        image.style.display = 'block';
        messageElement.style.display = 'none'; // Hide the message when an image is uploaded
        updateFilters();
    } else {
        messageElement.style.display = 'block'; // Show the message if no file is selected
    }
}

function updateFilters() {
    const blur = document.getElementById("blur").value + "px";
    const brightness = document.getElementById("brightness").value + "%";
    const contrast = document.getElementById("contrast").value + "%";
    const grayscale = document.getElementById("grayscale").value + "%";
    const hueRotate = document.getElementById("hue-rotate").value + "deg";
    const invert = document.getElementById("invert").value + "%";
    const saturate = document.getElementById("saturate").value + "%";
    const sepia = document.getElementById("sepia").value + "%";
    const opacity = document.getElementById('opacity').value + "%";

    const filterString = `blur(${blur}) brightness(${brightness}) opacity(${opacity}) contrast(${contrast}) grayscale(${grayscale}) hue-rotate(${hueRotate}) invert(${invert}) saturate(${saturate}) sepia(${sepia})`;

    image.style.filter = filterString;

    styles.textContent = `filter: blur(${blur});\n\tbrightness(${brightness});\n\topacity(${opacity});\n\tcontrast(${contrast});\n\tgrayscale(${grayscale});\n\thue-rotate(${hueRotate});\n\tinvert(${invert});\n\tsaturate(${saturate});\n\tsepia(${sepia});`;
}

function copyStyles() {
    styles.select();
    document.execCommand("copy");
    copyButton.innerText = "Copied!";
    setTimeout(() => {
        copyButton.innerText = "Copy!";
    }, 3000);
}

function downloadImage() {
    const messageElement = document.getElementById('message');

    if (!image.src || image.src === "") {
        messageElement.style.display = 'block'; // Show the message
        messageElement.textContent = "Please upload an image before downloading.";
        return; // Exit the function if no image is uploaded
    } else {
        messageElement.style.display = 'none'; // Hide the message if an image is uploaded
    }

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    image.onload = function() {
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;

        ctx.filter = image.style.filter;
        ctx.drawImage(image, 0, 0);

        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'edited-image.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (image.complete) {
        image.onload();
    }
}

function resetFilters() {
    document.getElementById("blur").value = 0;
    document.getElementById("brightness").value = 100;
    document.getElementById("contrast").value = 100;
    document.getElementById("grayscale").value = 0;
    document.getElementById("hue-rotate").value = 0;
    document.getElementById("saturate").value = 100;
    document.getElementById("sepia").value = 0;
    document.getElementById("opacity").value = 100;
    document.getElementById("invert").value = 0;

    updateFilters();
}

// Initialize filters
updateFilters();