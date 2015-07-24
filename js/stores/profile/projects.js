var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function monitorProjects() {
        uid = fbRef.getAuth().uid;

        // Whatever happens to my project folder, let me know!
        fbRef.child('user_project/' + uid).once('value', function(snap) {
            // Loop over the project folder and take actions accordingly.
            snap.forEach(function(childSnap) {
                switch (childSnap.key()) {
                    case 'own':
                        listProjects(childSnap, 'own');
                        break;
                    case 'member':
                        listProjects(childSnap, 'member');
                        break;
                    default:
                        listProjects(childSnap, 'pending');
                };
            });
        });
    }

    function listProjects(snap, type) {
        var list = [];
        snap.forEach(function(childSnap) {
            var pid = childSnap.key();
            fbRef.child('project/' + pid).once('value', function(project) {
                list.push({
                    pid: pid,
                    site: project.val().site,
                    title: project.val().title
                });
                self.trigger('projects_listed', type, list);
            });
        });
    }


    self.on('list_projects', monitorProjects);
};
