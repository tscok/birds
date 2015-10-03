var riot = require('riot');
var fbRef = require('../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, pid, ringlistRef, ringlist = [];

    var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'error');
        }
    }

    function init(id) {
        pid = id;

        ringlistRef = fbRef.child('ringlist/' + pid);
        ringlistRef.orderByChild('size').on('value', handle);
    }

    function handle(snap) {
        ringlist.length = 0;
        snap.forEach(function(childSnap) {
            ringlist.push({
                rsid: childSnap.key(),
                size: childSnap.val().size,
                snid: childSnap.val().snid
            });
        });
        self.trigger('ringlist_data', ringlist);
    }

    function add(data) {
        ringlistRef.push(data, onComplete);
    }

    function remove(item) {
        ringlistRef.child(item.rsid).remove(onComplete);
    }

    function onRoute(route, id, action) {
        // Ignore if not project or action is defined.
        if (route != 'project' || !id || action) {
            return;
        }

        // Load existing data.
        if (pid && pid == id && ringlist.length) {
            self.trigger('ringlist_hide');
            self.trigger('ringlist_data', ringlist);
            return;
        }

        // Initialize ringlist data.
        init(id);
    }
    
    self.on('route', onRoute);
    self.on('ringlist_add', add);
    self.on('ringlist_remove', remove);
};
