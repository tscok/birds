var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    // Request status in project.
    function getStatus(pid) {
        uid = uid || fbRef.getAuth().uid;
        
        // Look for pending status.
        fbRef.child('user_project/' + uid + '/pending/' + pid).once('value', function(snap) {
            self.trigger('join_pending', snap.exists(), pid);
        });

        // Look for member status.
        fbRef.child('user_project/' + uid + '/member/' + pid).once('value', function(snap) {
            self.trigger('join_member', snap.exists(), pid);
        });
    }

    self.on('join_status', getStatus)
};
