var riot = require('riot');
var promise = require('promise');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid, projects;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getProjects() {
        uid = fbRef.getAuth().uid;

        projects = {};

        fbRef.child('user/' + uid + '/project').on('value', function(snap) {

            // new promise(function(resolve, reject) {
                snap.forEach(function(childSnap) {
                    getProjectsByType(childSnap);
                });
            // }).then(function(data) {
            //     console.log('data',data);
            //     console.log('projects',projects);
            //     // console.log('data',data);
            // })
            
        });
    }

    function getProjectsByType(snap) {
    //     var list = [];
        var type = snap.key();
        console.log('type',type);
    //     var count = snap.numChildren();

    //     console.log('type',type);

    //     snap.forEach(function(childSnap) {
    //         var pid = childSnap.key();

    //         // projects[type][pid] = true;

    //         fbRef.child('project/' + pid).once('value', function(project) {

    //             console.log('pid',pid);

    //             projects[type][pid] = {
    //                 title: project.val().title,
    //                 site: project.val().site,
    //                 dateStart: project.val().dateStart,
    //                 dateEnd: project.val().dateEnd,
    //                 own: project.val().ownerId === uid
    //             };

    //         });
    //     });
    }

    self.on('list_projects', getProjects);
};
