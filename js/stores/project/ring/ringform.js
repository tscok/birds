var riot = require('riot');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, ringerRef, ringers = [];

    function init(route, id, action) {
        if (route != 'project' && !id && !action) {
            return;
        }

        self.trigger('ringform_clear');

        if (ringers.length) {
            self.trigger('ringers_data', ringers);
            return;
        }

        ringerRef = fbRef.child('ringer/' + id).orderByChild('active').equalTo(true);
        ringerRef.on('value', handle);
    }

    function handle(snap) {
        ringers.length = 0;
        snap.forEach(function(childSnap) {
            ringers.push({uid: childSnap.key(), sign: childSnap.val().sign});
        });
        self.trigger('ringers_data', ringers);
    }

    self.on('route', init);
};
