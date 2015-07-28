Class(CV, 'PostDetailMedia').inherits(CV.PostDetail)({
    ELEMENT_CLASS : 'cv-post-detail cv-post-detail-media',
    HTML : '\
       <div>\
            <header class="cv-post-detail__header -clearfix"></header>\
            <div class="cv-post-detail__content -abs"></div>\
        </div>\
    ',

    prototype : {
        _posts : null,
        _ids : null,
        _currentIndex : null,

        init : function init(config) {
            CV.PostDetail.prototype.init.call(this, config);
            this.el = this.element[0];
            this.header = this.el.querySelector('header');
            this.content = this.el.querySelector('.cv-post-detail__content');

            this._setup()._bindEvents();
        },

        _setup : function _setup() {
            this.appendChild(new CV.PostDetailNavigation({
                name : 'navigation',
                className : '-float-right -full-height'
            })).render(this.header);

            this.appendChild(new CV.PostDetailMediaHeader({
                name : 'postDetailHeader',
                className : '-overflow-hidden -full-height'
            })).render(this.header);

            this.appendChild(new CV.PostDetailMediaInfo({
                name : 'postDetailInfo'
            })).render(this.content);
            return this;
        },

        _bindEvents : function _bindEvents() {
            CV.PostDetail.prototype._bindEvents.call(this);
        },

        /* Update the UI.
         * @argumetn data <required> [PostEntity]
         */
        update : function update(data) {
            this.postDetailInfo.update(data);
        },

        destroy : function destroy() {
            CV.PostDetail.prototype.destroy.call(this);
            return null;
        }
    }
});

Class(CV, 'PostDetailImage').inherits(CV.PostDetailMedia)({prototype:{}});
Class(CV, 'PostDetailVideo').inherits(CV.PostDetailMedia)({prototype:{}});