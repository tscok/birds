var riot = require('riot');
var firebase = require('firebase');

module.exports = function() {
    riot.observable(this);

    var self = this, uid;

    var fbRef = new firebase('https://bluebird.firebaseio.com/');

    function getProjects() {
        uid = fbRef.getAuth().uid;

        fbRef.child('user/' + uid + '/project').once('value', function(snap) {
            snap.forEach(function(childSnap) {
                console.log('before switch',childSnap.key());
                switch (childSnap.key()) {
                    case 'own':
                        getOwn(childSnap);
                        break;
                    case 'pending':
                        getPending(childSnap);
                        break;
                    case 'standby':
                        getStandby(childSnap);
                        break;
                    default:
                        getGranted(childSnap);
                }
            });
        });
    }

    function getOwn(snap) {
        var list = [];

        snap.forEach(function(childSnap) {
            var pid = childSnap.key();
            fbRef.child('project/' + pid).once('value', function(project) {
                list.push({
                    pid: pid,
                    title: project.val().title,
                    site: project.val().site
                });
                self.trigger('projects', 'own', list);
            });
        });
    }

    function getPending(snap) {
        var list = [];

        snap.forEach(function(childSnap) {
            var pid = childSnap.key();
            
            fbRef.child('member/' + pid + '/pending/' + uid).on('value', function(pendingSnap) {
                console.log('pending status', pendingSnap.val());

                // Pending status changed, check if granted or standby.
                if (!pendingSnap.val()) {
                    console.log('pending status changed…');
                    fbRef.child('user/' + uid + '/project/pending/' + pid).remove();

                    fbRef.child('member/' + pid + '/granted/' + uid).on('value', function(grantedSnap) {
                        console.log('granted status', grantedSnap.val());
                        if (grantedSnap.val()) {
                            console.log('pending status changed to granted.');
                            fbRef.child('user/' + uid + '/project/granted/' + pid).set(true);
                            console.log('list granted…');
                            listByType('granted');
                        }
                    });

                    fbRef.child('member/' + pid + '/standby/' + uid).on('value', function(standbySnap) {
                        console.log('standby status', standbySnap.val());
                        if (standbySnap.val()) {
                            console.log('pending status changed to standby.');
                            fbRef.child('user/' + uid + '/project/standby/' + pid).set(true);
                            console.log('list standby…');
                            listByType('standby');
                        }
                    });

                    return;
                }

                // Still pending for project, get project data.
                fbRef.child('project/' + pid).once('value', function(project) {
                    list.push({
                        pid: pid,
                        title: project.val().title,
                        site: project.val().site
                    });
                    self.trigger('projects', 'pending', list);
                });
            });
        });
    }

    function getStandby(snap) {
        var list = [];

        snap.forEach(function(childSnap) {
            var pid = childSnap.key();

            fbRef.child('member/' + pid + '/standby/' + uid).on('value', function(standbySnap) {
                console.log('standby status', standbySnap.val());

                // Standby status changed, check if granted.
                if (!standbySnap.val()) {
                    console.log('standby status changed…');
                    fbRef.child('user/' + uid + '/project/standby/' + pid).remove();

                    fbRef.child('member/' + pid + '/granted/' + uid).on('value', function(grantedSnap) {
                        console.log('granted status', grantedSnap.val());
                        if (grantedSnap.val()) {
                            console.log('pending status changed to granted.');
                            fbRef.child('user/' + uid + '/project/granted/' + pid).set(true);
                            console.log('list granted…');
                            listByType('granted');
                        }
                    });

                    return;
                }

                // Still standby for project, get project data.
                fbRef.child('project/' + pid).once('value', function(project) {
                    list.push({
                        pid: pid,
                        title: project.val().title,
                        site: project.val().site
                    });
                    self.trigger('projects', 'standby', list);
                });
            });
        });
    }

    function getGranted(snap) {
        var list = [];

        snap.forEach(function(childSnap) {
            var pid = childSnap.key();

            fbRef.child('member/' + pid + '/granted/' + uid).on('value', function(grantedSnap) {
                console.log('granted status', grantedSnap.val());

                // Granted status changed, check if standby.
                if (!grantedSnap.val()) {
                    console.log('granted status changed…');
                    fbRef.child('user/' + uid + '/project/granted/' + pid).remove();

                    fbRef.child('member/' + pid + '/standby/' + uid).on('value', function(standbySnap) {
                        console.log('standby status', standbySnap.val());
                        if (standbySnap.val()) {
                            console.log('pending status changed to standby.');
                            fbRef.child('user/' + uid + '/project/standby/' + pid).set(true);
                            console.log('list standby…');
                            listByType('standby');
                        }
                    });

                    return;
                }

                // Still granted for project, get project data.
                fbRef.child('project/' + pid).once('value', function(project) {
                    list.push({
                        pid: pid,
                        title: project.val().title,
                        site: project.val().site
                    });
                    self.trigger('projects', 'granted', list);
                });
            });
        });
    }

    function listByType(type) {
        var list = [];

        fbRef.child('user/' + uid + '/project/' + type).once('value', function(snap) {
            snap.forEach(function(childSnap) {
                var pid = childSnap.key();

                fbRef.child('project/' + pid).once('value', function(project) {
                    list.push({
                        pid: pid,
                        title: project.val().title,
                        site: project.val().site
                    });
                    self.trigger('projects', type, list);
                });
            });
        });
    }


    self.on('list_projects', getProjects);
};
