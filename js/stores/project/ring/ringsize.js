var riot = require('riot');
var fbRef = require('../../../firebase');
var riotcontrol = require('riotcontrol');

module.exports = function() {
    riot.observable(this);

    var self = this, ringsizeRef;

    var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'error');
        }
    }

    function init(route, id, action) {
        if (route != 'project' || !!action) {
            return;
        }
        // Close form on route.
        self.trigger('ringsize_init');

        // Set ref and get project's rings.
        ringsizeRef = fbRef.child('ringsize/' + id);
        ringsizeRef.orderByChild('size').on('value', handle);
    }

    function handle(snap) {
        var list = [];
        var count = snap.numChildren();

        snap.forEach(function(childSnap) {
            list.push({
                rsid: childSnap.key(),
                size: childSnap.val().size,
                snid: childSnap.val().snid
            });

            if (count == list.length) {
                self.trigger('ringsize_data', list);
            }
        });
    }

    function add(data) {
        ringsizeRef.push(data, onComplete);
    }

    function remove(item) {
        ringsizeRef.child(item.rsid).remove(onComplete);
    }
    
    self.on('route', init);
    self.on('ringsize_add', add);
    self.on('ringsize_remove', remove);
};
