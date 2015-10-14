/* CurrentPerson Registry and Helper.
 * get() => returns the whole currentPerson object
 * anon() => returns {true|false} depending if currentPerson is browsing in anonnymous mode
 * is(id) => returns {true|false} if personId matched with the passed id
 * ownerOf('organization', organizationID) => returns {true|false} if person is owner of the passed organization
 * memberOf('organization', organizationID) => returns {true|false} if person is either a member or owner of the passed organization
 * memberOf('voice', voiceID) => returns {true|false} if person is a member of the passed voice
 * ownedOrganizations() => returns {true|false} if person is owner of at least 1 organization
 */

var PLACEHOLDERS = require('./placeholders');

module.exports = {
    _ : null,

    set : function set(data) {
        this._ = data;
    },

    get : function get() {
        return this._;
    },

    /* Checks if currentPerson has the same hashid as the passed one as param.
     * @argument id <required> [String]
     * @return [Boolean]
     */
    is : function is(id) {
        return (this.get() && (this.get().id === id));
    },

    /* Checks if currentPerson is in anonymous mode.
     * @return [Boolean]
     */
    anon : function anon() {
        return (this.get() && (this.get().isAnonymous));
    },

    /* Checks if currentPerson is the owner of a specific organization.
     * @argument type <required> [String] ('organization')
     * @argument id <required> [String] organization id
     * @return [Boolean]
     */
    ownerOf : function ownerOf(type, id) {
        if (!this.get()) {
            return false;
        }

        if (type === 'organization') {
            return (this.get().ownedOrganizations.some(function(organization) {
                return (organization.id === id);
            }));
        }

        if (type === 'voice') {
            if (!this.get().ownedVoices.length) {
                return false;
            }

            return (this.get().ownedVoices.indexOf(id) !== -1);
        }
    },

    /* Checks if currentPerson is member of a specific organization or a specific voice.
     * @argument type <required> [String] ('organization' || 'voice')
     * @argument id <required> [String] organization || voice id
     * @return [Boolean]
     */
    memberOf : function memberOf(type, id) {
        if (!this.get()) {
            return false;
        }

        if (type === 'organization') {
            var organizations = this.get().organizations.concat(this.get().ownedOrganizations);
            return (organizations.some(function(organization) {
                return (organization.id === id);
            }));
        }

        if (type === 'voice') {
            var voices = this.get().voiceIds.concat(this.get().ownedVoices);
            if (!voices.length) {
                return false;
            }

            return (voices.indexOf(id) !== -1);
        }
    },

    ownsOrganizations : function ownsOrganizations() {
        return this.get().ownedOrganizations.length;
    },

    /* Checks if an Entity can be invited either to a voice or to an organization.
     * @argument entity <required> [Object] Entity's Model
     * @return [Boolean]
    */
    canInviteEntity : function canInviteEntity(entity) {
       return (this.canInviteEntityToAVoice(entity) ||
                this.canInviteEntityToAnOrg(entity));
    },

    /* Checks if an Entity does not belongs to at least one of currentPerson's voices.
     * @argument entity <required> [Object] Entity's Model
     * @return [Boolean]
     */
    canInviteEntityToAVoice : function canInviteEntityToAVoice(entity) {
        if (!this.get().voiceIds.length) {
            return false;
        }

        return (this.get().voiceIds.some(function(voiceid) {
            return (entity.voiceIds.indexOf(voiceid) === -1);
        }));
    },

    /*
     * Checks if an Entity does not belongs to at least one of currentPerson's ownedOrganizations.
     * @argument entity <required> [Object] Entity's Model
     * @return [Boolean]
     */
    canInviteEntityToAnOrg : function canInviteEntityToAnOrg(entity) {
        if (!this.get().ownedOrganizations.length) {
            return false;
        }

        return (this.get().ownedOrganizations.some(function(organization) {
            return (entity.organizationIds.indexOf(organization.id) === -1);
        }));
    },

    /* Tries to retrieves a specific version of the person images,
     * if it doest not exists it will try to return a placeholder instead
     * otherwhise it will return null.
     * @return [String] image_path
     */
    getImage : function getImage(version) {
        var images = this.get().images;

        if (images[version]) {
            return images[version].url;
        }

        if (PLACEHOLDERS[version]) {
            return PLACEHOLDERS[version];
        }

        return null;
    }
};
