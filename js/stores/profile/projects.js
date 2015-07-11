var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getProjects() {
        uid = fbRef.getAuth().uid;

        fbRef.child('user/' + uid + '/project').once('value', function(snap) {
            snap.forEach(function(childSnap) {
                getProjectsByType(childSnap);
            });
        });
    }

    function getProjectsByType(snap) {
        var list = [];
        var type = snap.key();

        snap.forEach(function(childSnap) {
            var pid = childSnap.key();

            fbRef.child('project/' + pid).once('value', function(project) {
                list.push({
                    pid: pid,
                    title: project.val().title,
                    site: project.val().site
                });

                self.trigger('projects', type, list);
            });
        });
    }

    self.on('list_projects', getProjects);
};
