/**
 * Generic Module of Utilities
 * dom : handy methods for DOM manipulation
 * format : methods for formatting and manipulating numbers
 */
Module(CV, 'WidgetUtils')({
    prototype : {
        dom : {
            /* Replace the backgroundImage property of the style attribute for
             * the element passed with the imageStringPath param value.
             * @method updateBackgroundImage <public> [Function]
             */
            updateBgImage : function(element, imageStringPath) {
                element.style.backgroundImage = 'url(' + imageStringPath + ')';
            },

            /* Replace the textContent of the element passed with the
             * textString param value.
             * @method updateBackgroundImage <public> [Function]
             */
            updateText : function(element, textString) {
                element.textContent = textString;
            },

            /* Replace the passed attribute on the passed element the value param.
             * @method updateAttr <public> [Function]
             */
            updateAttr : function(attr, element, value) {
                element.setAttribute(attr, value);
            },

            updateHTML : function updateHTML(element, htmlString) {
                element.innerHTML = '';
                element.insertAdjacentHTML('beforeend', htmlString);
            },

            create: function(type) {
                return document.createElement(type);
            },

            show: function(element) {
                element.style.display = "block";
                return element;
            }
        },

        format : {
            /* Return a formatted number by commas on each thrid rtl.
             * @method format.numberUS <public> [Function]
             * @param number <required> [Number]
             * @return n [String] e.g "1,234,567"
             */
            numberUS : function numberUS(number) {
                var n = number.toString();              // "1234567"
                n = n.split("").reverse().join("");     // "7654321"
                n = n.match(/.{1,3}/g).join(",");       // "765,432,1"
                n = n.split("").reverse().join("");     // "1,234,567"

                return n;
            },

            /* Capitalize the first character of the passed string.
             * @method format.capitalizeFirstLetter <public> [Function]
             * @param string <required> [String]
             * @return string (modified) e.g "hello world" => "Hello world"
             */
            capitalizeFirstLetter : function capitalizeFirstLetter(string) {
                return string.charAt(0).toUpperCase() + string.slice(1);
            },

            /*
             * Converts the passed number (seconds) into a time string with
             * format (hh:)mm:ss
             * @method secondsToHHMMSS <public> [Function]
             * @params seconds <required> [Number]
             * @return [String] e.g 60 => "01:00"
             */
            secondsToHHMMSS : function(seconds) {
                var h, m, s;

                seconds = ~~seconds;
                h = ~~(seconds / 3600);
                m = ~~(seconds % 3600 / 60);
                s = ~~(seconds % 3600 % 60);

                return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s);
            }
        }
    }
});
