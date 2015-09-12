var riot = require('riot');
var promise = require('promise');
var fbRef = require('../../firebase');
var utils = require('../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    var projects = {own: [], member: [], pending: []};

    fbRef.onAuth(function(authData) {
        if (authData) {
            fbRef.child('userproject/' + authData.uid + '/own').on('value', handle);
            fbRef.child('userproject/' + authData.uid + '/member').on('value', handle);
            fbRef.child('userproject/' + authData.uid + '/pending').on('value', handle);
        } else {
            self.trigger('projects_clear');
        }
    });

    function handle(snap) {
        var type = snap.key();
        projects[type].length = 0;
        snap.forEach(function(childSnap) {
            var data = childSnap.val();
            data.pid = childSnap.key();
            projects[type].push(data);
        });
        self.trigger('projects_data', type, projects[type]);
    }
};
