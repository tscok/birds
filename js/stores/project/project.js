var riot = require('riot');
var fbRef = require('../../firebase');
var utils = require('../../utils');
var moment = require('moment')

module.exports = function() {
    riot.observable(this);

    var self = this, projectData;
    
    function init(pid) {
        var authData = fbRef.getAuth();

        fbRef.child('project/' + pid).on('value', function(snap) {
            var info = {pid: pid, isOwner: authData.uid == snap.val().userId};
            projectData = utils.extend(snap.val(), info);

            var start = moment.unix(projectData.date.start);
            var end = moment.unix(projectData.date.end);
            projectData.dateStart = start.format('ll');
            projectData.dateEnd = end.format('ll');
            
            self.trigger('project_data', projectData);
        });
    }
    
    self.on('route', function(route, id, action) {
        if (route == 'project' && id) {
            init(id);
        } else {
            self.trigger('project_clear');
        }
    });
};
