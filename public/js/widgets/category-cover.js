/* jshint multistr: true */
/**
 * @data format
 * name         {String} category name
 * image_cover  {String} path to the main cover image
 * url          {String} topic's permalink
 */
Class('CategoryCover').inherits(Widget).includes(CV.WidgetUtils)({
    HTML : '\
        <div class="homepage-category-list-item">\
            <a class="categories_link" href="#" alt="">\
                <div class="homepage-category-cover -img-cover"></div>\
                <span class="categories_title -font-bold"></span>\
            </a>\
        </div>\
    ',

    prototype : {

        name : null,
        slug : null,
        images : null,

        init : function init(config) {
            Widget.prototype.init.call(this, config);

            this.el = this.element[0];
            this.anchorElement = this.el.querySelector('.categories_link');

            this.dom.updateBgImage(this.el.querySelector('.homepage-category-cover'), this.images.icon.url);
            this.dom.updateAttr('href', this.anchorElement, '/topic/' + this.slug);
            this.dom.updateAttr('alt', this.anchorElement, this.name);
            this.dom.updateText(this.el.querySelector('.categories_title'), this.name);
        }
    }
});
