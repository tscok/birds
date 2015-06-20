var riot = require('riot');
var utils = require('../../utils');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, list;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function searchProjects(params) {
        uid = fbRef.getAuth().uid;
        list = [];

        var regx = new RegExp(params.needle,'i');
        // var isOwner, itemNo;

        // Perform search in all public projects.
        fbRef.child('project').orderByChild('public').equalTo(true).on('child_added', function(snap) {
            var project = snap.val();
            var projectId = snap.key();

            // Use regExp to compare category value and needle.
            if (project[params.category] && regx.test(project[params.category])) {
                // isOwner = project.ownerId === uid;
                // itemNo = list.length;

                list.push({
                    'pid': projectId,
                    'title': project.title,
                    'site': project.site,
                    'ownerName': project.ownerName,
                    'dateStart': project.dateStart,
                    'dateEnd': project.dateEnd,
                    'isOwner': project.ownerId === uid
                });

                // if (!isOwner) {
                //     isPending(projectId, itemNo);
                //     isMember(projectId, itemNo);
                // }
            }

            self.trigger('search_result', list);
        });
    }

    // function isPending(pid, itemNo) {
    //     fbRef.child('pending/' + pid + '/' + uid).once('value', function(pendingSnap) {
    //         list[itemNo]['isPending'] = (pendingSnap.val() !== null);
    //         self.trigger('project_search_result', list);
    //     });
    // }

    // function isMember(pid, itemNo) {
    //     fbRef.child('member/' + pid + '/' + uid).once('value', function(memberSnap) {
    //         list[itemNo]['isMember'] = (memberSnap.val() !== null);
    //         self.trigger('project_search_result', list);
    //     });
    // }

    self.on('search', searchProjects);
};