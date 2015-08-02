var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, pid;
    
    function init(projectId) {
        uid = fbRef.getAuth().uid;
        pid = projectId;

        fbRef.child('project/' + pid).on('value', function(snap) {
            var data = snap.val();
            data.pid = pid;
            data.isOwner = data.ownerId === uid;
            self.trigger('project_data', data);
        });
    }
    
    self.on('project_init', init);
};
