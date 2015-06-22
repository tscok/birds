var riot = require('riot');
var utils = require('../../utils');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, list, projects;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function searchProjects(params) {
        var uid = fbRef.getAuth().uid;

        list = [];

        var regx = new RegExp(params.needle,'i');

        // Perform search in all public projects.
        fbRef.child('project').orderByChild('public').equalTo(true).on('child_added', function(snap) {
            var project = snap.val();
            var projectId = snap.key();

            // Use regExp to compare category value and needle.
            if (project[params.category] && regx.test(project[params.category])) {

                list.push({
                    'pid': projectId,
                    'title': project.title,
                    'site': project.site,
                    'ownerId': project.ownerId,
                    'ownerName': uid === project.ownerId ? 'You' : project.ownerName,
                    'dateStart': project.dateStart,
                    'dateEnd': project.dateEnd,
                    'isOwner': uid === project.ownerId,
                    'isActive': new Date(project.dateEnd).getTime() > new Date().getTime()
                });
            }

            self.trigger('search_result', list);
        });
    }

    self.on('search', searchProjects);
};
