const preview = document.getElementById("preview");
const styles = document.getElementById("styles");
const copyButton = document.getElementById("copy-styles");
const ranges = document.querySelectorAll(".settings input");
const selectElement = document.getElementById("border-style");

selectElement.addEventListener("change", generatorStyles)
ranges.forEach((slider) => {
    slider.addEventListener("input", generatorStyles);
});

function generatorStyles() {
    const height = document.getElementById("b-height").value;
    const width = document.getElementById("b-width").value;
    const xShadow = document.getElementById("x-shadow").value;
    const yShadow = document.getElementById("y-shadow").value;
    const blurRadius = document.getElementById("blur-r").value;
    const spreadRadius = document.getElementById("spread-r").value;
    const borderThickness = document.getElementById('border-thick').value;
    const shadowColor = document.getElementById("shadow-color").value;
    const bcolor = document.getElementById("color").value;
    const borColor = document.getElementById("border-color").value;
    const colorOpacity = document.getElementById("color-opacity").value;
    const borderOpacity = document.getElementById("border-opacity").value;
    const shadowOpacity = document.getElementById("shadow-opacity").value;
    const shadowInset = document.getElementById("inset-shadow").checked;
    const borderRadius = document.getElementById("border-r").value;
    const selectedIndex = selectElement.selectedIndex;
    const selectedOption = selectElement.options[selectedIndex];
    const selectedValue = selectedOption.value;


    const boxShadow = `${shadowInset ? "inset " : ""}${xShadow}px ${yShadow}px ${blurRadius}px ${spreadRadius}px ${hexToRgba(
        shadowColor,
        shadowOpacity
    )}`;

    boxColor = `${hexToRgba(bcolor,colorOpacity)}`;
    borderColor = `${borderThickness}px ${selectedValue} ${hexToRgba(borColor,borderOpacity)}`;

    preview.style.height = `${height}px`;
    preview.style.width = `${width}px`;
    preview.style.boxShadow = boxShadow;
    preview.style.borderRadius = `${borderRadius}px`;
    preview.style.backgroundColor = boxColor;
    preview.style.border = borderColor;
    styles.textContent = `height:${height}px;\nwidth:${width}px;\nbackground-color:${boxColor};\nborder:${borderThickness}px ${selectedValue} ${hexToRgba(borColor,borderOpacity)};\nborder-radius: ${borderRadius}px;\nbox-shadow: ${boxShadow};`;

    selectElement.addEventListener("change", (event) => {
        const selectedValue = event.target.value;
        preview.style.borderStyle = selectedValue;
    });
}

function hexToRgba(hex, opacity) {
    const r = parseInt(hex.substr(1, 2), 16);
    const g = parseInt(hex.substr(3, 2), 16);
    const b = parseInt(hex.substr(5, 2), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

function copyStyles() {
    styles.select();
    document.execCommand("copy");
    copyButton.innerText = "Copied!";
    setTimeout(() => {
        copyButton.innerText = "Copy Styles";
    }, 3000);
}

generatorStyles();