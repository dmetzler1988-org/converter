// Check if time calc is correct: https://www.calculator.net/time-calculator.html
// Demo content from: https://loremipsum.de/
export const init = () => {
    $(document).ready(function () {
        const readWordsPerMinute = 265;  // Words which will be read in one minute.
        const readTimeForImage = 12; // Seconds
        const $imagesInput = $('#imagesInput');
        const $textInput = $('#textInput');
        const $output = $('#output');
        const $button = $('#convert');
        const $cleanButton = $('#clean-fields');
        const $demoContentButton = $('#demoContent');

        $button.on('click', (event) => {
            const imgInputValue = $imagesInput.val() ? $imagesInput.val() : 0;
            const textInputValue = $textInput.val();

            if (textInputValue) {
                // Replace line breaks with whitespace, multiple whitespaces with single whitespace and trim it.
                let value = textInputValue.replace(/(\r\n|\n|\r)/g, ' ').replace(/\s+/g, ' ').trim();
                const countCharacters = value.length;
                const countWords = value.split(/\s+/).length;

                let outputContent = `<div class="grid grid--one-half">
                    <p>Given characters: ${countCharacters}</p>
                    <p>Given words: ${countWords}</p>
                </div>`;

                let wordReadTime = (countWords / readWordsPerMinute) * 60; // Read words in seconds.
                let imgReadTime = imgInputValue * readTimeForImage; // Output is in seconds.
                let totalReadTime = wordReadTime + imgReadTime;

                if (wordReadTime >= 60) {
                    wordReadTime = parseFloat((wordReadTime / 60)).toFixed(2) + ' min';
                } else {
                    wordReadTime = parseFloat(wordReadTime).toFixed(2) + ' sec';
                }

                if (imgReadTime >= 60) {
                    imgReadTime = parseFloat((imgReadTime / 60)).toFixed(2) + ' min';
                } else {
                    imgReadTime = parseFloat(imgReadTime).toFixed(2) + ' sec';
                }

                if (totalReadTime >= 60) {
                    totalReadTime = parseFloat((totalReadTime / 60)).toFixed(2) + ' min';
                } else {
                    totalReadTime = parseFloat(totalReadTime).toFixed(2) + ' sec';
                }

                outputContent += `<div class="grid grid--one-third">`;
                outputContent += `<p>Read time for text only: ${wordReadTime}</p>`;
                outputContent += `<p>Read time for images only: ${imgReadTime}</p>`;
                outputContent += `<p>Read time for all: ${totalReadTime}</p>`;
                outputContent += `</div>`;

                $output.html(outputContent);
            }
        });

        $cleanButton.on('click', (event) => {
            $imagesInput.val('');
            $textInput.val('');
            $output.val('');

            window.Materialize.textareaAutoResize($textInput);
            window.Materialize.updateTextFields();
        });

        $demoContentButton.on('click', (event) => {
            const demoImgContent = 5;
            const demoContent = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.';

            $imagesInput.val(demoImgContent);
            $textInput.val(demoContent);
            // Trigger Resize for CSS Output textarea.
            window.Materialize.textareaAutoResize($textInput);
            // Trigger textField Update to fix label position.
            window.Materialize.updateTextFields();
        });
    });
};
