var riot = require('riot');
var promise = require('promise');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, pid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');
    
    function initProject(projectId) {
        uid = fbRef.getAuth().uid;
        pid = projectId;

        fbRef.child('project/' + pid).once('value', function(snap) {
            var data = snap.val();
            data.pid = pid;
            data.isOwner = data.ownerId === uid;

            // If user is not project owner, check membership.
            if (!data.isOwner) {
                var promise = isMember();
                authMember(promise, data);
            } else {
                self.trigger('project_data', data);
            }
        });
    }

    function isMember() {
        return new promise(function(resolve, reject) {
            fbRef.child('member_status/' + pid + '/member/' + uid).once('value', function(snap) {
                resolve(snap.exists());
            });
        });
    }

    function authMember(promise, data) {
        promise.then(function(member) {
            if (!member) {
                self.trigger('alert', {text: 'Access denied. Membership required.', type: 'error'});
                riot.route('profile');
                return;
            }

            self.trigger('project_data', data);
        });
    }
    
    self.on('init_project', initProject);
};
