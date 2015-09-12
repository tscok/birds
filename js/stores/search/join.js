var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function status(projectId) {
        var pid = projectId;
        var uid = fbRef.getAuth().uid;
        
        pendingRef = fbRef.child('userproject/' + uid + '/pending/' + pid);
        memberRef = fbRef.child('userproject/' + uid + '/member/' + pid);

        pendingRef.on('value', handle);
        memberRef.on('value', handle);

        function handle(snap) {
            self.trigger('join_' + pid, snap.key(), snap.exists());
        }
    }

    self.on('join_get_status', status)
};
