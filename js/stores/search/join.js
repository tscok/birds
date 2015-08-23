var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, pid;
    var types = ['pending','member'];

    var handle = function(type, snap) {
        self.trigger('join_' + pid, type, snap.exists());
    }

    function status(projectId) {
        pid = projectId;
        
        var uid = fbRef.getAuth().uid;
        var userProjectRef;
        
        for (var i = 0; i < types.length; i++) {
            userProjectRef = fbRef.child('userproject/' + uid + '/' + types[i] + '/' + pid);
            userProjectRef.on('value', function(snap) {
                handle(types[i], snap);
            });
        };
    }

    self.on('join_get_status', status)
};
