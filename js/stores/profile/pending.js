var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, list;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function listPending() {
        uid = fbRef.getAuth().uid;

        list = [];

        fbRef.child('user/'+uid+'/project/pending').once('value', function(snap) {
            console.log('pending',snap.val());
            if (!snap.val()) {
                self.trigger('projects', list, 'pending');
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

                    self.trigger('projects', list, 'pending');
                });
            });
        });
    }

    self.on('list_pending', listPending);
};
