module.exports = {
    /* Holds the page token, used for the server to accept our requests.
     * @property token <private>
     */
    token : $('meta[name="csrf-token"]').attr('content'),

    /**************************************************************************
     * VOICES
     *************************************************************************/
    /* Follow/Unfollow Voice.
     * @arguments args.profileName <required> [String] the voice owner profileName
     * @arguments args.voiceSlug <required> [String] the voice slug
     * @arguments callback <required> [Function]
     */
    followVoice : function followVoice(args, callback) {
        if (!args.profileName || !args.voiceSlug || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'GET',
            url : '/' + args.profileName + '/' + args.voiceSlug + '/follow',
            dataType : 'json',
            headers : {'csrf-token' : this.token},
            success : function success(data) {callback(false, data);},
            error : function error(err) {callback(true, err);}
        });
    },

    /* Requests the data to create a Post preview on the current Voice.
     * @arguments args.url <required> [String] absolute url of a page, image or video (youtube/vimeo)
     * @arguments callback <required> [Function]
     */
    postPreview : function postPreview(args, callback) {
        if (!args.url || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        var path = window.location.pathname;
        path += (/\/$/.test(path)) ? 'preview' : '/preview';

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
        if (!args.data || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'POST',
            dataType : 'json',
            url : window.location.pathname,
            headers : {'csrf-token' : this.token},
            data : args.data,
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },


    /**************************************************************************
     * ENTITIES
     *************************************************************************/
    /* Follow/Unfollow Entity
     * @arguments args.profileName <required> [String] the entity profileName
     * @arguments callback <required> [Function]
     */
    followEntity : function followEntity(args, callback) {
        if (!args.profileName || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'GET',
            url : '/' + args.profileName + '/follow',
            dataType : 'json',
            headers : {'csrf-token' : this.token},
            success : function success(data) {callback(false, data);},
            error : function error(err) {callback(true, err);}
        });
    },


    /**************************************************************************
     * SEARCH
     *************************************************************************/
    /* Get Voices, People and Organizations results from a specified query.
     * @arguments args.query <required> [String] the query string
     * @arguments callback <required> [Function]
     */
    search : function search(args, callback) {
        if (!args.query || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'GET',
            url : '/search/' + args.query,
            dataType : 'json',
            headers : {'csrf-token' : this.token},
            success : function success(data) {callback(false, data);},
            error : function error(err) {callback(true, err);}
        });
    }
};
