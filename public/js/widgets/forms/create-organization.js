Class(CV, 'CreateOrganization').inherits(Widget)({
    ELEMENT_CLASS : 'cv-form-create-organization',
    HTML : '\
        <form>\
            <div class="-col-12 placeholder-main"></div>\
            <div class="-col-12">\
                <div class="-col-10 -pr1 placeholder-location"></div>\
                <div class="-col-2 -pl1 placeholder-pin">\
                    <div class="form-field">\
                        <label><span></span></label>\
                        <div class="cv-detect-location">Detect</div>\
                    </div>\
                </div>\
            </div>\
            <div class="-col-3 -pr1 placeholder-logo"></div>\
            <div class="-col-9 -pl1 placeholder-background"></div>\
            <div class="-col-12 placeholder-send"></div>\
        </form>\
    ',

    prototype : {
        init : function(config){
            Widget.prototype.init.call(this, config);

            new CV.Input({
                title : "Organization Name",
            }).render(this.element.find('.placeholder-main'));

            new CV.Input({
                placeholder : 'http://www.crowdvoice.by/@',
                title : "Handler",
            }).render(this.element.find('.placeholder-main'));

            new CV.Input({
                isArea : true,
                title : "Description",
                subTitle : "140 characters max"
            }).render(this.element.find('.placeholder-main'));

            new CV.Input({
                title : "Location",
            }).render(this.element.find('.placeholder-location'));

            new CV.Image({
                data: {title : "Logo / badge"}
            }).render(this.element.find('.placeholder-logo'));

            new CV.Image({
                data : {title : "Background"}
            }).render(this.element.find('.placeholder-background'));

            //********** bottom ***********

            new CV.Button({
                name  : 'buttonSend',
                style : 'primary full',
                type : 'single',
                label : 'Create Organization'
            }).render(this.element.find('.placeholder-send'));
        }
    }
});
