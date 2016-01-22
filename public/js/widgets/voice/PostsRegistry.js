/* Module CV.PostsRegistry
 * Object that holds all posts data of a voice as we request them.
 * By default the registry is empty, we need to tell it which year-month keys
 * it should create for later set/get of its data. We do that by calling the
 * setup method and passing the data.
 * Check the setup method for the expected format.
 */

var moment = require('moment');

Module(CV, 'PostsRegistry')({
    _ : {},

    /* Register the empty `year-month` keys.
     * @method setup <public> [Function]
     * @argument approvedPostsData <required> [Array]
     *  @expectedFormat [{year: 'MMMM', months: [{month: 'MM'}]}]
     */
    setup : function setup(approvedPostsData) {
        var _this = this;

        approvedPostsData.forEach(function(yearItem) {
            yearItem.months.forEach(function(monthItem) {
                var date = moment(yearItem.year + '-' + monthItem.month + '-01', 'YYYY-MM').format('YYYY-MM');
                _this._[date] = null;
            });
        });
    },

    /* Returns the posts data of the passed key.
     * @method get <public> [Function]
     * @argument name <required> [String] e.g.: '2015-07'
     * @return this[name] || undefined
     */
    get : function get(name) {
        if (name) {
            return this._[name];
        }

        return this._;
    },

    /* Sets the posts data for the passed key.
     * @method set <public> [Function]
     * @argument name <required> [String] e.g.: '2015-07'
     * @argument posts <required> [Object]
     * @return undefined
     */
    set : function set(name, posts) {
        this._[name] = posts;
    },

    /* Append the post data passed to the passed key (month)  of the registry.
     * @public
     * @param {string} name
     * @param {Array} posts
     * @exmple add('2015-07', [{PostInstance, ...}]
     */
    add: function add(name, posts) {
      var r = this._[name];
      if (r) this._[name] = r.concat(posts);
    },

    /* Returns all the cached object data.
     */
    getAll : function getAll() {
        return this._;
    },

    /* Returns the keys ordered DESC.
     */
    getKeys : function getKeys() {
        return Object.keys(this.getAll()).sort(function(a,b) {
            return a < b;
        });
    }
});
