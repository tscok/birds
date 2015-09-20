var riot = require('riot');
var fbRef = require('../../firebase');
var utils = require('../../utils');
var moment = require('moment')

module.exports = function() {
    riot.observable(this);

    var self = this, projectId, projectData;
    
    function init(route, id, action) {
        if (route != 'project' || !id) {
            return;
        }

        // Clear current project data in view.
        self.trigger('project_clear');

        // Still viewing the same project.
        if (projectId == id) {
            self.trigger('project_data', projectData);
            return;
        }

        projectId = id;
        fbRef.child('project/' + projectId).on('value', handle);
    }

    function handle(snap) {
        // Gather extras.
        var extras = {
            pid: projectId,
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

    self.on('route', init);
};
