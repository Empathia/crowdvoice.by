Class(CV, 'HomeView').includes(NodeSupport, CV.WidgetUtils)({
  prototype : {

    featuredVoicesData : null,
    categoriesData : null,
    orgsData : null,

    init: function init(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      /* STATS */
      [].slice.call(document.querySelectorAll('.stats .stats-number'), 0).forEach(function(number) {
        this.dom.updateText(number, this.format.numberUS(number.textContent));
      }, this);

      /* FEATURED VOICES */
      var featuredVoicesWrapper = document.querySelector('.homepage-featured-voices-container');
      var featuredVoicesElements = [];
      this.featuredVoicesData.forEach(function(voice, index) {
        featuredVoicesElements.push(this.appendChild(new CV.VoiceCover({
          name: 'featuredVoice_' + index,
          data: voice
        })).render(featuredVoicesWrapper).el);
      }, this);

      new CV.ResponsiveWidth({
        container: featuredVoicesWrapper,
        items: [].slice.call(featuredVoicesElements, 0),
        minWidth: 300
      }).setup();

      /* CATEGORIES */
      var categoriesHolder = document.querySelector('.homepage-category-list-row');
      var categoriesElements = [];
      this.categoriesData.forEach(function(category, index) {
        categoriesElements.push(this.appendChild(new CV.TopicCard({
          name: 'topic_' + index,
          className: '-float-left',
          data: category
        })).render(categoriesHolder).el);
      }, this);

      new CV.ResponsiveWidth({
        container: categoriesHolder,
        items: [].slice.call(categoriesElements, 0),
        minWidth: 300
      }).setup();

      /* ORGANIZATIONS */
      var orgsHolder = document.querySelector('.homepage-organization-cards-holder');
      var orgsList = orgsHolder.querySelector('.slider-list');
      this.orgsData.map(function(org) {
        var card = new CV.Card({data: org});
        card.element[0].classList.add('slider-item');
        return card.render(orgsList);
      });

      new CV.ResponsiveSlider({
        element: orgsHolder,
        dots: true,
        minSlideWidth: 300
      });
    }
  }
});

