$(document).ready(function() {
    let keyframes = [];
    const $animatedObject = $('.animated-object');
    const $cssCode = $('.css-code');
    const $keyframeList = $('.keyframe-list');

    // Select all input elements
    const $animationName = $('.controls input').eq(0);
    const $duration = $('.controls input').eq(1);
    const $timingFunction = $('.controls select').eq(0);
    const $iterationCount = $('.controls input').eq(2);
    const $direction = $('.controls select').eq(1);
    const $fillMode = $('.controls select').eq(2);

    // Keyframe controls
    const $keyframeTime = $('.keyframe-controls input').eq(0);
    const $keyframeProperty = $('.keyframe-controls select').eq(0);
    const $keyframeValue = $('.keyframe-controls input').eq(1);

    // Event listeners for animation properties
    $('input, select').on('input change', generateCSS);

    // Add keyframe button
    $('.add-keyframe button').click(function(e) {
        e.preventDefault();
        const time = parseFloat($keyframeTime.val());
        const property = $keyframeProperty.val();
        const value = $keyframeValue.val();

        if (isNaN(time) || time < 0 || time > 100) {
            alert('Please enter a valid time (0-100)');
            return;
        }

        if (!property || !value) {
            alert('Please select a property and enter a value');
            return;
        }

        // Add keyframe to the list
        keyframes.push({
            time: `${time}%`,
            property,
            value
        });
        renderKeyframes();
        generateCSS();
    });

    // Render keyframes
    function renderKeyframes() {
        $keyframeList.empty();
        keyframes.forEach((kf, index) => {
            const $keyframeItem = $(`
                <div class="keyframe-item">
                    <input type="text" value="${kf.time}" class="keyframe-time">
                    <select class="keyframe-property">
                        <option ${kf.property === 'transform' ? 'selected' : ''}>transform</option>
                        <option ${kf.property === 'opacity' ? 'selected' : ''}>opacity</option>
                        <option ${kf.property === 'background-color' ? 'selected' : ''}>background-color</option>
                        <option ${kf.property === 'left' ? 'selected' : ''}>left</option>
                        <option ${kf.property === 'top' ? 'selected' : ''}>top</option>
                    </select>
                    <input type="text" value="${kf.value}" class="keyframe-value">
                    <button class="remove-keyframe">Remove</button>
                </div>
            `);

            // Update keyframe on change
            $keyframeItem.find('input, select').on('input change', function() {
                keyframes[index] = {
                    time: $keyframeItem.find('.keyframe-time').val(),
                    property: $keyframeItem.find('.keyframe-property').val(),
                    value: $keyframeItem.find('.keyframe-value').val()
                };
                generateCSS();
            });

            // Remove keyframe
            $keyframeItem.find('.remove-keyframe').click(function() {
                keyframes.splice(index, 1);
                renderKeyframes();
                generateCSS();
            });

            $keyframeList.append($keyframeItem);
        });
    }

    const copyButton = document.getElementById('copy-button');
    // Copy button functionality
    $('.copy-button').eq(0).click(function() {
        const css = $cssCode.val();
        navigator.clipboard.writeText(css).then(() => {
            copyButton.innerText = "Copied";
            setTimeout(() => {
                copyButton.innerText = "Copy Styles";
            }, 2000);
        }).catch(err => {
            console.error('Copy failed:', err);
        });
    });


    // Generate CSS
    function generateCSS() {
        const name = $animationName.val() || 'myAnimation';
        let duration = $duration.val();
        const timingFunction = $timingFunction.val();
        let iterationCount = $iterationCount.val();
        const direction = $direction.val();
        const fillMode = $fillMode.val();

        // Validate duration
        duration = duration ? (/^\d+$/.test(duration) ? duration + 's' : duration) : '0s';

        // Handle iteration count
        iterationCount = iterationCount === '0' ? 'infinite' : (iterationCount || '1');

        // Generate animation shorthand
        const animationValue = `${name} ${duration} ${timingFunction} ${iterationCount} ${direction} ${fillMode}`;

        // Generate keyframes CSS
        let keyframesCSS = '';
        const groupedKeyframes = {};

        keyframes.forEach(kf => {
            if (!groupedKeyframes[kf.time]) {
                groupedKeyframes[kf.time] = [];
            }
            groupedKeyframes[kf.time].push(`${kf.property}: ${kf.value};`);
        });

        for (const [time, properties] of Object.entries(groupedKeyframes)) {
            keyframesCSS += `${time} { ${properties.join(' ')} }\n`;
        }

        // Create full CSS
        const fullCSS = `.animated-object {\n  animation: ${animationValue};\n}\n\n@keyframes ${name} {\n  ${keyframesCSS.replace(/\n/g, '\n  ')}\n}`;

        // Update code display
        $cssCode.val(fullCSS);

        // Inject dynamic styles
        $('style#dynamic-styles').remove();
        $('<style id="dynamic-styles">')
            .text(`@keyframes ${name} { ${keyframesCSS} }`)
            .appendTo('head');

        // Apply animation to object
        $animatedObject.css('animation', animationValue);
    }

    // Initial generation
    generateCSS();
});