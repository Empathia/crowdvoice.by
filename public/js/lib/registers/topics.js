/* CrowdVoice Topics Store.
 * fetch() => Fetch the data from the server. It will auto update itself after the response.
 * get() => Returns the data stored.
 */

var API = require('./../api');

module.exports = {
    _ : {},

    /* Fetch the data from the server
     * @method fetch <public>
     */
    fetch : function fetch() {
        API.getTopics(this._fetchHandler.bind(this));
    },

    /* Returns the stored data
     * @method get <public>
     */
    get : function get() {
        return this._;
    },

    /* Updates the registry with the passed data
     * @method _set <private>
     */
    _set : function _set(data) {
        this._ = data;
    },

    /* Handles the API response after tying to fetch the data.
     * @method _fetchHandler <private>
     */
    _fetchHandler : function _fetchHandler(err, res) {
        if (err) {
            throw new Error('Cannot get Topics');
        }
        this._set(res);
    }
};
