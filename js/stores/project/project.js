var riot = require('riot');
var fbRef = require('../../firebase');
var utils = require('../../utils');
var moment = require('moment')

module.exports = function() {
    riot.observable(this);

    var self = this, pid, projectData;
    
    function init(id) {
        pid = id;
        
        self.trigger('project_clear');

        fbRef.child('project/' + pid).on('value', handle);
    }

    function handle(snap) {
        // Gather extras.
        var extras = {
            pid: pid,
            isOwner: fbRef.getAuth().uid == snap.val().userId
        };

        // Merge project data with extras.
        projectData = utils.extend(snap.val(), extras);

        // Date formatting.
        var formatStr = 'YYYY-MM-DD';
        var start = moment.unix(projectData.date.start);
        var end = moment.unix(projectData.date.end);
        projectData.dateStart = start.format(formatStr);
        projectData.dateEnd = end.format(formatStr);
        
        // Display project data.
        self.trigger('project_data', projectData);
    }

    function onRoute(route, id, action) {
        if (route != 'project' || !id || !!action) {
            // Not project overview.
            return;
        }

        if (pid == id && projectData) {
            // Project did not change.
            self.trigger('project_data', projectData);
            return;
        }

        // Initialize project data.
        init(id);
    }

    self.on('route', onRoute);
};
