Class(CV, 'HomeView').includes(CV.WidgetUtils)({
    prototype : {

        featuredVoicesData : null,
        categoriesData : null,
        orgsData : null,

        init : function init(config) {
            Object.keys(config || {}).forEach(function(propertyName) {
                this[propertyName] = config[propertyName];
            }, this);

            var categoriesHolder = document.querySelector('.homepage-category-list-row');
            var orgsHolder = document.querySelector('.homepage-organization-cards-holder');
            var orgsList = orgsHolder.querySelector('.slider-list');

            [].slice.call(document.querySelectorAll('.stats .stats-number'), 0).forEach(function(number) {
                this.dom.updateText(number, this.format.numberUS(number.textContent));
            }, this);

            new VoiceCover( this.featuredVoicesData[0] ).render( document.querySelector('.voice-cover-test') );
            new VoiceCover( this.featuredVoicesData[1] ).render( document.querySelector('.voice-cover-test-2') );
            new VoiceCover( this.featuredVoicesData[2] ).render( document.querySelector('.voice-cover-test-3') );
            new VoiceCover( this.featuredVoicesData[3] ).render( document.querySelector('.voice-cover-test-4') );
            new VoiceCover( this.featuredVoicesData[4] ).render( document.querySelector('.voice-cover-test-5') );

            this.categoriesData.forEach(function(category) {
                new CategoryCover({data: category}).render(categoriesHolder);
            });

            this.orgsData.map(function(org) {
                var card = new CV.Card(org);
                card.element[0].classList.add('slider-item');

                return card.render(orgsList);
            });

            new CV.ResponsiveSlider({
                element : orgsHolder,
                dots : true,
                minSlideWidth : 300
            });
        }
    }
});

