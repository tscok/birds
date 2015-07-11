var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function leaveProject(pid) {
        var uid = fbRef.getAuth().uid;
        
        // Remove uid from pending.
        fbRef.child('member/' + pid + '/pending/' + uid).remove();
        // Remove pid from user/uid/pending.
        fbRef.child('user/' + uid + '/project/pending/' + pid).remove();
    }

    self.on('leave_project', leaveProject)
};