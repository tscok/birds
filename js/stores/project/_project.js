var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    /*function deleteProject(pid) {
        var uid = ref.getAuth().uid;
        fbRef.child('projects_public/'+pid).remove(function(error) {
            if(!error) {
                ref.child('projects/'+pid).set(null);
                ref.child('users/'+uid+'/owner/'+pid).set(null);
                self.trigger('alert', 'Project successfully removed.');
                riot.route('profile');
            }else{
                self.trigger('alert', error);
            }
        });
    };*/

    function initDashboard(pid) {
        uid = fbRef.getAuth().uid;

        var data = {};
        
        fbRef.child('project/' + pid).once('value', function(snap) {
            data = snap.val();
            data.pid = pid;
            data.isOwner = data.ownerId == uid;
            self.trigger('dashboard_data', data);
        });
    }

    self.on('dashboard_init', initDashboard);

    // self.on('project_delete', deleteProject);
};