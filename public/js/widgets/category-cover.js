/**
 * @data format
 * name         {String} category name
 * image_cover  {String} path to the main cover image
 * url          {String} topic's permalink
 */
Class('CategoryCover').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="homepage-category-list-item">\
            <div class="homepage-category-list-item-inner">\
                <div class="homepage-category-cover -img-cover"></div>\
                <a class="categories_link -font-semi-bold" href="#" alt="">\
                    <span class="categories_link-inner"></span>\
                </a>\
            </div>\
        </div>\
    ',

    prototype : {

        data : {
            name: '',
            image_cover: '',
            url: ''
        },

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];

            this.anchorElement = this.el.querySelector('.categories_link');

            this.dom.updateBgImage(this.el.querySelector('.homepage-category-cover'), this.data.image_cover);
            this.dom.updateAttr('href', this.anchorElement, this.data.url);
            this.dom.updateAttr('alt', this.anchorElement, this.data.name);
            this.dom.updateText(this.el.querySelector('.categories_link-inner'), this.data.name);
        }
    }
});
