var riot = require('riot');
var utils = require('../../utils');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this;

    function searchProjects(params) {
        var uid = fbRef.getAuth().uid;
        var list = [];

        // Use regExp to find the needle in category values.
        var regExp = new RegExp(params.needle,'i');

        // Search all public projects.
        var projects = fbRef.child('project').orderByChild('public').equalTo(true);
        projects.on('child_added', onChildAdded);

        function onChildAdded(snap) {
            var pid = snap.key();
            var project = snap.val();

            if (params.category === 'all') {
                var category = ['title','site','ownerName'];
                for (var i = 0; i < category.length; i++) {
                    if (project[category[i]] && regExp.test(project[category[i]])) {
                        listProject(project, pid);
                        // Break loop to prevent duplicates.
                        break;
                    }
                }
            } else {
                if (project[params.category] && regExp.test(project[params.category])) {
                    listProject(project, pid);
                }
            }
        }

        function listProject(data, pid) {
            var extraInfo = {
                pid: pid,
                isOwner: uid === data.ownerId,
                ownerName: uid === data.ownerId ? 'You' : data.ownerName,
                isActive: new Date(data.dateEnd).getTime() > new Date().getTime()
            };

            list.push(utils.extend(data, extraInfo));
            self.trigger('search_result', list);
        }
    }

    self.on('search', searchProjects);
};
