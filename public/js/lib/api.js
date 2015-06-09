module.exports = {

    token : $('meta[name="csrf-token"]').attr('content'),

    postPreview : function postPreview(args, callback) {
        if (!args.path || !args.data || !args.data.url) {
            throw new Error('API.postPreview: missing required params');
        }

        var p;
        if (/\/$/.test(args.path)) {
            p = args.path + 'preview';
        } else {
            p = args.path + '/preview';
        }

        $.ajax({
            type : "POST",
            url : p,
            headers : {'csrf-token' : this.token},
            data : {url : args.data.url},
            success: function success(data) {
                callback(false, data);
            },
            error : function error(err) {
                callback(true, err);
            }
        });
    }
};
