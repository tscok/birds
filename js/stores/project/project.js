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
        fbRef.child('membership/' + pid + '/member/' + uid).on('value', memberHandle);
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

    function memberHandle(snap) {
        memberData = snap.val();
        self.trigger('membership_data', memberData);
    }

    function onRoute(route, id, action) {
        if (route != 'project' || !id || action) {
            return;
        }

        if (pid && pid == id) {
            // Pre-loading existing data
            self.trigger('project_data', projectData);
            self.trigger('membership_data', memberData);
            return;
        }

        init(id);

        

        // console.log(route, id, action);
        // if (route != 'project' || !id || !!action) {
        //     // Not project overview.
        //     console.log('not project');
        //     return;
        // }
        // console.log(pid, id, pid == id);
        // if (pid == id) {
        //     // Project did not change.
        //     console.log('project, no change');
        //     self.trigger('project_data', projectData);
        //     return;
        // }

        // console.log('project, change');

        // // Initialize project data.
        // init(id);
    }

    self.on('route', onRoute);
};
