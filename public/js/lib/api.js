/* Collection of available endpoints we are allowed to use to communicate with the server.
 */
module.exports = {
    /* Holds the page token, used for the server to accept our requests.
     * @property token <private>
     */
    token : $('meta[name="csrf-token"]').attr('content'),

    /**************************************************************************
     * VOICES
     *************************************************************************/
    /* Creates a new Voice.
     * @argument args.data <required> [Object]
     * @argument callback <required> [Function]
     */
    voiceCreate : function voiceCreate(args, callback) {
        if (!args.data || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'POST',
            dataType : 'json',
            url : '/voice',
            headers : {'csrf-token' : this.token},
            data : args.data,
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Follow/Unfollow Voice.
     * @argument args.profileName <required> [String] the voice owner profileName
     * @argument args.voiceSlug <required> [String] the voice slug
     * @argument callback <required> [Function]
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
     * @argument args.url <required> [String] absolute url of a page, image or video (youtube/vimeo)
     * @argument callback <required> [Function]
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
            type : 'POST',
            url : path,
            headers : {'csrf-token' : this.token},
            data : {url : args.url},
            success: function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /**************************************************************************
     * POSTS
     *************************************************************************/
    uploadPostImage : function uploadPostImage(args, callback) {
        $.ajax({
            type : 'POST',
            url : window.location.pathname + 'upload',
            headers : {'csrf-token' : this.token},
            data : args,
            cache : false,
            contentType : false,
            processData : false,
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Creates a Post on the current Voice.
     * @argument args.posts <required> [Array] each post data
     * @argument callback <required> [Function]
     */
    postCreate : function postCreate(args, callback) {
        if (!args.posts || !callback) {
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
            data : {posts: args.posts},
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Updates a Post.
     * @argument args.profileName <required> [String] the voice owner profileName
     * @argument args.voiceSlug <required> [String] the voice slug
     * @argument args.postId <required> [String] the post id to up/down vote
     * @argument args.data <required> [Object] the post data
     * @argument callback <required> [Function]
     */
    postUpdate : function postUpdate(args, callback) {
        if (!args.profileName || !args.voiceSlug || !args.postId || !args.data || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'PUT',
            dataType : 'json',
            url : '/' + args.profileName + '/' + args.voiceSlug + '/' + args.postId,
            headers : {'csrf-token' : this.token},
            data : args.data,
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Allows a post to be voted up or down.
     * @argument args.profileName <required> [String] the voice owner profileName
     * @argument args.voiceSlug <required> [String] the voice slug
     * @argument args.postId <required> [String] the post id to up/down vote
     * @argument args.vote <required> [String] ("up" | "down") upvote or downvote
     */
    postVote : function postVote(args, callback) {
        if (!args.profileName || !args.voiceSlug || !args.postId || !args.vote || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'GET',
            dataType : 'json',
            url : '/' + args.profileName + '/' + args.voiceSlug + '/' + args.postId + '/vote/' + args.vote,
            headers : {'csrf-token' : this.token},
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Saves a post (favotite).
     * @argument args.profileName <required> [String] the voice owner profileName
     * @argument args.voiceSlug <required> [String] the voice slug
     * @argument args.postId <required> [String] the post id to up/down vote
     */
    postSave : function postSave(args, callback) {
        if (!args.profileName || !args.voiceSlug || !args.postId || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'POST',
            dataType : 'json',
            url : '/' + args.profileName + '/' + args.voiceSlug + '/' + args.postId + '/savePost',
            headers : {'csrf-token' : this.token},
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Unsaves a post (un-favotite).
     * @argument args.profileName <required> [String] the voice owner profileName
     * @argument args.voiceSlug <required> [String] the voice slug
     * @argument args.postId <required> [String] the post id to up/down vote
     */
    postUnsave : function postUnsave(args, callback) {
        if (!args.profileName || !args.voiceSlug || !args.postId || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'POST',
            dataType : 'json',
            url : '/' + args.profileName + '/' + args.voiceSlug + '/' + args.postId + '/unsavePost',
            headers : {'csrf-token' : this.token},
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /* Search for Posts in Sources
     * @argument args.profileName <required> [String] the voice owner profileName
     * @argument args.voiceSlug <required> [String] the voice slug
     * @argument args.source <required> [String] the source to search on ['googleNews', 'youtube']
     * @argument args.query <required> [String] the query string
     * @argument callback <required> [Function]
     */
    searchPostsInSource : function searchPostsInSource(args, callback) {
        if (!args.profileName || !args.voiceSlug || !args.source || !args.query|| !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'GET',
            dataType : 'json',
            url : '/' + args.profileName + '/' + args.voiceSlug + '/' + args.source + '/' + args.query,
            headers : {'csrf-token' : this.token},
            success : function success(data) { callback(false, data); },
            error : function error(err) { callback(true, err); }
        });
    },

    /**************************************************************************
     * ENTITIES
     *************************************************************************/
    /* Follow/Unfollow Entity
     * @argument args.profileName <required> [String] the entity profileName
     * @argument callback <required> [Function]
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

    /* Checks if a voiceSlug exists
     * @argument args.profileName <required> [String] the entity profileName
     * @argument callback <required> [Function]
     */
    isSlugAvailable : function isSlugAvailable(args, callback) {
        if (!args.profileName || !args.slug || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'POST',
            url : '/' + args.profileName + '/isVoiceSlugAvailable',
            data : {value: args.slug},
            dataType : 'json',
            headers : {'csrf-token' : this.token},
            success : function success(data) {callback(false, data);},
            error : function error(err) {callback(true, err);}
        });
    },

    /**************************************************************************
     * THREATS
     *************************************************************************/
    /* Creates a thread or insert a message in an existing thread.
     * @argument args.profileName <required> [String] currentPerson profileName
     * @argument args.type <required> [String] Message type ('message')
     * @argument args.senderEntityId [String] currentPerson hashid
     * @argument args.receiverEntityId [String] receriver Person hashid
     * @argument args.message <required> [String] the text message
     * @argument callback <required> [Function]
     */
    sendMessage : function sendMessage(args, callback) {
        if (!args.profileName || !args.type || !args.senderEntityId || !args.receiverEntityId || !args.message || !callback) {
            throw new Error('Missing required params');
        }

        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'POST',
            url : '/' + args.profileName + '/messages',
            headers : {'csrf-token' : this.token},
            data : {
                type : args.type,
                senderEntityId : args.senderEntityId,
                receiverEntityId : args.receiverEntityId,
                message : args.message
            },
            success : function success(data) {callback(false, data);},
            error : function error(err) {callback(true, err);}
        });
     },

    /**************************************************************************
     * SEARCH
     *************************************************************************/
    /* Get Voices, People and Organizations results from a specified query.
     * @argument args.query <required> [String] the query string
     * @argument callback <required> [Function]
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
    },

    /**************************************************************************
     * MISC
     *************************************************************************/
    /* Returns the registered topics. [Array]
     * @argument callback <required> [Function]
     */
    getTopics : function getTopics(callback) {
        if ((typeof callback).toLowerCase() !== "function") {
            throw new Error('Callback should be a function');
        }

        $.ajax({
            type : 'GET',
            url : '/topics',
            headers : {'csrf-token' : this.token},
            success : function success(data) {callback(false, data);},
            error : function error(err) {callback(true, err);}
        });
    }
};
