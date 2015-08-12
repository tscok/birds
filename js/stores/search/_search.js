var riot = require('riot');
var utils = require('../../utils');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, pattern, category, result;
    var types = ['title','site','ownerName'];
    var publicRef = fbRef.child('project').orderByChild('public').equalTo(true);

    function search(data) {
        uid = fbRef.getAuth().uid;
        pattern = new RegExp(data.needle, 'i');
        category = data.category;
        result = [];

        publicRef.once('value', function(publicSnap) {
            publicSnap.forEach(function(projectSnap) {
                if (category == 'all') {
                    tryCategories(projectSnap);
                } else {
                    tryCategory(projectSnap);
                }
            });

            // Return a complete data set, in reversed order (newst first).
            self.trigger('search_data', result.reverse());
        });
    }

    function tryCategories(snap) {
        var project = snap.val(), sample;
        for (var i = 0; i < types.length; i++) {
            sample = project[types[i]];
            if (sample && pattern.test(sample)) {
                addResult(project, snap.key());
                break;
            }
        }
    }

    function tryCategory(snap) {
        var project = snap.val();
        var sample = project[category];
        if (sample && pattern.test(sample)) {
            addResult(project, snap.key());
        }
    }

    function addResult(project, id) {
        var extras = {
            pid: id,
            isOwner: uid === project.ownerId,
            ownerName: uid === project.ownerId ? 'You' : project.ownerName,
            isActive: new Date(project.dateEnd).getTime() > new Date().getTime()
        };
        result.push(utils.extend(project, extras));
    }

    function clearOnRoute(route) {
        if (route == 'search') {
            self.trigger('search_clear');
        }
    }

    self.on('search', search);
    self.on('route', clearOnRoute);
};
