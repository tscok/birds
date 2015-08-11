var riot = require('riot');
var fbRef = require('../../../firebase');
var riotcontrol = require('riotcontrol');

module.exports = function() {
    riot.observable(this);

    // var self = this, pid;

    // var onComplete = function(error) {
    //     if (error) {
    //         self.trigger('alert', error.message, 'error')
    //     }
    // }

    // function init(id, action) {
    //     // Skip if action (new, old, etc.) is defined.
    //     if (action) {
    //         return;
    //     }

    //     pid = id;
    //     fbRef.child('ringsize/' + pid).orderByChild('size').on('value', function(snap) {
    //         var list = [];
    //         snap.forEach(function(childSnap) {
    //             list.push({
    //                 id: childSnap.key(),
    //                 ringSize: childSnap.val().size,
    //                 serialNumber: childSnap.val().snid
    //             });
    //         });
    //         self.trigger('ringsizes_data', list)
    //     });
    // }

    // function add(data) {
    //     fbRef.child('ringsize/' + pid).push({
    //         snid: data.serialNumber,
    //         size: data.ringSize
    //     }, onComplete);
    // }

    // function remove(data) {
    //     fbRef.child('ringsize/' + pid + '/' + data.id).remove(onComplete);
    // }

    // // On route.
    // riotcontrol.on('route_project', init);

    // // On action.
    // // self.on('ringsizes_init', init);
    // self.on('ringsizes_add', add);
    // self.on('ringsizes_remove', remove);
};
