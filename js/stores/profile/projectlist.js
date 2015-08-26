// var riot = require('riot');
// var promise = require('promise');
// var fbRef = require('../../firebase');
// var utils = require('../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var lists = {};
    var types = ['own','member','pending'];

    fbRef.onAuth(function(authData) {
        if (authData) {
            for (var i = 0; i < types.length; i++) {
                // Clear lists in view.
                self.trigger('projectlist_clear', types[i]);
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
            self.trigger('projectlist_data', type, lists[type]);
        }

        snap.forEach(function(childSnap) {
            var projectPromise = getProjectData(childSnap);
            listProjectData(projectPromise, type, count);
        });
    }

    function getProjectData(snap) {
        return new promise(function(resolve, reject) {
            fbRef.child('project/' + snap.key()).on('value', function(project) {
                if (project.exists()) { resolve(project); }
            });
        });
    }

    function listProjectData(promise, type, count) {
        promise.then(function(data) {
            lists[type].push(utils.extend(data.val(), {pid: data.key()}));

            if (count == lists[type].length) {
                // trigger list type
                self.trigger('projectlist_data', type, lists[type]);
            }
        });
    }
};
