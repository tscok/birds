var riot = require('riot');
var fbRef = require('../../firebase');
var utils = require('../../utils');

module.exports = function() {
    riot.observable(this);

    var self = this;
    
    function init(route, id, action) {
        if (route != 'project' || !!action) {
            return;
        }

        var authData = fbRef.getAuth();

        fbRef.child('project/' + id).on('value', function(snap) {
            var info = {pid: id, isOwner: authData.uid == snap.val().ownerId};
            var data = utils.extend(snap.val(), info);
            self.trigger('project_data', data);
        });
    }
    
    self.on('route', init);
};
