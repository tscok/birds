var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'warning');
        }
    };

    // Retrieve current user's name.
    function getUserName(uid) {
        var userNameRef = fbRef.child('user/' + uid + '/name');
        return new promise(function(resolve, reject) {
            userNameRef.once('value', function(name) {
                resolve(name.val());
            });
        });
    }

    // Request membership.
    function request(data) {
        var uid = data.uid || fbRef.getAuth().uid;
        var pid = data.pid;
        delete data.pid;
        // Get user name before status update.
        getUserName(uid).then(function(name) {
            fbRef.child('membership/' + pid + '/pending/' + uid).set({name: name});
            fbRef.child('userproject/' + uid + '/pending/' + pid).set(data);
        });
    }

    // Deny membership request.
    function deny(data) {
        var uid = data.uid || fbRef.getAuth().uid;
        fbRef.child('userproject/' + uid + '/pending/' + data.pid).remove(onComplete);
        fbRef.child('membership/' + data.pid + '/pending/' + uid).remove(onComplete);
    }

    // Allow membership request.
    function allow(data) {
        var uid = data.uid;
        var pid = data.pid;
        delete data.uid;
        delete data.pid;
        // Use deny() to remove pending.
        deny({pid: pid, uid: uid});
        // Get user name before status update.
        getUserName(uid).then(function(name) {
            fbRef.child('userproject/' + uid + '/member/' + pid).set(data);
            fbRef.child('membership/' + pid + '/member/' + uid).set({name: name, role: 'assistant'});
        });
    }

    // Revoke membership.
    function revoke(data) {
        var uid = data.uid || fbRef.getAuth().uid;
        fbRef.child('userproject/' + uid + '/member/' + data.pid).remove(onComplete);
        fbRef.child('membership/' + data.pid + '/member/' + uid).remove(onComplete);
    }

    self.on('membership_request', request);
    self.on('membership_deny', deny);
    self.on('membership_allow', allow);
    self.on('membership_revoke', revoke);
};
