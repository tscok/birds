var riot = require('riot');
var fbRef = require('../../firebase');
var utils = require('../../utils');
var moment = require('moment')

module.exports = function() {
    riot.observable(this);

    var self = this;
    
    function init(pid) {

        var authData = fbRef.getAuth();

        fbRef.child('project/' + pid).on('value', function(snap) {
            var info = {pid: pid, isOwner: authData.uid == snap.val().userId};
            var data = utils.extend(snap.val(), info);

            var start = moment.unix(data.date.start)
            var end = moment.unix(data.date.end)
            data.date.start = start.format('ll')
            data.date.end = end.format('ll')
            
            self.trigger('project_data', data);
        });
    }
    
    self.on('route', function(route, id, action) {
        if (route == 'project' && id && !action) {
            init(id);
        }
    });
};
