/* Module CV.ModeratePostsRegistry
 * Object that holds all unmoderated posts data of a voice as we request them.
 * By default the registry is empty, we need to tell it which year-month keys
 * it should create for later set/get of its data. We do that by calling the
 * setup method and passing the data.
 * Check the setup method for the expected format.
 */

var moment = require('moment');

Module(CV, 'ModeratePostsRegistry')({
    /* Register the empty `year-month` keys.
     * @method setup <public> [Function]
     * @argument unapprovedPostsData <required> [Array]
     *  @expectedFormat [{year: 'MMMM', months: [{month: 'MM'}]}]
     */
    setup : function setup(unapprovedPostsData) {
        var _this = this;

        unapprovedPostsData.forEach(function(yearItem) {
            yearItem.months.forEach(function(monthItem) {
                var date = moment(yearItem.year + '-' + monthItem.month + '-01', 'YYYY-MM').format('YYYY-MM');
                _this[date] = null;
            });
        });
    },

    /* Returns the posts data of the passed key.
     * @method get <public> [Function]
     * @argument name <required> [String] e.g.: '2015-07'
     * @return this[name] || undefined
     */
    get : function get(name) {
        return this[name];
    },

    /* Sets the posts data for the passed key.
     * @method set <public> [Function]
     * @argument name <required> [String] e.g.: '2015-07'
     * @argument posts <required> [Object]
     * @return undefined
     */
    set : function set(name, posts) {
        this[name] = posts;
    }
});
