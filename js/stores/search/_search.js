var riot = require('riot');
var utils = require('../../utils');
var fbRef = require('../../firebase');
var moment = require('moment');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, pattern, category, result;
    var types = ['title','site','userName'];
    var publicRef = fbRef.child('project').orderByChild('privacy').equalTo('public');

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

            // Sort result by end date, descending order.
            result.sort(dateDesc)

            // Return a complete data set.
            self.trigger('search_data', result);
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
        var name = project.userName;
        var extras = {
            pid: id,
            isOwner: uid === project.userId,
            userName: uid === project.userId ? name + ' (You)' : name,
            isActive: project.date.end > moment().unix()
        };
        result.push(utils.extend(project, extras));
    }

    function dateDesc(a, b) {
        // newest first.
        return (a.date.end > b.date.end) ? -1 : ((a.date.end < b.date.end) ? 1 : 0);
    }

    function dateAsc(a, b) {
        // oldest first.
        return (a.date.end < b.date.end) ? -1 : ((a.date.end > b.date.end) ? 1 : 0);
    }

    function clearOnRoute(route) {
        if (route == 'search') {
            self.trigger('search_clear');
        }
    }

    self.on('search', search);
    self.on('route', clearOnRoute);
};
