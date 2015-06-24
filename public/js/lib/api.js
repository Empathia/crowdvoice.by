module.exports = {

    /* Holds the page token, used for the server to accept our requests.
     * @property token <private>
     */
    token : $('meta[name="csrf-token"]').attr('content'),

    /* Requests the data to create a Post preview on the current Voice.
     * @arguments args.url <required> [String] absolute url of a page, image or video (youtube/vimeo)
     * @arguments callback <required> [Function]
     */
    postPreview : function postPreview(args, callback) {
        if (!args.url || !callback) throw new Error('Missing required params');
        if ((typeof callback).toLowerCase() !== "function") throw new Error('Callback shold be a function');

        var path = window.location.pathname;

        if (/\/$/.test(path)) path += 'preview';
        else path += '/preview';

        $.ajax({
            type : "POST",
            url : path,
            headers : {'csrf-token' : this.token},
            data : {url : args.url},
            success: function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Saves a Post on the current Voice.
     * @arguments args.data <required> [Object] the post data
     * @arguments callback <required> [Function]
     */
    postSave : function postSave(args, callback) {
        if (!args.data || !callback) throw new Error('Missing required params');
        if ((typeof callback).toLowerCase() !== "function") throw new Error('Callback shold be a function');

        $.ajax({
            type : 'POST',
            dataType : 'json',
            url : window.location.pathname,
            headers : {'csrf-token' : this.token},
            data : args.data,
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    }
};
