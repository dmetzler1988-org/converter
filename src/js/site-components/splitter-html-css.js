// TODO: Fix CodeMirror that it works also on the two output textarea.
// TODO: Modify code to work with regex instead of loops.
// (class="[a-zA_Z 0-9-_]*")|(id="[a-zA_Z 0-9-_]*")|(\<[a-zA_Z] )|(style="[a-zA_Z 0-9-_]*")
// (\<([a-zA-Z]*) )|((style|class|id)="([^"']*)")
// TODO: Test it with complex code.
// TODO: Modify documentations.

$(document).ready(function() {
    const findTagLength = 10;
    const $input = $('#input');
    const $outputHtml = $('#outputHtml');
    const $outputCss = $('#outputCss');
    const $button = $('#convert');
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

            // Check each style attribute which was found in the HTML and do some stuff.
            for(let a = 0; cssItems.length > a; a++) {
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
        }
    })
});
