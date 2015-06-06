var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    // Request to join project
    function joinProject(pid) {
        var uid = fbRef.getAuth().uid;
        // Add uid to pending/pid to notify project owner.
        fbRef.child('pending/' + pid + '/' + uid).set(true);
        // Add pid to user/uid/pending for reference.
        fbRef.child('user/' + uid + '/project/pending/' + pid).set(true);
    }

    self.on('project_join', joinProject);
};