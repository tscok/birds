var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, list;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function listMemberships() {
        uid = fbRef.getAuth().uid;

        list = [];

        fbRef.child('user/'+uid+'/project/member').once('value', function(snap) {
            if (!snap.val()) {
                self.trigger('projects', list, 'memberships');
                return;
            }

            snap.forEach(function(childSnap) {
                var project_id = childSnap.key();

                fbRef.child('project/'+project_id).once('value', function(project) {
                    var data = project.val();

                    list.push({
                        pid: project_id,
                        title: data.title,
                        site: data.site,
                        ownerName: 'You',
                        dateStart: data.dateStart,
                        dateEnd: data.dateEnd
                    });

                    self.trigger('projects', list, 'memberships');
                });
            });
        });
    }

    self.on('list_memberships', listMemberships);
};
