var riot = require('riot');
var fbRef = require('../../../firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, ringsizeRef, ringsizes = [];

    var onComplete = function(err) {
        if (err) {
            self.trigger('alert', err.message, 'error');
        }
    }

    function init(route, id, action) {
        if (route != 'project' && !id) {
            return;
        }
        
        self.trigger('ringsize_hide');

        if (ringsizes.length) {
            self.trigger('ringsize_data', ringsizes);
            return;
        }

        ringsizeRef = fbRef.child('ringsize/' + id);
        ringsizeRef.orderByChild('size').on('value', handle);
    }

    function handle(snap) {
        ringsizes.length = 0;
        snap.forEach(function(childSnap) {
            ringsizes.push({
                rsid: childSnap.key(),
                size: childSnap.val().size,
                snid: childSnap.val().snid
            });
        });
        self.trigger('ringsize_data', ringsizes);
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
