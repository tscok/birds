var riot = require('riot');
var promise = require('promise');
var moment = require('moment');
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

            // Add pid to data.
            data.pid = childSnap.key();

            // Date formatting.
            var now = moment();
            var nowUnix = moment(now).unix();
            var formatStr = 'YYYY-MM-DD';
            if (type == 'pending') {
                var then = moment.unix(data.date);
                data.pendingSince = then.from(now, true);
            } else {
                data.dateCreated = moment.unix(data.date.created).format(formatStr);
                data.dateStart = moment.unix(data.date.start).format(formatStr);
                data.dateEnd = moment.unix(data.date.end).format(formatStr);
                data.dateStatus = nowUnix <= data.date.end ? (nowUnix < data.date.start ? 'Not started' : 'Active') : 'Completed';
            }

            // List project data.
            projects[type].push(data);
        });

        self.trigger('projects_data', type, projects[type]);
    }
};
