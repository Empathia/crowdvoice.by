Class(CV, 'HomeView').includes(NodeSupport, CV.WidgetUtils)({
  prototype: {
    featuredVoicesData: null,
    categoriesData: null,
    orgsData: null,

    init: function init(config) {
      Object.keys(config || {}).forEach(function(propertyName) {
        this[propertyName] = config[propertyName];
      }, this);

      if (this.topVoice) {
        this.appendChild(new CV.TopVoice({
          name: 'topVoice',
          data: this.TopVoice
        })).render(document.querySelector('.homepage-intro .top-voice'));
      }

      /* FEATURED VOICES */
      var featuredVoicesWrapper = document.querySelector('.homepage-featured-voices-container');
      var featuredVoicesList = featuredVoicesWrapper.querySelector('.slider-list');
      var featuredVoicesElements = [];
      this.featuredVoicesData.forEach(function(voice, index) {
        featuredVoicesElements.push(this.appendChild(new CV.VoiceCover({
          name: 'featuredVoice_' + index,
          className: 'slider-item',
          data: voice
        })).render(featuredVoicesList).el);
      }, this);

      new CV.Slider({
        element: $(featuredVoicesWrapper),
        itemsWidth: 340,
        appendArrowsTo: document.querySelector('.homepage-featured-voices .arrows-wrapper'),
        appendDotsTo: document.querySelector('.homepage-featured-voices .dots-wrapper')
      }).update();

      /* STATS */
      [].slice.call(document.querySelectorAll('.stats .stats-number'), 0).forEach(function(number) {
        this.dom.updateText(number, this.format.numberUS(number.textContent));
      }, this);

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

      new CV.Slider({
        element: $(orgsHolder),
        itemsWidth: 340,
        appendArrowsTo: document.querySelector('.homepage-organization-cards .arrows-wrapper'),
        appendDotsTo: document.querySelector('.homepage-organization-cards .dots-wrapper')
      }).update();
    }
  }
});

