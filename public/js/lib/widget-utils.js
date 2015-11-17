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

            decodeHTML : function decodeHTML(htmlString) {
                var el = document.createElement('div');
                el.insertAdjacentHTML('beforeend', htmlString);
                return el.textContent;
            },

            /* Creates a new node with the specified name and replaces the
             * existing node with the new node.
             * @usage this.dom.renameNode(nodeElement, 'tagName')
             * @return Node the renamed node. The new node that was created to replace the specified node.
             */
            renameNode : function renameNode(node, name) {
                var newNode = document.createElement(name);

                Object.keys(node.attributes).forEach(function(attr) {
                    newNode.setAttribute(node.attributes[attr].nodeName, node.attributes[attr].value);
                });

                while(node.firstChild) {
                    newNode.appendChild(node.firstChild);
                }

                return node.parentNode.replaceChild(newNode, node);
            },

            addClass : function addClass(el, classNames) {
                if (el.classList) {
                    return classNames.forEach(function(cl) {
                        el.classList.add(cl);
                    });
                }

                el.className += ' ' + classNames.join(' ');
            },

            removeClass : function removeClass(el, classNames) {
                if (el.classList) {
                    return classNames.forEach(function(cl) {
                        el.classList.remove(cl);
                    });
                }

                el.className = el.className.replace(new RegExp('(^|\\b)' + classNames.join('|') + '(\\b|$)', 'gi'), ' ');
            },

            isChildOf : function isChildOf(e, p) {
                if (!e) {return false;}
                var el = e.target||e.srcElement||e||false;
                while (el && el !== p) {
                    el = el.parentNode||false;
                }
                return (el!==false);
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
            },

            /* Truncate text.
             * @argument text <required> [String] the text to truncate
             * @argument max <required> [Number] the max number of chars
             * @argument ellipsis <optional> [Boolean] should append ellipsis at the end?
             */
            truncate : function truncate(text, max, ellipsis) {
                if (text.length > max) {
                    var _max = ellipsis ? (max - 3) : max;
                    var _symbol = ellipsis ? '...' : '';

                    return (text.slice(0, _max) + _symbol);
                }

                return text;
            }
        }
    }
});
