var riot = require('riot');
var fbRef = require('../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function getUser() {
        var authData = fbRef.getAuth(), uid, name, image;
        if (authData) {
            uid = authData.uid;
            name = authData[authData.provider].displayName;
            image = authData[authData.provider].profileImageURL
        }
        return {uid: uid, name: name, image: image}
    }

    self.on('route', function(route, id) {
        self.trigger('nav', id, getUser());
    });
}
