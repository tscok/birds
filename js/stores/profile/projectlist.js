var riot = require('riot');
var fbRef = require('../../firebase');
var riotcontrol = require('riotcontrol');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function init() {
        var uid = fbRef.getAuth().uid;
        fbRef.child('user_project/' + uid + '/own').on('value', listProjectData);
        fbRef.child('user_project/' + uid + '/member').on('value', listProjectData);
        fbRef.child('user_project/' + uid + '/pending').on('value', listProjectData);
    }

    function listProjectData(snap) {
        var list = [];
        var type = snap.key();

        if (!snap.exists()) {
            self.trigger('projectlist_clear', type);
            return;
        }

        snap.forEach(function(childSnap) {
            fbRef.child('project/' + childSnap.key()).once('value', function(project) {
                list.push({
                    pid: project.key(),
                    title: project.val().title,
                    site: project.val().site
                });
                self.trigger('projectlist_data', type, list);
            });
        });
    }

    function test1(a,b,c) {
        console.log('test1',a,b,c);
    }

    riotcontrol.on('route', test1)

    // self.on('projectlist_init', init);
};
