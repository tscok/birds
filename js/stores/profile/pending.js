var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    fbRef.onAuth(function(authData) {
        if (authData) {
            fbRef.child('userproject/' + authData.uid + '/own').on('value', handle);
        }
    });

    function handle(snap) {
        snap.forEach(function(childSnap) {
            // Check pending count for project.
            fbRef.child('membership/' + childSnap.key() + '/pending').on('value', function(pending) {
                var count = (pending.exists()) ? pending.numChildren() : 0;
                self.trigger('pending_count_' + childSnap.key(), count);
            });
        });
    }
};