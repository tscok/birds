var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');
    
    function initProject(pid) {
        uid = fbRef.getAuth().uid;

        fbRef.child('project/' + pid).once('value', function(snap) {
            var data = snap.val();
            data.pid = pid;
            data.isOwner = data.ownerId === uid;

            self.trigger('project_data', data);
        });
    }
    
    self.on('init_project', initProject);
};