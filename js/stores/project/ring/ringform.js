var riot = require('riot');
var xhr = require('xhr');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, ringerRef, ringers;

    function init(route, id, action) {
        if (route != 'project' && !id && !action) {
            return;
        }
        self.trigger('ringform_clear');
        ringerRef = fbRef.child('ringer/' + id).orderByChild('active').equalTo(true);
        ringerRef.on('value', ringerHandle);
    }

    function ringerHandle(snap) {
        ringers = [];
        if (snap.exists()) {
            snap.forEach(function(childSnap) {
                ringers.push({uid: childSnap.key(), sign: childSnap.val().sign});
            });
            self.trigger('ringers_data', ringers);
        }
    }

    self.on('route', init);
};
