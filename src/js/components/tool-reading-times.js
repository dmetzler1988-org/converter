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
                const countCharacters = textInputValue.length;

                const value = textInputValue.trim();
                const countWords = value.split(/\s+/).length;
                let outputContent = `Given characters: ${countCharacters}<br>Given words: ${countWords}<br>`;

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

                outputContent += `<br>Read time for text only: ${wordReadTime}`;
                outputContent += `<br>Read time for images only: ${imgReadTime}`;
                outputContent += `<br>Read time for all: ${totalReadTime}`;

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
