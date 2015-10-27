Class(CV, 'CategoryCards').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="category-list-item">\
            <div class="card-body">\
                <div class="card-wrapper">\
                    <a class="category_link" href="#" alt="">\
                        <div class="category-icon"></div>\
                    </a>\
                    <p class="category_link-wrapper">\
                        <a class="category_link category_title -font-bold" href="#" alt=""></a>\
                    </p>\
                    <p class="featured-text"><span class="middle-line">FEATURED VOICES</span></p>\
                    <div class="voice-card-container">\
                    </div>\
                    <p class="all-voices"><a href="" class="category_link">See all Voices &nbsp;<span class="arrow">›</span></a></p>\
                </div>\
            </div>\
        </div>\
    ',

    prototype : {
        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.anchorElements = [].slice.call(this.el.querySelectorAll('.category_link'), 0);

            this.dom.updateBgImage(this.el.querySelector('.category-icon'), this.images.icon.url);
            this.dom.updateText(this.el.querySelector('.category_title'), this.name);
         
            this.anchorElements.forEach(function(anchor) {
                this.dom.updateAttr('href', anchor, '/topic/' + this.slug);
                this.dom.updateAttr('alt', anchor, this.name);      
            }, this);

            var data =[
                            {title:'1 ' + this.name ,images: {small:{url:'http://wasd.com.mx/wp-content/uploads/tumblr_ns8bouru0H1s5gskmo1_500.jpg'}},slug: '/topic/' + this.slug},
                            {title:'2 ' + this.name ,images: {small:{url:'http://wasd.com.mx/wp-content/uploads/tumblr_ns8bouru0H1s5gskmo1_500.jpg'}},slug: '/topic/' + this.slug},
                            {title:'3 ' + this.name ,images: {small:{url:'http://wasd.com.mx/wp-content/uploads/tumblr_ns8bouru0H1s5gskmo1_500.jpg'}},slug: '/topic/' + this.slug}
                        ];

            data.forEach(function(data, index) {
                this.appendChild(new CV.VoiceCoverTitle({
                    name: 'voice_' + index,
                    data: data
                })).render(this.el.querySelector('.voice-card-container'));
            }, this);
        }
    }
});
