/**
 * Generate
 */
Module('ShareLinkGenerator')({
    prototype : {
        /* Compose the facebook url string.
         * @argument data [Object] <required>
         * @argument data.url [String] <required>
         * @return url
         */
        facebook : function facebook(data) {
            return 'https://www.facebook.com/share.php?u=' + encodeURIComponent(data.url);
        },

        /* Compose the twitter share url string.
         *
         * @argument data [Object] <required>
         * @argument data.text [String] <optional> Pre-populated text highlighted in the Tweet composer.
         * @argument data.in_reply_to [String] <optional> Status ID string of a parent Tweet such as a Tweet from your account (if applicable).
         * @argument data.url [String] <optional> URL included with the Tweet.
         * @argument data.hashtags [String] <optional> A comma-separated list of hashtags to be appended to default Tweet text.
         * @argument data.via [String] <optional> Attribute the source of a Tweet to a Twitter username.
         * @argument data.related [String] <optional> A comma-separated list of accounts related to the content of the shared URI.
         * @return url
         *
         * @info https://dev.twitter.com/web/tweet-button/parameters
         */
        twitter : function twitter(data) {
            var params = [];
            Object.keys(data || {}).forEach(function(propertyName) {
                params.push(propertyName + '=' + encodeURIComponent(data[propertyName]));
            });
            return 'https://twitter.com/share?' + params.join('&');
        },

        /* Compose the google plus url string.
         * @argument data [Object] <required>
         * @argument data.url [String] <required>
         * @return url
         */
        googlePlus : function googlePlus(data) {
            var params = [];
            Object.keys(data || {}).forEach(function(propertyName) {
                params.push(propertyName + '=' + encodeURIComponent(data[propertyName]));
            });
            return 'https://plus.google.com/share?' + params.join('&');
        },

        /* Compose the email url string.
         *
         * @argument data [Object] <required>
         * @argument to [String] <required>
         * @argument subject [String] <optional>
         * @argument cc [String] <optional>
         * @argument bcc [String] <optional>
         * @argument body [String] <optional>
         * @return url
         *
         * @info https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Email_links
         */
        email : function email(data) {
            var params = [];
            var to = data.to;

            Object.keys(data || {}).forEach(function(propertyName) {
                if (propertyName !== 'to') {
                    params.push(propertyName + '=' + encodeURIComponent(data[propertyName]));
                }
            });

            return 'mailto:' + to + '?' + params.join('&');
        }
    }
});
