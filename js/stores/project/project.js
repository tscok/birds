var riot = require('riot');
var fbRef = require('../../firebase');
var utils = require('../../utils');
var moment = require('moment')

module.exports = function() {
    riot.observable(this);

    var self = this, pid, projectData, memberData;
    
    function init(id) {
        pid = id;
        uid = fbRef.getAuth().uid;
        
        self.trigger('project_clear');

        fbRef.child('project/' + pid).on('value', projectHandle);
    }

    function projectHandle(snap) {
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
        // Ignore if not project or action is defined.
        if (route != 'project' || !id || action) {
            return;
        }

        // Load existing data.
        if (pid && pid == id && projectData) {
            self.trigger('project_data', projectData);
            return;
        }

        // Initialize project data.
        init(id);
    }

    self.on('route', onRoute);
};
