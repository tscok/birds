var riot = require('riot');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, pid, ringers = [];

    function init(id) {
        pid = id;

        var ringerRef = fbRef.child('ringer/' + pid).orderByChild('active').equalTo(true);
        ringerRef.on('value', handle);
    }

    function handle(snap) {
        ringers.length = 0;
        snap.forEach(function(childSnap) {
            ringers.push({uid: childSnap.key(), sign: childSnap.val().sign});
        });
        self.trigger('ringers_data', ringers);
    }

    function onRoute(route, id, action) {
        if (route != 'project' || !id || !action) {
            // Not ringform.
            return;
        }

        if (pid == id && ringers.length) {
            // Project did not change.
            self.trigger('ringers_data', ringers);
            return;
        }

        // Initialize ringer data.
        init(id);
    }

    self.on('route', onRoute);
};
