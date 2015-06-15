var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, list;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function listOwnerships() {
        uid = fbRef.getAuth().uid;

        list = [];

        fbRef.child('user/'+uid+'/project/own').once('value', function(snap) {
            if (!snap.val()) {
                self.trigger('ownerships', list);
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

                    self.trigger('ownerships', list);
                });
            });
        });
    }

    self.on('list_ownerships', listOwnerships);
};