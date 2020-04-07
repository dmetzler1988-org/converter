// https://html-cleaner.com/
// TODO: Fix CodeMirror that it works also on the two output textarea.
// TODO: Modify code to work with regex instead of loops.
// (class="[a-zA_Z 0-9-_]*")|(id="[a-zA_Z 0-9-_]*")|(\<[a-zA_Z] )|(style="[a-zA_Z 0-9-_]*")
// (\<([a-zA-Z]*) )|((style|class|id)="([^"']*)")
// TODO: Test it with complex code.
// TODO: Modify documentations.
export const init = () => {
    $(document).ready(function () {
        const findTagLength = 10;
        const $input = $('#input');
        const $outputHtml = $('#outputHtml');
        const $outputCss = $('#outputCss');
        const $button = $('#convert');
        const $demoContentButton = $('#demoContent');
        const regexHtml = new RegExp(/(?= style=").+?(?=").(?<=style=").+?(?<=")/g); // Get the content from style=" to the next " with the space before.
        const regexCss = new RegExp(/(?<=style=").+?(?=")/g); // Get only the content between style=" and the next ".
        const regexCssId = new RegExp(/(?<=id=").+?(?=")/g); // Get only the content between style=" and the next ".
        const regexCssClass = new RegExp(/(?<=class=").+?(?=")/g); // Get the content from style=" to the next " with the space before.

        let cmStyles = {
            lineNumbers: true,
            mode: "htmlmixed",
            theme: "monokai",
            styleActiveLine: true,
        };

        //let inputCodeMirror = CodeMirror.fromTextArea($input[0], cmStyles);
        //let outputHtmlCodeMirror = CodeMirror.fromTextArea($outputHtml[0], cmStyles);
        //let outputCssCodeMirror = CodeMirror.fromTextArea($outputCss[0], cmStyles);

        $button.on('click', (event) => {
            let inputValue = $input.val();

            if (inputValue) {
                let cssItems = inputValue.match(regexCss);
                let outputHtmlString = inputValue.replace(regexHtml, "");
                let tagName = '';
                let newCssOutput = [];

                // Write the HTML without the inline style attributes to the output textarea.
                $outputHtml.val(outputHtmlString);
                // Trigger Resize for HTML Output textarea.
                window.Materialize.textareaAutoResize($outputHtml);

                // Check each style attribute which was found in the HTML and do some stuff.
                for (let a = 0; cssItems.length > a; a++) {
                    let cssItem = cssItems[a];
                    let currentItemIndex = inputValue.indexOf(cssItem) - 1; // -1 is needed to get the correct start item.
                    let tagStart = 0;
                    let tagEnd = 0;
                    let fullTagString = '';
                    let cssIds = {};
                    let cssClasses = {};
                    let cssId = '';
                    let cssClass = '';
                    let cssSelector = '';

                    // Find the < sign in front of the style attribute to get the tag.
                    for (let a = currentItemIndex; a >= 0; a--) {
                        let newItemIndex = a;
                        // Returns the char on this index position.
                        let charAtIndex = inputValue.charAt(newItemIndex);

                        if (charAtIndex === '<') {
                            // Create a string with the length of findTagLength after the < sign.
                            let stringRange = inputValue.substr(newItemIndex + 1, newItemIndex + findTagLength);
                            // Split the string for each whitespace to a array.
                            let splittetStringRange = stringRange.split(' ');

                            // The first item after the < sign till to the whitespace includes the tag.
                            tagName = splittetStringRange[0];
                            tagStart = newItemIndex + 1;

                            // Exit the for loop.
                            break;
                        }
                    }

                    // Find the > sign after the style attribute.
                    for (let a = currentItemIndex; a <= inputValue.length; a++) {
                        let newItemIndex = a;
                        let charAtIndex = inputValue.charAt(newItemIndex);

                        if (charAtIndex === '>') {
                            tagEnd = newItemIndex;

                            // Exit the for loop.
                            break;
                        }
                    }

                    // Get the content between the tag with a style attribute.
                    fullTagString = inputValue.substring(tagStart, tagEnd);

                    // Get the string inside of the id attribute.
                    cssIds = fullTagString.match(regexCssId);
                    // Convert the object as string and get the string inside of the id attribute.
                    cssId = cssIds ? cssIds.toString().split(' ') : null;

                    // Get the string inside of the class attribute.
                    cssClasses = fullTagString.match(regexCssClass);
                    // Convert the object as string and get the string inside of the id attribute.
                    cssClass = cssClasses ? cssClasses.toString().split(' ') : null;

                    // Generate the css selector. First use class if available, then use id, else use the tag itself.
                    cssSelector = cssClass ? '.' + cssClass[0] : (cssId ? '#' + cssId[0] : tagName);

                    // Create array with css attributes.
                    newCssOutput.push(cssSelector + ' {' + cssItem + ' }');
                }

                // Sort the array for a better view.
                newCssOutput.sort();

                // Split array to a string without comma and with a line break.
                $outputCss.val(newCssOutput.join("\n"));
                // Trigger Resize for CSS Output textarea.
                window.Materialize.textareaAutoResize($outputCss);

                // Trigger textField Update to fix label position.
                window.Materialize.updateTextFields();
            }
        });

        $demoContentButton.on('click', (event) => {
            const demoContent = '<h2><span style="color: #4b67a1;" class="demo">Lorem ipsum</span> - <span style="color: #008000;">Lorem ipsum dolor sit amet, consetetur sadipscing elitr <img src="/images/smiley.png" alt="laughing" /> ♥</span></h2>\n' +
                '<p>At vero eos et accusam et <strong>justo duo</strong> dolores <strong>et ea</strong>  rebum.</p>\n' +
                '<p>Stet clita kasd gubergren, no sea takimata sanctus est <strong style="box-shadow: 3px 3px 3px #aaa; border-radius: 5px; padding: 0 5px; background-color: #2b3a56; color: #fff;">Lorem ipsum</strong> dolor sit amet.</p>\n' +
                '                        <!--This is just a comment.-->\n' +
                '<table class="demoTable" cellpadding="10">\n' +
                '    <tbody>\n' +
                '    <tr id="tr-id tr-multiple-ids" style="text-align: center;">\n' +
                '        <td><img src="/images/document.png" alt="document" /></td>\n' +
                '        <td><img src="/images/arrow.png" alt="arrow" /></td>\n' +
                '        <td><img src="/images/clean.png" alt="clean" width="86" height="122" /></td>\n' +
                '    </tr>\n' +
                '    <tr>\n' +
                '        <td colspan="3"><strong id="strong-id">Lorem ipsum dolor sit amet:</strong>\n' +
                '            <ol>\n' +
                '                <li>Step 1</li>\n' +
                '                <li>Step 2</li>\n' +
                '                <li>Step 3</li>\n' +
                '            </ol>\n' +
                '        </td>\n' +
                '    </tr>\n' +
                '    </tbody>\n' +
                '</table>\n' +
                '<p><strong><span style="color: #366691; font-size: 20px; text-shadow: 4px 10px 4px #888;">      Lorem Ipsum</span></strong></p>\n' +
                '<p class="p-class">At vero eos et accusam et justo duo <a href="#">dolores</a> et ea rebum</p>\n' +
                '<p id="p-id">Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>';

            $input.val(demoContent);
            // Trigger Resize for CSS Output textarea.
            window.Materialize.textareaAutoResize($input);
            // Trigger textField Update to fix label position.
            window.Materialize.updateTextFields();
        });
    });
};
