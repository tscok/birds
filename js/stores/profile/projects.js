var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getOwnerships() {
        uid = fbRef.getAuth().uid;
        var list = [];

        fbRef.child('user/' + uid + '/project/own').once('value', function(snap) {
            if (!snap.val()) {
                self.trigger('projects', 'ownerships', list);
                return;
            }
            listProjects(snap, 'ownerships', list);
        });
    }

    function getMemberships() {
        uid = fbRef.getAuth().uid;
        var list = [];

        fbRef.child('user/' + uid + '/project/member').once('value', function(snap) {
            if (!snap.val()) {
                self.trigger('projects', 'memberships', list);
                return;
            }
            listProjects(snap, 'memberships', list);
        });
    }

    function listProjects(snap, type, list) {
        var numberOfProjects = snap.numChildren();
        snap.forEach(function(childSnap) {
            var pid = childSnap.key();

            fbRef.child('project/' + pid).once('value', function(project) {
                var data = project.val();

                list.push({
                    pid: pid,
                    title: data.title,
                    site: data.site,
                    ownerName: data.ownerId === uid ? 'You' : data.ownerName,
                    dateStart: data.dateStart,
                    dateEnd: data.dateEnd
                });

                if (numberOfProjects === list.length) {
                    self.trigger('projects', type, list);
                }
            });
        });
    }

    self.on('list_ownerships', getOwnerships);
    self.on('list_memberships', getMemberships);
};
