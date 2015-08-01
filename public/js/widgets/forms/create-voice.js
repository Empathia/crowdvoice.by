Class(CV, 'CreateVoice').inherits(Widget)({
    ELEMENT_CLASS : 'cv-form-create-voice',
    HTML : '\
        <form>\
            <div class="-col-12">\
                <div class="-col-3 -pr1 placeholder-image"></div>\
                <div class="-col-9 -pl1 placeholder-title placeholder-description"></div>\
            </div>\
            <div class="-col-6 -pr1 placeholder-topics placeholder-twitter"></div>\
            <div class="-col-6 -pl1 placeholder-rss">\
                <div class="-col-12">\
                    <div class="-col-6 -pr1 placeholder-voice-type"></div>\
                    <div class="-col-6 -pl1 placeholder-voice-ownership"></div>\
                </div>\
            </div>\
            <div class="-col-12">\
                <div class="-col-6 -pr1 placeholder-latitude"></div>\
                <div class="-col-6 -pl1 placeholder-longitude"></div>\
            </div>\
            <div class="send -col-12"></div>\
        </form>\
    ',

    prototype : {
        init : function init(config){
            Widget.prototype.init.call(this, config);
            var sendElement = this.element.find('.send');

            new CV.Image({
                data: {title : "Background image (?)"}
            }).render(this.element.find('.placeholder-image'));

            new CV.Input({
                title : "Title (?)",
                subTitle : "65 characters max"
            }).render(this.element.find('.placeholder-title'));

            new CV.Input({
                isArea : true,
                title : "Description (?)",
                subTitle : "140 characters max"
            }).render(this.element.find('.placeholder-description'));

            //Checkbox
            var allOptions = {
                "1": {label: 'Myself'},
                "2": {label: 'Organization 01'},
                "3": {label: 'Organization 02'},
                "4": {label: 'Organization 03'}
            };

            new CV.Select({
                type    	: 'check',
                label 		: 'Select at least one',
                name  		: 'selectFollow',
                style 		: 'full',
                options		: allOptions,
                hasTitle 	: true,
                title 		: "Voice topics (?)"
            }).render(this.element.find('.placeholder-topics'));

            new CV.Input({
                title : "Twitter hashtags (?)"
            }).render(this.element.find('.placeholder-twitter'));

            new CV.Input({
                placeholder : 'Latitude',
                title : "Location (?)"
            }).render(this.element.find('.placeholder-latitude'));

            new CV.Input({
                placeholder : 'Longitude',
                title : ' '
            }).render(this.element.find('.placeholder-longitude'));

            //voice types
            var allTypes = {
                "1": {label: 'Public', name: 'public'},
                "2": {label: 'Closed', name: 'closed'},
                "3": {label: 'Pending', name : 'pending'}
            };
            new CV.Select({
                label 		: 'Select one',
                name  		: 'select',
                style 		: 'full',
                options 	: allTypes,
                hasTitle 	: true,
                title 		: "Voice type (?)"
            }).render(this.element.find('.placeholder-voice-type'));

            //voice types
            var allUsers = {
                "1": {label: 'Esra\'a Al Shafei'},
                "2": {label: 'Heisen Berg'}
            };
            new CV.Select({
                label 		: 'Select one',
                name  		: 'select',
                style 		: 'full',
                options 	: allUsers,
                hasTitle 	: true,
                title 		: "Voice ownership (?)"
            }).render(this.element.find('.placeholder-voice-ownership'));

            new CV.Input({
                placeholder : '',
                title : 'Content from rss feed (?)'
            }).render(this.element.find('.placeholder-rss'));

            //********** bottom ***********
            this.appendChild(new CV.Check({
                id          : 1,
                label       : "Create Anonymously (?)",
                name        : "checkAnon"
            })).render(sendElement);

            new CV.Button({
                style   : 'primary full',
                type    : 'single',
                label   : 'Send',
                name    : 'buttonSend'
            }).render(sendElement);
        }
    }
});
