// Get all elements
const textInput = document.getElementById('text-input');
const previewText = document.getElementById('preview-text');
const generatedCode = document.getElementById('generated-code');

// Control elements
const controls = {
    fontFamily: document.getElementById('font-family'),
    fontSize: document.getElementById('font-size'),
    fontWeight: document.getElementById('font-weight'),
    fontStyle: document.getElementById('font-style'),
    fontVariant: document.getElementById('font-variant'),
    lineHeight: document.getElementById('line-height'),
    textColor: document.getElementById('text-color'),
    textAlign: document.getElementById('text-align'),
    textDecoration: document.getElementById('text-decoration'),
    letterSpacing: document.getElementById('letter-spacing'),
    wordSpacing: document.getElementById('word-spacing'),
    textIndent: document.getElementById('text-indent'),
    textTransform: document.getElementById('text-transform'),
    shadowX: document.getElementById('shadow-x'),
    shadowY: document.getElementById('shadow-y'),
    shadowBlur: document.getElementById('shadow-blur'),
    shadowColor: document.getElementById('shadow-color')
};

// Event Listeners
textInput.addEventListener('input', updatePreviewText);

// Font Controls
controls.fontFamily.addEventListener('change', updateStyles);
controls.fontSize.addEventListener('input', updateStyles);
controls.fontWeight.addEventListener('change', updateStyles);
controls.fontStyle.addEventListener('change', updateStyles);
controls.fontVariant.addEventListener('change', updateStyles);

// Text Formatting
controls.lineHeight.addEventListener('input', updateStyles);
controls.textColor.addEventListener('input', updateStyles);
controls.textAlign.addEventListener('change', updateStyles);
controls.textDecoration.addEventListener('change', updateStyles);

// Spacing Controls
controls.letterSpacing.addEventListener('input', updateStyles);
controls.wordSpacing.addEventListener('input', updateStyles);
controls.textIndent.addEventListener('input', updateStyles);
controls.textTransform.addEventListener('change', updateStyles);

// Shadow Controls
controls.shadowX.addEventListener('input', updateShadow);
controls.shadowY.addEventListener('input', updateShadow);
controls.shadowBlur.addEventListener('input', updateShadow);
controls.shadowColor.addEventListener('input', updateShadow);

// Update functions
function updatePreviewText() {
    previewText.textContent = textInput.value;
    updateGeneratedCode();
}

function updateStyles() {
    // Font Styles
    previewText.style.fontFamily = controls.fontFamily.value;
    previewText.style.fontSize = controls.fontSize.value + 'px';
    previewText.style.fontWeight = controls.fontWeight.value;
    previewText.style.fontStyle = controls.fontStyle.value;
    previewText.style.fontVariant = controls.fontVariant.value;

    // Text Formatting
    previewText.style.lineHeight = controls.lineHeight.value;
    previewText.style.color = controls.textColor.value;
    previewText.style.textAlign = controls.textAlign.value;
    previewText.style.textDecoration = controls.textDecoration.value;

    // Spacing
    previewText.style.letterSpacing = controls.letterSpacing.value + 'px';
    previewText.style.wordSpacing = controls.wordSpacing.value + 'px';
    previewText.style.textIndent = controls.textIndent.value + 'px';
    previewText.style.textTransform = controls.textTransform.value;

    // Update value displays
    document.getElementById('font-size-value').textContent = controls.fontSize.value + 'px';
    document.getElementById('line-height-value').textContent = controls.lineHeight.value;
    document.getElementById('letter-spacing-value').textContent = controls.letterSpacing.value + 'px';
    document.getElementById('word-spacing-value').textContent = controls.wordSpacing.value + 'px';
    document.getElementById('text-indent-value').textContent = controls.textIndent.value + 'px';

    updateGeneratedCode();
}

function updateShadow() {
    previewText.style.textShadow =
        `${controls.shadowX.value}px ` +
        `${controls.shadowY.value}px ` +
        `${controls.shadowBlur.value}px ` +
        controls.shadowColor.value;

    // Update shadow value displays
    document.getElementById('shadow-x-value').textContent = controls.shadowX.value + 'px';
    document.getElementById('shadow-y-value').textContent = controls.shadowY.value + 'px';
    document.getElementById('shadow-blur-value').textContent = controls.shadowBlur.value + 'px';

    updateGeneratedCode();
}

function updateGeneratedCode() {
    const styles = window.getComputedStyle(previewText);
    generatedCode.value = `.preview-text {\n` +
        `    font-family: ${styles.fontFamily};\n` +
        `    font-size: ${styles.fontSize};\n` +
        `    font-weight: ${styles.fontWeight};\n` +
        `    font-style: ${styles.fontStyle};\n` +
        `    font-variant: ${styles.fontVariant};\n` +
        `    color: ${styles.color};\n` +
        `    line-height: ${styles.lineHeight};\n` +
        `    text-align: ${styles.textAlign};\n` +
        `    text-decoration: ${styles.textDecoration};\n` +
        `    letter-spacing: ${styles.letterSpacing};\n` +
        `    word-spacing: ${styles.wordSpacing};\n` +
        `    text-indent: ${styles.textIndent};\n` +
        `    text-transform: ${styles.textTransform};\n` +
        `    text-shadow: ${styles.textShadow};\n` +
        `}`;
}

// Copy CSS
const copyButton = document.getElementById('copy-css');
document.getElementById('copy-css').addEventListener('click', () => {
    navigator.clipboard.writeText(generatedCode.value);
    copyButton.innerText = "Copied!";
    setTimeout(() => {
        copyButton.innerText = "Copy CSS..!";
    }, 2000);
});

// Reset
document.getElementById('reset').addEventListener('click', () => {
    // Reset inputs
    textInput.value = '';
    controls.fontFamily.value = 'Arial';
    controls.fontSize.value = 16;
    controls.fontWeight.value = 'normal';
    controls.fontStyle.value = 'normal';
    controls.fontVariant.value = 'normal';
    controls.lineHeight.value = 1.6;
    controls.textColor.value = '#333333';
    controls.textAlign.value = 'left';
    controls.textDecoration.value = 'none';
    controls.letterSpacing.value = 0;
    controls.wordSpacing.value = 0;
    controls.textIndent.value = 0;
    controls.textTransform.value = 'none';
    controls.shadowX.value = 0;
    controls.shadowY.value = 0;
    controls.shadowBlur.value = 0;
    controls.shadowColor.value = '#000000';

    // Reset preview
    previewText.style = '';
    previewText.textContent = 'This is a sample text that will show styling changes. Edit the text using controls to see different styles applied.';

    // Reset value displays
    document.querySelectorAll('[id$="-value"]').forEach(span => {
        if (span.id.includes('font-size')) span.textContent = '16px';
        if (span.id.includes('line-height')) span.textContent = '1.6';
        if (span.id.includes('spacing') || span.id.includes('indent')) span.textContent = '0px';
        if (span.id.includes('shadow')) span.textContent = '0px';
    });

    updateGeneratedCode();
});

// Initial code generation
updateGeneratedCode();