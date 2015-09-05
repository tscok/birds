var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../firebase');
var utils = require('../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var lists = {};
    var types = ['own','member','pending'];

    fbRef.onAuth(function(authData) {
        if (authData) {
            for (var i = 0; i < types.length; i++) {
                // Clear lists in view.
                self.trigger('projects_clear', types[i]);
                // Add firebase listeners.
                fbRef.child('userproject/' + authData.uid + '/' + types[i]).on('value', handle);
            }
        }
    });

    function handle(snap) {
        var type = snap.key();
        var count = snap.numChildren();

        lists[type] = [];

        if (!snap.exists()) {
            // trigger list type (empty array).
            self.trigger('projects_data', type, lists[type]);
        }

        snap.forEach(function(childSnap) {
            var projectPromise = getProjectData(childSnap);
            listProjectData(projectPromise, type, count);
        });
    }

    function getProjectData(snap) {
        return new promise(function(resolve, reject) {
            fbRef.child('project/' + snap.key()).on('value', function(project) {

                // Resolve project data.
                if (project.exists()) {

                    // Check pending count for project.
                    fbRef.child('membership/' + snap.key() + '/pending').on('value', function(pending) {
                        var count = (pending.exists()) ? pending.numChildren() : 0;
                        
                        // Add data to project.
                        var projectData = project.val();
                        projectData.pid = project.key();
                        projectData.pendingCount = count;

                        resolve(projectData);
                    });
                }
            });
        });
    }

    function listProjectData(promise, type, count) {
        promise.then(function(data) {
            lists[type].push(data);

            if (count == lists[type].length) {
                // trigger list type
                self.trigger('projects_data', type, lists[type]);
            }
        });
    }
};
